import Layout from '@/components/Layout/Layout';
import {
  Bars4Icon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
  TableCellsIcon,
  ViewColumnsIcon
} from '@heroicons/react/24/outline';
import { useCreateDocument } from 'hooks/documents/useCreateDocument';
import { useRouter } from 'next/router';

const items = [
  {
    title: 'Create a Research Design Document',
    description: 'A standard research design document to build off of.',
    icon: Bars4Icon,
    background: 'bg-pink-500'
  },
  {
    title: 'Create a Reference List',
    description: 'A list of your references.',
    icon: CalendarIcon,
    background: 'bg-yellow-500'
  },
  {
    title: 'Create something else',
    description: 'Great for something!.',
    icon: PhotoIcon,
    background: 'bg-green-500'
  },
  {
    title: 'Create something else',
    description: 'Great for something!.',
    icon: ViewColumnsIcon,
    background: 'bg-blue-500'
  },
  {
    title: 'Create something else',
    description: 'Great for something!.',
    icon: TableCellsIcon,
    background: 'bg-indigo-500'
  },
  {
    title: 'Create something else',
    description: 'Great for something!.',
    icon: ClockIcon,
    background: 'bg-purple-500'
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Index() {
  const router = useRouter();
  const createDocument = useCreateDocument();

  const createNewDocument = async () => {
    const data = await createDocument.mutateAsync({
      title: 'Blank Document',
      data: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      projectItemId: null
    });
    router.push(`documents/${data[0].id}`);
  };

  return (
    <Layout>
      <div className="p-12">
        <h2 className="text-lg font-medium text-gray-900">Documents</h2>
        <p className="mt-1 text-sm text-gray-500">
          You haven’t created a document yet. Get started by selecting a
          template or start from an empty document.
        </p>
        <ul
          role="list"
          className="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-2"
        >
          {items.map((item, itemIdx) => (
            <li
              key={itemIdx}
              className="flow-root"
              onClick={() => {
                createNewDocument();
              }}
            >
              <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                <div
                  className={classNames(
                    item.background,
                    'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                  )}
                >
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <span>{item.title}</span>
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex">
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Or start from an empty document
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </Layout>
  );
}
