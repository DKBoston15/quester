import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Project } from '@/utils/types';
import Link from 'next/link';
import { classNames } from '@/utils/helpers';

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
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
        {projects?.map((project) => (
          <li key={project.id}>
            <Link
              href={`/app/projects/${project.id}`}
              className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
            >
              <div>
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
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
