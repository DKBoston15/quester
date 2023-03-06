import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ResourceCard({ resources }: any) {
  return (
    <div className="bg-white border border-1-gray shadow rounded-md h-full w-full mt-4 max-w-[67.5rem]">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Resources
        </h3>
      </div>
      <ul>
        {resources.map((resource: any) => (
          <li>
            <a
              href={resource.href}
              target="_blank"
              className="block hover:bg-gray-50"
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="truncate font-medium text-indigo-600">
                        {resource.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
