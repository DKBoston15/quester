import Layout from '@/components/Layout/Layout';
import ProjectPageTitle from '@/components/Layout/PageTitle/ProjectPageTitle';
import { useRouter } from 'next/router';
import Events from '@/components/Projects/Events';
import { Tabs } from '@/components/Projects/Tabs';
import useGetProjectsQuery from 'hooks/projects/useProjects';
import { useEffect, useState } from 'react';

const documents = [
  {
    title: 'Document #1',
    href: '#'
  }
];

export default function Project() {
  const router = useRouter();
  const { projectItemId } = router.query;
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    if (projects) {
      const project = projects.find((project) => project.id == projectItemId);
      setSelectedProject(project);
    }
  }, [projects, projectItemId]);

  return (
    <Layout>
      <ProjectPageTitle selectedProject={selectedProject} />
      <>
        <div className="min-h-full">
          <div className="py-10">
            <div className="mx-auto sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8">
              <main className="lg:col-span-12 xl:col-span-7">
                <div className="px-4 sm:px-0">
                  <Tabs color="blue" />
                </div>
              </main>
              <aside className="hidden xl:col-span-5 xl:block">
                <div className="sticky top-4 space-y-4">
                  <section aria-labelledby="who-to-follow-heading">
                    <div className="rounded-lg bg-white shadow">
                      <div className="p-6">
                        <h2
                          id="who-to-follow-heading"
                          className="text-base font-medium text-gray-900"
                        >
                          Documents
                        </h2>
                        <div className="mt-6 flow-root">
                          <ul
                            role="list"
                            className="-my-4 divide-y divide-gray-200"
                          >
                            {documents.map((document) => (
                              <li
                                key={document.id}
                                className="flex items-center space-x-3 py-4"
                              >
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    <a href={document.href}>{document.title}</a>
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
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
          </div>
        </div>
      </>
    </Layout>
  );
}
