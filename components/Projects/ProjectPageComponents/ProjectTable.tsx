import { classNames } from '@/utils/helpers';
import { Project } from '@/utils/types';
import Link from 'next/link';
import React from 'react';

export default function ProjectTable({
  projects,
  togglePin,
  setSelectedProjectId,
  setDeleteModalOpen
}: any) {
  return (
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
            {projects?.map((project: Project) => (
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
                    <Link
                      href={`/app/projects/${project.id}`}
                      className="truncate hover:text-gray-600 cursor-pointer"
                    >
                      <span className="cursor-pointer">
                        {project.title}{' '}
                        <span className="font-normal text-gray-500 dark:text-gray-400">
                          as {project.type}
                        </span>
                      </span>
                    </Link>
                  </div>
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
  );
}
