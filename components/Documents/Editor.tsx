import { $getRoot, $getSelection, $insertNodes } from 'lexical';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useSettings } from './context/SettingsContext';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import TableCellNodes from './nodes/TableCellNodes';
import ActionsPlugin from './plugins/ActionsPlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import FigmaPlugin from './plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import HorizontalRulePlugin from './plugins/HorizontalRulePlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import LinkPlugin from './plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import PollPlugin from './plugins/PollPlugin';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TwitterPlugin from './plugins/TwitterPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';
import { createPortal } from 'react-dom';
import Button from './ui/Button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useDebouncedCallback } from 'use-debounce';
import { $generateNodesFromDOM } from '@lexical/html';
import { CAN_USE_DOM } from './shared/canUseDOM';
import { useUpdateDocument } from 'hooks/documents/useUpdateDocument';
import { updateDocument } from 'queries/documents/update-document';
import { useUser } from '@/utils/useUser';

export default function Editor({
  editorState,
  documentId,
  title
}: any): JSX.Element {
  const { user } = useUser();
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const cellEditorConfig = {
    namespace: 'Playground',
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme
  };
  const [editor] = useLexicalComposerContext();
  const { historyState } = useSharedHistoryContext();
  const {
    settings: {
      isCollab,
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText,
      showTableOfContents
    }
  } = useSettings();
  const text = isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
    ? 'Enter some rich text...'
    : 'Enter some plain text...';
  const placeholder = <Placeholder>{text}</Placeholder>;

  useEffect(() => {
    if (editorState) {
      const newEditorState = editor.parseEditorState(JSON.parse(editorState));
      if (newEditorState) {
        editor.setEditorState(newEditorState);
      }
    }
  }, [documentId]);

  const onChange = useDebouncedCallback(async (editorState) => {
    const data = JSON.stringify(editorState);
    if (
      data !=
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
    ) {
      await updateDocument(documentId, title, data, user.id);
    }
  }, 1000);

  return (
    <div className="editor-border-container border border-1 rounded-xl">
      {CAN_USE_DOM && (
        <>
          {isRichText && <ToolbarPlugin />}
          <div className={`editor-container plain-text`}>
            {isMaxLength && <MaxLengthPlugin maxLength={30} />}
            <DragDropPaste />
            <OnChangePlugin onChange={onChange} />
            <AutoFocusPlugin />
            <ClearEditorPlugin />
            <ComponentPickerPlugin />
            <EmojiPickerPlugin />
            <AutoEmbedPlugin />
            <MentionsPlugin />
            <EmojisPlugin />
            <HashtagPlugin />
            <KeywordsPlugin />
            <SpeechToTextPlugin />
            <AutoLinkPlugin />
            {isRichText ? (
              <>
                <HistoryPlugin externalHistoryState={historyState} />
                <RichTextPlugin
                  contentEditable={
                    <div className="editor-scroller">
                      <div className="editor" ref={onRef}>
                        <ContentEditable />
                      </div>
                    </div>
                  }
                  placeholder={placeholder}
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <MarkdownShortcutPlugin />
                <CodeHighlightPlugin />
                <ListPlugin />
                <CheckListPlugin />
                <ListMaxIndentLevelPlugin maxDepth={7} />
                <TablePlugin />
                <TableCellResizer />
                <NewTablePlugin cellEditorConfig={cellEditorConfig}>
                  <AutoFocusPlugin />
                  <RichTextPlugin
                    contentEditable={
                      <ContentEditable className="TableNode__contentEditable" />
                    }
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  <MentionsPlugin />
                  <HistoryPlugin />
                  <ImagesPlugin captionsEnabled={false} />
                  <LinkPlugin />
                  <ClickableLinkPlugin />
                  <FloatingTextFormatToolbarPlugin />
                </NewTablePlugin>
                <ImagesPlugin />
                <LinkPlugin />
                <PollPlugin />
                <TwitterPlugin />
                <YouTubePlugin />
                <FigmaPlugin />
                <ClickableLinkPlugin />
                <HorizontalRulePlugin />
                <EquationsPlugin />
                <TabFocusPlugin />
                <TabIndentationPlugin />
                <CollapsiblePlugin />
                {floatingAnchorElem && (
                  <>
                    <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                    <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                    <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
                    <TableCellActionMenuPlugin
                      anchorElem={floatingAnchorElem}
                    />
                    <FloatingTextFormatToolbarPlugin
                      anchorElem={floatingAnchorElem}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <PlainTextPlugin
                  contentEditable={<ContentEditable />}
                  placeholder={placeholder}
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin externalHistoryState={historyState} />
              </>
            )}
            {(isCharLimit || isCharLimitUtf8) && (
              <CharacterLimitPlugin
                charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
                maxLength={5}
              />
            )}
            <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
            {/* <ActionsPlugin isRichText={isRichText} /> */}
          </div>
        </>
      )}
    </div>
  );
}
