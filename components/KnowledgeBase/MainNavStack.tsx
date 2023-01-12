import Link from 'next/link';

export default function MainNavStack({ items }: any) {
  return (
    <div className="p-2 border border-1-gray rounded-md my-4 mr-0">
      <ul role="list" className="divide-y divide-gray-200 xl:w-56 w-full">
        {items.map((item) => (
          <div key={item.id}>
            {item.id === 1 && (
              <>
                <li className="bg-white py-5 px-4 h-full xl:h-64 flex justify-between flex-col">
                  <div className="flex justify-between space-x-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex space-x-3">
                        <item.icon
                          className="h-6 w-6 flex-shrink-0 text-cyan-600 mt-0.5"
                          aria-hidden="true"
                        />
                        <p className="truncate text-lg font-medium text-gray-900 mb-4">
                          {item.title}
                        </p>
                      </div>
                      <p className="truncate text-sm text-gray-500 whitespace-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Link href={item.href}>
                    <div className="cursor-pointer mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      Read
                    </div>
                  </Link>
                </li>
              </>
            )}
            {item.id !== 1 && (
              <div key={item.id}>
                <li className="relative bg-white py-5 px-4 h-full xl:h-64 flex justify-between flex-col">
                  <div className="flex justify-between space-x-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-md font-medium text-gray-900 mb-4">
                        {item.title}
                      </p>
                      <p className="truncate text-sm text-gray-500 whitespace-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Link href={item.href}>
                    <div className="cursor-pointer mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      Read
                    </div>
                  </Link>
                </li>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
