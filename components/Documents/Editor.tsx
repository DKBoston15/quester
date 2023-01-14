/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $getRoot, $getSelection, $insertNodes } from 'lexical';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
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
import { createWebsocketProvider } from './collaboration';
import { useSettings } from './context/SettingsContext';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import TableCellNodes from './nodes/TableCellNodes';
import ActionsPlugin from './plugins/ActionsPlugin';
import AutocompletePlugin from './plugins/AutocompletePlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import CommentPlugin from './plugins/CommentPlugin';
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
import TreeViewPlugin from './plugins/TreeViewPlugin';
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

const skipCollaborationInit = CAN_USE_DOM
  ? window.parent != null && window.parent.frames.right === window
  : null;

export default function Editor(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  // Function to convert html to lexical format
  // editor.update(async () => {
  //   // In the browser you can use the native DOMParser API to parse the HTML string.
  //   const parser = new DOMParser();
  //   const dom = parser.parseFromString(
  //     `<p>Keywords</p><ol><li>City development</li><li>Engagement</li><li>Service</li><li>Mission</li></ol><p><br></p><p>Introduction</p><ol><li>Diverse economies in cities work to combat negative economic outcomes (e.g., recession) resulting from adverse conditions (e.g., loss of jobs) in cities</li><li>Higher education institutions exist in cities with other organizations</li><li>The success of cities depends on the efforts of higher education institutions to educate local populations and create novel knowledge</li></ol><p><br></p><p>Literature Review and Theoretical Framework</p><ol><li>Research universities tend to behave as outside normative communities</li><li>Four interactions between local communities and universities benefit graduate learners</li><li class="ql-indent-1">Technology transfer and innovation between universities and businesses</li><li class="ql-indent-1">Social services and education between universities and communities</li><li class="ql-indent-1">Policy making between universities and city development</li><li class="ql-indent-1">Cultural services and city life between universities and local culture</li><li>Each of these interactions reinforce connections between universities and local communities.</li><li>Graduate students do not always gain benefit from these interactions</li></ol><p><br></p><p>The Study</p><ol><li>Conducted in a city ranked in the top 150 metropolitan areas in the US</li><li>Interviewed individuals from four sectors:</li><li class="ql-indent-1">Higher education (n=4)</li><li class="ql-indent-1">Local government (n=4)</li><li class="ql-indent-1">Community organizations in the nonprofit sector (n=5)</li><li class="ql-indent-1">Business (n=3)</li><li>Reviewed articles from popular media and industry journals</li><li>Field notes were generated on notes and observations during interviews</li><li>Constant comparative method guided data analysis</li><li>Results are limited by research methodology</li></ol><p><br></p><p>Findings</p><ol><li>Researchers identified 8 themes</li><li class="ql-indent-1">Impact upon city development</li><li class="ql-indent-1">University's pursuit of self-interest</li><li class="ql-indent-1">Disconnect between community and university</li><li class="ql-indent-1">Benefits</li><li class="ql-indent-1">Challenge between institutional missions and actions</li><li class="ql-indent-1">Community resources for the benefit of university research</li><li class="ql-indent-1">Influence of external grant funding</li><li class="ql-indent-1">Nature of faculty tenure and rewards</li><li>The university now acts as a service oriented institution</li><li>The university has an out-sized influence on the local community that can viewed unfavorably by individuals outside the university</li><li>Leadership at the university exercises more power than local government leaders</li><li>Individuals at the university do not see themselves as invested in issues related to the local community</li><li>Local community see themselves as guinea pigs for research without experiencing the benefits of research</li><li>The university does not encourage individuals within the university to participate in the local community</li></ol><p><br></p><p>Discussion and Implications</p><ol><li>Tensions exist between individuals at universities and members of the local community</li><li>University and personal missions of individuals within the university often influence interactions with local communities</li><li>Local community members often believe individuals within the university should do more fore the local community</li><li>Leadership at the university do not see the university as having the responsibility to help the local community</li></ol><p><br></p><p>Conclusions</p><ol><li>Graduate learners do not come to the university thinking of their role as a member in the local community</li><li>Professors may not consider how their research, and the research of their students, relate to the local community</li><li>Graduate learners, and their advisors, need to better understand their roles as professionals, as well as academics, during the graduate learning process</li></ol>`,
  //     'text/html',
  //   );

  //   // Once you have the DOM instance it's easy to generate LexicalNodes.
  //   const nodes = $generateNodesFromDOM(editor, dom);
  //   // Select the root
  //   $getRoot().select();

  //   const value = await editor.getEditorState();
  //   console.log(JSON.stringify(value));
  // });

  const { historyState } = useSharedHistoryContext();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const {
    settings: {
      isCollab,
      isAutocomplete,
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents
    }
  } = useSettings();
  const text = isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
    ? 'Enter some rich text...'
    : 'Enter some plain text...';
  const placeholder = <Placeholder>{text}</Placeholder>;
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const editorState = editor.parseEditorState(JSON.parse(content.content));
  //   if (content) {
  //     editor.setEditorState(editorState);
  //   }
  // }, [content.noteId]);

  const onChange = useDebouncedCallback(async (editorState) => {
    const stringifiedEditorState = JSON.stringify(editorState);
    // if (content.noteId) {
    //   await patchEntry(content.noteId, stringifiedEditorState, content.title);
    // }
  });

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

  return (
    <>
      {CAN_USE_DOM && (
        <>
          {isRichText && <ToolbarPlugin />}
          <div
            className={`editor-container ${showTreeView ? 'tree-view' : ''} ${
              !isRichText ? 'plain-text' : ''
            }`}
          >
            <div className="comment-button-container">
              <Button
                className={`CommentPlugin_ShowCommentsButton ${
                  showComments ? 'active' : ''
                }`}
                onClick={() => setShowComments(!showComments)}
                title={showComments ? 'Hide Comments' : 'Show Comments'}
              >
                <i className="pi pi-comments" style={{ color: 'white' }} />
              </Button>
            </div>
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
            <CommentPlugin
              providerFactory={isCollab ? createWebsocketProvider : undefined}
              showCommentInput={showCommentInput}
              setShowCommentInput={setShowCommentInput}
              showComments={showComments}
              setShowComments={setShowComments}
            />
            {isRichText ? (
              <>
                {isCollab ? (
                  <CollaborationPlugin
                    id="main"
                    providerFactory={createWebsocketProvider}
                    shouldBootstrap={!skipCollaborationInit}
                  />
                ) : (
                  <HistoryPlugin externalHistoryState={historyState} />
                )}
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
            {isAutocomplete && <AutocompletePlugin />}
            <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
            <ActionsPlugin isRichText={isRichText} />
          </div>
          {showTreeView && <TreeViewPlugin />}
        </>
      )}
    </>
  );
}
