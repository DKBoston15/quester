import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProjectTypeSelectionDropdown from '../InputFields/ProjectTypeSelectionDropdown';

export default function CreateProjectModal({
  open,
  setOpen,
  selectedType,
  setSelectedType,
  createNewProject,
  projectName,
  setProjectName
}: any) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg sm:h-[22rem] h-96 bg-white dark:bg-[#1f242b] px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon
                      className="h-6 w-6 dark:text-white "
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full">
                  <div className="px-2 py-5 sm:p-6 w-full h-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Create a new project
                    </h3>
                    <form className="mt-5 sm:flex sm:items-center w-full flex-col flex">
                      <div className="w-full">
                        <label
                          htmlFor="projectName"
                          className="text-sm font-medium"
                        >
                          Project Name
                        </label>
                        <input
                          name="projectName"
                          id="projectName"
                          className="block w-full rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-700 shadow-sm mt-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black h-12 pl-2"
                          placeholder="Project Name"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </div>
                      <ProjectTypeSelectionDropdown
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                      />
                    </form>
                  </div>
                </div>
                <div className="sm:flex sm:flex-row-reverse">
                  <button
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    type="submit"
                    onClick={() => createNewProject()}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-700 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
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
