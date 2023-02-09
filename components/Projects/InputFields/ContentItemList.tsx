import { BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'user':
      return (
        <UserIcon
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
      );
    case 'book':
      return (
        <BookOpenIcon
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
      );
  }
};

export default function ContentItemList({ title, iconName, items }: any) {
  const icon = getIcon(iconName);

  return (
    <div className="sm:col-span-1">
      <div className="flex justify-between items-center">
        <dt className="text-sm font-medium text-gray-500">{title}</dt>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          // onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>
      <dd className="mt-2 text-sm text-gray-900">
        <ul
          role="list"
          className="divide-y divide-gray-200 rounded-md border border-gray-200 h-40 overflow-y-scroll"
        >
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
            >
              <div className="flex w-0 flex-1 items-center">
                {icon}
                <span className="ml-2 w-0 flex-1 truncate">{item.title}</span>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a
                  href={`/app/projects/${item.projectId}/${item.path}/${item.id}`}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View
                </a>
              </div>
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}
