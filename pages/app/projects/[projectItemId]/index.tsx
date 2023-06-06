import Layout from '@/components/Layout/Layout';
import ProjectPageTitle from '@/components/Layout/PageTitle/ProjectPageTitle';
import { useRouter } from 'next/router';
import Events from '@/components/Projects/Events';
import { Tabs } from '@/components/Projects/Layout/Tabs';
import useGetProjectsQuery from 'hooks/projects/useProjects';
import { useEffect, useState } from 'react';
import SectionGrid from '@/components/Projects/Layout/SectionGrid';
import useGetDocumentsByIdQuery from 'hooks/documents/useDocumentsById';
import { getDocumentsById } from 'queries/documents/get-documents-by-id';

export default function Project() {
  const router = useRouter();
  const { projectItemId } = router.query;
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [selectedProject, setSelectedProject] = useState();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (projects) {
      const project = projects.find((project) => project.id == projectItemId);
      //@ts-ignore
      setSelectedProject(project);
    }
  }, [projects, projectItemId]);

  useEffect(() => {
    const getDocuments = async () => {
      const docs = await getDocumentsById({ projectItemId });
      if (docs.data) {
        //@ts-ignore
        setDocuments(docs.data);
      }
    };
    getDocuments();
  }, [projectItemId]);

  return (
    <Layout>
      <ProjectPageTitle selectedProject={selectedProject} />
      <>
        <div className="">
          <div className="py-10">
            <div className="mx-auto sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8">
              <main className="lg:col-span-12 xl:col-span-7">
                <div className="px-4 sm:px-0">
                  <Tabs color="blue" />
                </div>
              </main>
              <aside className="hidden xl:col-span-5 xl:block">
                <div className="top-4 space-y-4">
                  <section aria-labelledby="who-to-follow-heading">
                    <div className="rounded-lg bg-white dark:bg-gray-700 dark:border-gray-700 shadow">
                      <div className="p-6">
                        <div className="flex justify-between">
                          <h2
                            id="who-to-follow-heading"
                            className="text-base font-medium text-gray-900 dark:text-white"
                          >
                            Documents
                          </h2>
                          <button
                            onClick={() => router.push('/app/documents')}
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-blue-600 hover:bg-blue-600 focus:outline-none rounded"
                          >
                            <p className="text-sm font-medium leading-none text-white">
                              Create Document
                            </p>
                          </button>
                        </div>
                        {documents.length > 0 && (
                          <div className="mt-6 flow-root">
                            <ul
                              role="list"
                              className="-my-4 divide-y divide-gray-200 dark:divide-gray-700"
                            >
                              {documents.map((document) => (
                                <li
                                  //@ts-ignore
                                  key={document.id}
                                  className="flex items-center space-x-3 py-4"
                                >
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                      <a
                                        //@ts-ignore
                                        href={`/app/documents/${document.id}`}
                                      >
                                        {
                                          //@ts-ignore
                                          document.title
                                        }
                                      </a>
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-6">
                          <a
                            href="/app/documents"
                            className="block w-full rounded-md border border-gray-300 bg-white dark:bg-[#1f242b] dark:text-white dark:border-[#1f242b] px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                          >
                            View all
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section aria-labelledby="trending-heading">
                    <div className="rounded-lg bg-white shadow p-4">
                      <Events />
                    </div>
                  </section>
                </div>
              </aside>
            </div>
            <hr className="mb-4 mx-8 cursor-default border-0 dark:bg-gray-700 content-none" />
            <SectionGrid projectItemId={projectItemId} />
          </div>
        </div>
      </>
    </Layout>
  );
}
