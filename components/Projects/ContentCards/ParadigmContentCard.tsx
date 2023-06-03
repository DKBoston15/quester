import { findItemByName, getNameOrOriginal } from '@/utils/helpers';
import { paradigmTypes } from 'constants/dropdownLists';
import { useDeleteParadigm } from 'hooks/paradigms/useDeleteParadigm';
import useGetParadigmByIdQuery from 'hooks/paradigms/useParadigmById';
import { useUpdateParadigm } from 'hooks/paradigms/useUpdateParadigm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import TextInputField from '../InputFields/TextInputField';

export default function ParadigmContentCard({
  paradigm,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledParadigm,
    isLoading,
    isError
  } = useGetParadigmByIdQuery({ id: paradigm.id });
  const router = useRouter();
  const deleteParadigm = useDeleteParadigm();
  const updateParadigm = useUpdateParadigm();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [paradigmType, setParadigmType] = useState('');

  useEffect(() => {
    if (pulledParadigm) {
      if (pulledParadigm.length > 0) {
        setTitle(pulledParadigm[0].title);
        setLink(pulledParadigm[0].link);
        const item1 = findItemByName(paradigmTypes, pulledParadigm[0].type);
        setParadigmType(item1 ? item1 : { id: 0, name: '' });
      }
    }
  }, [paradigm, pulledParadigm]);

  const updateExistingParadigm = async () => {
    if (!updateParadigm) return;
    await updateParadigm.mutateAsync({
      id: paradigm.id,
      title,
      link,
      category: getNameOrOriginal(paradigmType)
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    if (!deleteParadigm) return;
    await deleteParadigm.mutateAsync({
      id: paradigm.id
    });
    router.push(`/app/projects/${paradigm.project_item_id}`);
  };

  return (
    <div className="overflow-visible bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={paradigm.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {getNameOrOriginal(paradigmType)}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setCurrentlyUpdating(true)}
              >
                Update
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => window.location.assign(link)}
              >
                Link
              </button>
            </div>
          </div>
        )}
        {currentlyUpdating && (
          <div className="flex justify-between">
            <div className="flex flex-col space-y-4">
              <TextInputField
                title="Title"
                value={title}
                setValue={setTitle}
                width="w-[23rem]"
              />
              <InputTypeSelectionDropdown
                selectedType={paradigmType}
                setSelectedType={setParadigmType}
                list={paradigmTypes}
                title="Paradigm Type"
                width="w-[23rem]"
              />
            </div>
            <div className="flex flex-col space-y-12 w-96">
              <div className="flex space-x-4 justify-end">
                <button
                  type="button"
                  className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={() => setCurrentlyUpdating(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={() => updateExistingParadigm()}
                >
                  Save
                </button>
              </div>

              <div className="flex justify-end w-full">
                <TextInputField
                  width="w-96"
                  title="Link"
                  value={link}
                  setValue={setLink}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
