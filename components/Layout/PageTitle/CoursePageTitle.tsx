import React from 'react';
import { useSidebar } from 'context/SidebarContext';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';

export default function CoursePageTitle() {
  const [sidebarOpen, toggleSidebar] = useSidebar();

  return (
    <div className="border-b border-gray-200 pr-4 sm:flex sm:items-center sm:justify-between flex py-1 items-center">
      <div className="flex h-16 flex-shrink-0 border-gray-200 bg-white lg:border-none">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
          onClick={() => toggleSidebar()}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="min-w-0 flex-1 pl-4">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Courses
        </h1>
      </div>
      <div className="mt-4 flex sm:mt-0 sm:ml-4">
        <button
          type="button"
          className="sm:order-0 order-1 ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-0"
        >
          Share
        </button>
        <button
          type="button"
          className="order-0 inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3"
        >
          Create
        </button>
      </div>
    </div>
  );
}
