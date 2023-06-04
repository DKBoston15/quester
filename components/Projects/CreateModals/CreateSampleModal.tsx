import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { sampleDesigns, sampleTechniques } from 'constants/dropdownLists';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import { useCreateSample } from 'hooks/samples/useCreateSample';
import { getNameOrOriginal } from '@/utils/helpers';

export default function CreateSampleModal({
  open,
  setOpen,
  projectItemId
}: any) {
  const [title, setTitle] = useState('');
  const [design, setDesign] = useState('');
  const [technique, setTechnique] = useState('');
  const createSample = useCreateSample();

  const createNewSample = async () => {
    if (!createSample) return;
    await createSample.mutateAsync({
      title,
      design: getNameOrOriginal(design),
      technique: getNameOrOriginal(technique),
      projectItemId
    });

    setTitle('');
    setDesign('');
    setTechnique('');
    setOpen(false);
  };

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
              <Dialog.Panel className="relative transform rounded-lg sm:h-[26rem] h-[26rem] bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full">
                  <div className="px-2 py-5 sm:p-6 w-full h-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Create a new sample
                    </h3>
                    <form className="mt-5 sm:flex sm:items-center w-full flex-col flex">
                      <div className="w-full">
                        <label htmlFor="sampleName" className="sr-only">
                          Sample
                        </label>
                        <input
                          name="sampleName"
                          id="sampleName"
                          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black h-12 pl-2"
                          placeholder="Sample Name"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <InputTypeSelectionDropdown
                        selectedType={design}
                        setSelectedType={setDesign}
                        title="Sample Design"
                        list={sampleDesigns}
                      />
                      <InputTypeSelectionDropdown
                        selectedType={technique}
                        setSelectedType={setTechnique}
                        title="Sample Technique"
                        list={sampleTechniques}
                      />
                    </form>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    type="submit"
                    onClick={() => createNewSample()}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
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
