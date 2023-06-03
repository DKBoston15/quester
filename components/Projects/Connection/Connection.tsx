import { Disclosure } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import {
  NewspaperIcon,
  PencilIcon,
  ChartBarIcon,
  BookOpenIcon,
  KeyIcon,
  BeakerIcon,
  PresentationChartBarIcon,
  GlobeAmericasIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  PuzzlePieceIcon,
  TableCellsIcon,
  AcademicCapIcon,
  MinusCircleIcon
} from '@heroicons/react/24/outline';
import { supabase } from '@/utils/supabase-client';
import CreateConnectionModal from '../CreateModals/CreateConnectionModal';
import { useUser } from '@/utils/useUser';
import { useDeleteConnection } from 'hooks/connections/useDeleteConnection';

const navigation = [
  {
    name: 'Articles',
    icon: NewspaperIcon,
    current: false,
    children: []
  },
  {
    name: 'Designs',
    icon: PencilIcon,
    current: false,
    children: []
  },
  {
    name: 'Figures',
    icon: ChartBarIcon,
    current: false,
    children: []
  },
  {
    name: 'Journals',
    icon: BookOpenIcon,
    current: false,
    children: []
  },
  {
    name: 'Key Terms',
    icon: KeyIcon,
    current: false,
    children: []
  },
  {
    name: 'Labs',
    icon: BeakerIcon,
    current: false,
    children: []
  },
  {
    name: 'Models',
    icon: PresentationChartBarIcon,
    current: false,
    children: []
  },
  {
    name: 'Paradigms',
    icon: GlobeAmericasIcon,
    current: false,
    children: []
  },
  {
    name: 'Questions',
    icon: QuestionMarkCircleIcon,
    current: false,
    children: []
  },
  {
    name: 'Researchers',
    icon: UserIcon,
    current: false,
    children: []
  },
  {
    name: 'Samples',
    icon: PuzzlePieceIcon,
    current: false,
    children: []
  },
  {
    name: 'Tables',
    icon: TableCellsIcon,
    current: false,
    children: []
  },
  {
    name: 'Techniques',
    icon: AcademicCapIcon,
    current: false,
    children: []
  }
];

function removeObjects(
  sourceArray: any,
  removeArray: any,
  itemId: any,
  itemType: any
) {
  //@ts-ignore
  let data = sourceArray.filter((sourceItem) => {
    //@ts-ignore
    return !removeArray.some((removeItem) => {
      return (
        sourceItem.source_table === removeItem.connected_item_type &&
        sourceItem.item_id === removeItem.connected_item_id
      );
    });
  });
  data = data.filter(
    (item: any) => item.item_id != itemId || item.source_table !== itemType
  );
  return data;
}

const getTitle = (key: string) => {
  switch (key) {
    case 'Articles':
      return 'article_title';
    case 'Designs':
      return 'design_title';
    case 'Figures':
      return 'figure_title';
    case 'Journals':
      return 'journal_title';
    case 'Key Terms':
      return 'key_term_title';
    case 'Labs':
      return 'lab_title';
    case 'Models':
      return 'model_title';
    case 'Paradigms':
      return 'paradigm_title';
    case 'Researchers':
      return 'first_name';
    case 'Questions':
      return 'question_title';
    case 'Samples':
      return 'sample_title';
    case 'Tables':
      return 'table_title';
    case 'Techniques':
      return 'technique_title';
    default:
      break;
  }
};

const formatOptions = (options: any[]) => {
  //@ts-ignore
  const optionArr = [];
  options.forEach((option, index) => {
    if (option.source_table === 'researchers') {
      optionArr.push({
        ...option,
        id: index,
        name: `${option.first_name} ${option.last_name}`
      });
    } else if (option.source_table === 'key_terms') {
      optionArr.push({
        ...option,
        source_table: 'Key Terms',
        id: index,
        name: option.title
      });
    } else {
      optionArr.push({
        ...option,
        id: index,
        name: option.title
      });
    }
  });
  //@ts-ignore
  return optionArr;
};

export default function Connection({ projectItemId, itemId, itemType }: any) {
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
  }
  const deleteConnection = useDeleteConnection();
  const { user } = useUser();

  const [navData, setNavData] = useState(navigation);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const deleteExistingConnection = async (id: string) => {
    await deleteConnection.mutateAsync({
      id
    });
    getData();
  };

  const getData = async () => {
    let newNavArr = navigation;
    let connections = [];
    if (projectItemId) {
      //@ts-ignore
      let { data, error } = await supabase.rpc('getconnections', {
        projectitemid: projectItemId,
        itemid: itemId
      });
      //@ts-ignore
      connections = data;

      if (!error && data) {
        newNavArr = [...navigation]; // create a new array from the navigation data
        //@ts-ignore
        data.forEach((connection) => {
          console.log(connection);
          let navIndex;
          if (connection.connected_item_type === 'key_terms') {
            navIndex = newNavArr.findIndex((nav) => nav.name === 'Key Terms');
          } else {
            navIndex = newNavArr.findIndex(
              (nav) => nav.name.toLowerCase() === connection.connected_item_type
            );
          }

          newNavArr[navIndex] = { ...newNavArr[navIndex] }; // create a new object
          newNavArr[navIndex].children = [...newNavArr[navIndex].children]; // create a new children array
          //@ts-ignore
          newNavArr[navIndex].children.push({
            id: connection.id,
            name: connection[`${getTitle(newNavArr[navIndex].name)}`],
            href: `/app/projects/${connection.connected_project_item_id}/${connection.connected_item_type}/${connection.connected_item_id}`
          });
        });
        setNavData(newNavArr);
      }

      if (user) {
        //@ts-ignore
        let { data, error } = await supabase.rpc('getalloptions', {
          userid: user.id
        });
        const formattedOptions = formatOptions(
          removeObjects(data, connections, itemId, itemType)
        );
        //@ts-ignore
        setOptions(formattedOptions);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [projectItemId, open]);

  return (
    <>
      {options && (
        <CreateConnectionModal
          open={open}
          setOpen={setOpen}
          projectItemId={projectItemId}
          itemId={itemId}
          itemType={itemType}
          options={options}
        />
      )}

      <section
        aria-labelledby="timeline-title"
        className="lg:col-span-1 lg:col-start-3"
      >
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2
            id="timeline-title"
            className="text-lg font-medium text-gray-900 flex justify-between items-center"
          >
            Connections
            {options && (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setOpen(true)}
              >
                Add Connection
              </button>
            )}
          </h2>

          {/* Activity Feed */}
          <div className="mt-5 flex flex-grow flex-col">
            <nav
              className="flex-1 space-y-1 bg-white px-2"
              aria-label="Sidebar"
            >
              {navData.map((item) =>
                !item.children ? (
                  <div key={item.name}>
                    <a
                      href="#"
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </div>
                ) : (
                  <Disclosure as="div" key={item.name} className="space-y-1">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                          )}
                        >
                          <item.icon
                            className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="flex-1">{item.name}</span>
                          <svg
                            className={classNames(
                              open
                                ? 'text-gray-400 rotate-90'
                                : 'text-gray-300',
                              'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                            )}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {item.children.map((subItem: any) => (
                            <Disclosure.Button
                              //@ts-ignore
                              key={subItem.name}
                              as="a"
                              //@ts-ignore
                              href={subItem.href}
                              className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                              <div className="flex justify-between w-full">
                                <span>{subItem.name}</span>
                                <MinusCircleIcon
                                  width={24}
                                  className="hover:scale-110 hover:text-red-400"
                                  onClick={(e: any) => {
                                    e.preventDefault();
                                    deleteExistingConnection(subItem.id);
                                  }}
                                />
                              </div>
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
            </nav>
          </div>
          {/* <div className="justify-stretch mt-6 flex flex-col">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Advance to offer
                    </button>
                  </div> */}
        </div>
      </section>
    </>
  );
}
