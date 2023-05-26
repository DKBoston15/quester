import React from 'react';
import { useSidebar } from 'context/SidebarContext';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';

export default function SettingsPageTitle() {
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
          Settings
        </h1>
      </div>
    </div>
  );
}
