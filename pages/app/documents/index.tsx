import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MapIcon,
  MegaphoneIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Layout from '@/components/Layout/Layout';
import Editor from '@/components/Documents/Editor';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import PlaygroundEditorTheme from '@/components/Documents/themes/PlaygroundEditorTheme';
import PlaygroundNodes from '@/components/Documents/nodes/TableCellNodes';
import { SharedHistoryContext } from '@/components/Documents/context/SharedHistoryContext';
import { TableContext } from '@/components/Documents/plugins/TablePlugin';
import { SharedAutocompleteContext } from '@/components/Documents/context/SharedAutocompleteContext';
import { CAN_USE_DOM } from '@/components/Documents/shared/canUseDOM';
import Settings from '@/components/Documents/Settings';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
  {
    name: 'Directory',
    href: '#',
    icon: MagnifyingGlassCircleIcon,
    current: false
  },
  { name: 'Announcements', href: '#', icon: MegaphoneIcon, current: false },
  { name: 'Office Map', href: '#', icon: MapIcon, current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Index() {
  const [content, setContent] = useState(
    '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [config, setConfig] = useState({
    editorState:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme
  });

  return (
    <Layout>
      <div className="flex h-full">
        <div className="relative z-0 flex flex-1 overflow-hidden">
          <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
            {/* Start main area*/}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full rounded-lg border-2 border-dashed border-gray-200">
                <LexicalComposer initialConfig={config}>
                  <SharedHistoryContext>
                    <TableContext>
                      <SharedAutocompleteContext>
                        {CAN_USE_DOM && (
                          <div className="note-container">
                            <div className="editor-shell">
                              <Editor />
                            </div>
                            <Settings />
                          </div>
                        )}
                      </SharedAutocompleteContext>
                    </TableContext>
                  </SharedHistoryContext>
                </LexicalComposer>
              </div>
            </div>
          </main>
          <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 xl:flex xl:flex-col">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full rounded-lg border-2 border-dashed border-gray-200" />
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </Layout>
  );
}
