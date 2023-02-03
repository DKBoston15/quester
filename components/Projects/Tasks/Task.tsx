import React, { Fragment, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useDeleteTask } from 'hooks/tasks/useDeleteTask';
import { useUpdateTask } from 'hooks/tasks/useUpdateTask';
import EditTaskModal from '../../Tasks/EditTaskModal';

export default function Task({ task }: any) {
  const [status, setStatus] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    setStatus(task.status);
  }, []);

  const updateExistingTask = async (status: boolean) => {
    await updateTask.mutateAsync({
      id: task.id,
      title: task.title,
      dueDate: task.due_date,
      status,
      urgency: task.urgency
    });
  };

  const deleteExistingTask = async () => {
    await deleteTask.mutateAsync({
      id: task.id
    });
  };

  return (
    <tr
      tabIndex={0}
      className="focus:outline-none h-16 border border-gray-100 dark:border-[#1f242b] rounded"
    >
      <EditTaskModal task={task} open={editingTask} setOpen={setEditingTask} />
      {task && (
        <>
          <td>
            <div className="ml-5">
              <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                <input
                  aria-describedby="checklist-item-description"
                  name="taskItem"
                  type="checkbox"
                  checked={status}
                  onChange={(e) => {
                    setStatus(e.target.checked);
                    updateExistingTask(e.target.checked);
                  }}
                  className="h-6 w-6 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:bg-[#1f242b]"
                />
                <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                  <svg
                    className="icon icon-tabler icon-tabler-check"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
              </div>
            </div>
          </td>
          <td className="">
            <div className="flex items-center pl-5">
              <p className="text-base font-medium leading-none text-gray-700 mr-2 dark:text-white">
                {task.title}
              </p>
            </div>
          </td>
          <td className="pl-24">
            <div className="flex items-center">
              <p className="text-sm leading-none text-gray-600 ml-2 dark:text-gray-200">
                {task.urgency}
              </p>
            </div>
          </td>

          <td className="pl-5">
            {task.due_date && (
              <button className="py-3 px-3 text-sm focus:outline-none leading-none text-gray-700 bg-gray-100 rounded">
                Due {new Date(task.due_date).toLocaleDateString()}
              </button>
            )}
          </td>
          <td>
            <div className="relative px-5 pt-2 overflow-visible">
              <Menu as="div" className="flex-shrink-0 pr-2">
                <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#1f242b] dark:text-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="h-5 w-5" />
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
                  <Menu.Items className="absolute right-10 top-3 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => setEditingTask(true)}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Edit
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => deleteExistingTask()}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Delete
                          </div>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Share
                            </a>
                          )}
                        </Menu.Item> */}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
