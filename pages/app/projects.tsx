import Layout from '@/components/Layout/Layout';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronRightIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/20/solid';
import HomePageTItle from '@/components/Layout/PageTitle/HomePageTItle';
import _ from 'lodash';
import CreateProjectModal from '@/components/Projects/CreateModals/CreateProjectModal';
import DeleteProjectModal from '@/components/Projects/DeleteModals/DeleteProjectModal';
import useGetProjectsQuery from 'hooks/projects/useProjects';
import { useCreateProject } from 'hooks/projects/useCreateProject';
import { useUpdateProject } from 'hooks/projects/useUpdateProject';
import { useDeleteProject } from 'hooks/projects/useDeleteProject';

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const projectColors = [
  'bg-slate-600',
  'bg-gray-600',
  'bg-zinc-600',
  'bg-neutral-600',
  'bg-stone-600',
  'bg-red-600',
  'bg-orange-600',
  'bg-amber-600',
  'bg-yellow-600',
  'bg-lime-600',
  'bg-green-600',
  'bg-emerald-600',
  'bg-teal-600',
  'bg-cyan-600',
  'bg-sky-600',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-violet-600',
  'bg-purple-600',
  'bg-fuchsia-600',
  'bg-pink-600',
  'bg-rose-600'
];

export default function Home() {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pinnedProjects, setPinnedProjects] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    if (projects) {
      setPinnedProjects(projects.filter((project) => project.pinned));
    }
  }, [projects]);

  const getProjectById = (id) => {
    const project = projects.find((project) => project.id === id);
    if (project) {
      return project;
    }
    return 'Project not found';
  };

  const togglePin = async (id) => {
    const project = getProjectById(id);
    await updateProject.mutateAsync({
      id,
      title: project.title,
      type: project.type,
      bgColorClass: _.sample(projectColors),
      pinned: !project.pinned
    });
  };

  const deleteCurrentProject = async (id) => {
    setDeleteModalOpen(false);
    await deleteProject.mutateAsync({
      id
    });
  };
  const createNewProject = async () => {
    await createProject.mutateAsync({
      title: projectName,
      type: selectedType.name,
      bgColorClass: _.sample(projectColors),
      pinned: false
    });

    setOpen(false);
    setSelectedType(null);
    setProjectName('');
  };

  return (
    <Layout>
      <CreateProjectModal
        open={open}
        setOpen={setOpen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        createNewProject={createNewProject}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      <DeleteProjectModal
        deleteCurrentProject={deleteCurrentProject}
        selectedProjectId={selectedProjectId}
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
      />
      {/* Page title & actions */}
      <HomePageTItle setOpen={setOpen} />
      {/* Pinned projects */}
      {!isLoading && (
        <>
          <div className="mt-6 px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white">
              Pinned Projects
            </h2>
            <ul
              role="list"
              className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
            >
              {pinnedProjects.map((project) => (
                <li
                  key={project.id}
                  className="relative col-span-1 flex rounded-md shadow-sm h-12 "
                >
                  <div
                    className={classNames(
                      project.bg_color_class,
                      'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                    )}
                  >
                    {project.title.slice(0, 2)}
                  </div>
                  <div className="flex flex-1 items-center justify-between truncate rounded-r-md bg-white dark:bg-gray-700">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <a
                        href={`/app/projects/${project.id}`}
                        className="font-medium text-gray-900 hover:text-gray-600 dark:text-white"
                      >
                        {project.title}
                      </a>
                    </div>
                    <Menu as="div" className="flex-shrink-0 pr-2">
                      <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#1f242b] dark:text-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-10 top-3 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 dark:divide-gray-700 rounded-md bg-white dark:bg-[#1f242b] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={`/app/projects/${project.id}`}
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                      : 'text-gray-700 dark:text-white',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  View
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() => togglePin(project.id)}
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                      : 'text-gray-700 dark:text-white',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Removed from pinned
                                </div>
                              )}
                            </Menu.Item>
                            {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Share
                            </a>
                          )}
                        </Menu.Item> */}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects list (only on smallest breakpoint) */}
          <div className="mt-10 sm:hidden">
            <div className="px-4 sm:px-6">
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                Projects
              </h2>
            </div>
            <ul
              role="list"
              className="mt-3 divide-y divide-gray-100 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700"
            >
              {projects.map((project) => (
                <li key={project.id}>
                  <a
                    href={`/app/projects/${project.id}`}
                    className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                  >
                    <span className="flex items-center space-x-3 truncate">
                      <span
                        className={classNames(
                          project.bg_color_class,
                          'w-2.5 h-2.5 flex-shrink-0 rounded-full'
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate text-sm font-medium leading-6">
                        {project.title}{' '}
                        <span className="truncate font-normal text-gray-500 dark:text-white">
                          as {project.type}
                        </span>
                      </span>
                    </span>
                    <ChevronRightIcon
                      className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects table (small breakpoint and up) */}
          <div className="mt-8 hidden sm:block">
            <div className="inline-block min-w-full border-b border-gray-200 dark:border-gray-700 align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <th
                      className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      <span className="lg:pl-2">Project</span>
                    </th>
                    <th
                      className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900 dark:bg-gray-700"
                      scope="col"
                    />
                    <th
                      className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900 dark:bg-gray-700"
                      scope="col"
                    />
                    <th
                      className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900 dark:bg-gray-700"
                      scope="col"
                    />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700 dark:bg-[#1f242b] bg-white dark:bg-gray-700">
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center space-x-3 lg:pl-2">
                          <div
                            className={classNames(
                              project.bg_color_class,
                              'flex-shrink-0 w-2.5 h-2.5 rounded-full'
                            )}
                            aria-hidden="true"
                          />
                          <a
                            href={`/app/projects/${project.id}`}
                            className="truncate hover:text-gray-600"
                          >
                            <span>
                              {project.title}{' '}
                              <span className="font-normal text-gray-500 dark:text-gray-400">
                                as {project.type}
                              </span>
                            </span>
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                        <a
                          href={`/app/projects/${project.id}`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-blue-500 dark:hover:text-blue-700"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                        <div
                          onClick={() => togglePin(project.id)}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer dark:text-blue-500 dark:hover:text-blue-700"
                        >
                          {project.pinned ? 'Unpin' : 'Pin'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                        <a
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
