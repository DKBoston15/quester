import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useUpdateTask } from 'hooks/tasks/useUpdateTask';
import DatePicker from 'react-datepicker';

const urgencyStatuses = [
  { id: 1, name: 'No Urgency' },
  { id: 2, name: 'Minor' },
  { id: 3, name: 'Medium' },
  { id: 4, name: 'Major' },
  { id: 5, name: 'Critical' }
];

export default function EditTaskModal({ open, setOpen, task }: any) {
  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState('');
  const [urgency, setUrgency] = useState(urgencyStatuses[0]);
  const [dueDate, setDueDate] = useState();
  const updateTask = useUpdateTask();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  const findItemByName = (name: string) => {
    return urgencyStatuses.find((item) => item.name === name);
  };

  useEffect(() => {
    setTitle(task.title);
    setUrgency(findItemByName(task.urgency));
    if (task.due_date) {
      setDueDate(new Date(task.due_date));
    }
  }, []);

  const editCurrentTask = async () => {
    await updateTask.mutateAsync({
      id: task.id,
      title: title,
      dueDate: dueDate,
      urgency: urgency.name
    });
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Create Task
                    </Dialog.Title>
                    <div className="mt-2 w-full">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <div className="mt-1">
                        <input
                          name="title"
                          id="title"
                          className="block w-full h-8 p-2 text-black rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Task Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <Listbox value={urgency} onChange={setUrgency}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block mt-2 text-sm font-medium text-gray-700">
                            Urgency
                          </Listbox.Label>
                          <div className="relative mt-1 text-black">
                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                              <span className="block truncate">
                                {urgency.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {urgencyStatuses.map((urgencyStatus) => (
                                  <Listbox.Option
                                    key={urgencyStatus.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? 'text-white bg-indigo-600'
                                          : 'text-gray-900',
                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                      )
                                    }
                                    value={urgencyStatus}
                                  >
                                    {({ urgency, active }: any) => (
                                      <>
                                        <span
                                          className={classNames(
                                            urgency
                                              ? 'font-semibold'
                                              : 'font-normal',
                                            'block truncate'
                                          )}
                                        >
                                          {urgencyStatus.name}
                                        </span>

                                        {urgency ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? 'text-white'
                                                : 'text-indigo-600',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                    <div className="w-full mt-4">
                      <label
                        htmlFor="date"
                        className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Due Date
                      </label>
                      <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => editCurrentTask()}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setDueDate(null);
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
