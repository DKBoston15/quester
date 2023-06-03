import { useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';
import { getDocumentById } from 'queries/documents/get-document-by-id';
import useGetDocuments from 'hooks/documents/useDocuments';
import {
  MagnifyingGlassCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import FuzzySearch from 'fuzzy-search';
import Tooltip from '@/components/Tooltip';
import EditDocumentModal from '@/components/Documents/modals/EditDocumentModal';
import useGetProjectsQuery from 'hooks/projects/useProjects';

export default function Document() {
  const router = useRouter();
  const { documentId } = router.query;
  const [editorState, setEditorState] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectItemId, setProjectItemId] = useState('');
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

  const { data: documents, isLoading, isError } = useGetDocuments();
  const {
    data: projects,
    isLoading: projectIsLoading,
    isError: projectsIsError
  } = useGetProjectsQuery();
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState();

  useEffect(() => {
    const getDocument = async () => {
      const document = await getDocumentById({ id: documentId });
      setEditorState(document.data[0].data);
      setTitle(document.data[0].title);
      setProjectItemId(document.data[0].project_item_id);
      if (projects) {
        const currentProject = projects.filter(
          (project) => project.id == document.data[0].project_item_id
        );
        if (currentProject[0]) {
          setProjectTitle(currentProject[0].title);
        }
      }
    };

    if (documentId) {
      getDocument();
    }
  }, [router, documentId, documents, projects]);

  useEffect(() => {
    setFilteredDocuments(documents);
  }, [documents]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searcher = new FuzzySearch(documents, ['title'], {
      caseSensitive: false
    });
    const result = searcher.search(event.target.value);
    setFilteredDocuments(result);
  };

  return (
    <Layout>
      {selectedDocument && (
        <EditDocumentModal
          setSelectedDocument={setSelectedDocument}
          open={open}
          setOpen={setOpen}
          selectedDocument={selectedDocument}
        />
      )}
      <div className="flex h-full">
        <div className="relative z-0 flex flex-1 overflow-hidden">
          <main className="relative z-0 flex-1 overflow-none focus:outline-none dark:bg-[#1f242b]">
            {/* Start main area*/}
            <div className="absolute inset-0 py-2 px-4 sm:px-6 lg:px-8">
              <div className="h-full rounded-lg">
                {editorState && (
                  <LexicalComposer initialConfig={config}>
                    <SharedHistoryContext>
                      <TableContext>
                        <SharedAutocompleteContext>
                          {CAN_USE_DOM && (
                            <div className="note-container">
                              <div className="editor-shell">
                                <h3 className="mt-[-1rem] pb-2 space-x-6 flex items-center">
                                  <div className="text-xl">{title}</div>
                                  {projectTitle && (
                                    <div className="bg-gray-300 p-2 rounded-lg text-sm">
                                      {projectTitle}
                                    </div>
                                  )}
                                </h3>
                                <Editor
                                  editorState={editorState}
                                  documentId={documentId}
                                  title={title}
                                  projectItemId={projectItemId}
                                />
                              </div>
                              <Settings />
                            </div>
                          )}
                        </SharedAutocompleteContext>
                      </TableContext>
                    </SharedHistoryContext>
                  </LexicalComposer>
                )}
              </div>
            </div>
          </main>
          <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 xl:flex xl:flex-col dark:bg-gray-700">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8 text-black dark:text-white">
              <div className="flex w-full">
                <div className="w-full">
                  <div className="flex justify-between items-center w-full">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Search Documents
                    </label>
                    <button
                      type="button"
                      className="h-8 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      onClick={() => router.push('/app/documents')}
                    >
                      New Document
                    </button>
                  </div>
                  <div className="relative mt-1 flex items-center mt-4">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={searchTerm}
                      onChange={handleSearch}
                      className="block w-full h-10 rounded-md border-gray-300 border pr-12 px-4  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:text-black"
                    />
                    <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 text-gray-400">
                      <MagnifyingGlassCircleIcon />
                    </div>
                  </div>
                </div>
              </div>

              {filteredDocuments && (
                <div className="h-full flex flex-col p-2 pt-4 space-y-2 rounded-lg">
                  {filteredDocuments.map((document) => (
                    <a
                      className="group hover:bg-gray-100 rounded-xl p-1 px-4 truncate flex justify-between"
                      key={document.id}
                      href={`${document.id}`}
                    >
                      <span className="truncate w-56">{document.title}</span>
                      <PencilIcon
                        className="w-4 group-hover:block hover:scale-125 text-gray-500 hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(document.id);
                          console.log(document.title);
                          setSelectedDocument({
                            id: document.id,
                            title: document.title,
                            projectItemId: document.project_item_id
                          });
                          setOpen(true);
                        }}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </Layout>
  );
}
