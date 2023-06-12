import { classNames } from '@/utils/helpers';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Project } from '@/utils/types';

export default function PinnedProjects({
  pinnedProjects,
  togglePin
}: {
  pinnedProjects: any;
  togglePin: any;
}) {
  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-medium text-gray-900 dark:text-white">
        Pinned Projects
      </h2>
      {pinnedProjects.length > 0 && (
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 text-black"
        >
          {pinnedProjects.map((project: Project) => (
            <li
              key={project.id}
              className="relative col-span-1 flex rounded-md shadow-sm h-12 border border-1 border-gray-200"
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
                  <Link
                    href={`/app/projects/${project.id}`}
                    className="font-medium text-gray-900 hover:text-gray-600 dark:text-white"
                  >
                    {project.title}
                  </Link>
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
                            <Link
                              href={`/app/projects/${project.id}`}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                  : 'text-gray-700 dark:text-white',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              View
                            </Link>
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
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
