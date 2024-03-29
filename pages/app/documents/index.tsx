import Layout from '@/components/Layout/Layout';
import {
  MagnifyingGlassCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { useCreateDocument } from 'hooks/documents/useCreateDocument';
import useGetDocuments from 'hooks/documents/useDocuments';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FuzzySearch from 'fuzzy-search';
import Link from 'next/link';
import EditDocumentModal from '@/components/Documents/modals/EditDocumentModal';
import useGetProjectsQuery from 'hooks/projects/useProjects';

export default function Index() {
  const router = useRouter();
  const createDocument = useCreateDocument();

  const createNewDocument = async () => {
    if (!createDocument) return;
    const data = await createDocument.mutateAsync({
      title: 'Blank Document',
      data: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      //@ts-ignore
      projectItemId: null
    });
    //@ts-ignore
    router.push(`documents/${data[0].id}`);
  };

  const { data: documents } = useGetDocuments();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState();
  const { data: projects } = useGetProjectsQuery();

  const getProjectTitle = (projectItemId: any) => {
    if (projects) {
      const currentProject = projects.filter(
        (project) => project.id == projectItemId
      );
      if (currentProject[0]) {
        return currentProject[0].title;
      }
    }
  };

  useEffect(() => {
    //@ts-ignore
    setFilteredDocuments(documents);
  }, [documents]);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
    //@ts-ignore
    const searcher = new FuzzySearch(documents, ['title'], {
      caseSensitive: false
    });
    const result = searcher.search(event.target.value);
    //@ts-ignore
    setFilteredDocuments(result);
  };

  return (
    <Layout>
      {open && (
        <EditDocumentModal
          setSelectedDocument={setSelectedDocument}
          open={open}
          setOpen={setOpen}
          selectedDocument={selectedDocument}
        />
      )}
      <div className="p-12">
        <h2 className="text-lg font-medium text-gray-900">Documents</h2>
        {/* <p className="mt-1 text-sm text-gray-500">
          You haven’t created a document yet. Get started by selecting a
          template or start from an empty document.
        </p> */}
        <div className="inset-0 pt-4 text-black dark:text-white">
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
                onClick={() => createNewDocument()}
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
          <div className="mt-8 flow-root">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 w-24"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  {filteredDocuments && (
                    <tbody className="divide-y divide-gray-200">
                      {filteredDocuments.map((filteredDocument) => (
                        <tr
                          key={
                            //@ts-ignore
                            filteredDocument.id
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            <Link
                              className="cursor-pointer"
                              href={`/app/documents/${
                                //@ts-ignore
                                filteredDocument.id
                              }`}
                            >
                              <div className="pb-2 space-x-6 flex items-center">
                                <span className="truncate w-56 cursor-pointer">
                                  {
                                    //@ts-ignore
                                    filteredDocument.title
                                  }
                                </span>
                                {
                                  //@ts-ignore
                                  filteredDocument.project_item_id && (
                                    <div className="bg-gray-300 p-2 rounded-lg text-sm">
                                      {getProjectTitle(
                                        //@ts-ignore
                                        filteredDocument.project_item_id
                                      )}
                                    </div>
                                  )
                                }
                              </div>
                            </Link>
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <PencilIcon
                              className="w-4 group-hover:block text-gray-500 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedDocument({
                                  //@ts-ignore
                                  id: filteredDocument.id,
                                  //@ts-ignore
                                  title: filteredDocument.title,
                                  projectItemId:
                                    //@ts-ignore
                                    filteredDocument.project_item_id
                                });
                                setOpen(true);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
