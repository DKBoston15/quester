import { findItemByName } from '@/utils/helpers';
import { techniqueTechniques } from 'constants/dropdownLists';
import { useDeleteTechnique } from 'hooks/techniques/useDeleteTechnique';
import useGetTechniqueByIdQuery from 'hooks/techniques/useTechniqueById';
import { useUpdateTechnique } from 'hooks/techniques/useUpdateTechnique';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import TextInputField from '../InputFields/TextInputField';

export default function TechniqueContentCard({
  technique,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledTechnique,
    isLoading,
    isError
  } = useGetTechniqueByIdQuery({ id: technique.id });
  const router = useRouter();
  const deleteTechnique = useDeleteTechnique();
  const updateTechnique = useUpdateTechnique();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [techniqueType, setTechniqueType] = useState('');
  const [method, setMethod] = useState('');

  useEffect(() => {
    if (pulledTechnique) {
      if (pulledTechnique.length > 0) {
        setTitle(pulledTechnique[0].title);
        setLink(pulledTechnique[0].link);
        const item1 = findItemByName(
          techniqueTechniques,
          pulledTechnique[0].type
        );
        setTechniqueType(item1 ? item1 : { id: 0, name: '' });
        setMethod(pulledTechnique[0].method);
      }
    }
  }, [technique, pulledTechnique]);

  const updateExistingTechnique = async () => {
    await updateTechnique.mutateAsync({
      id: technique.id,
      title,
      link,
      method,
      type:
        typeof techniqueType === 'object' &&
        techniqueType.hasOwnProperty('name')
          ? techniqueType.name
          : techniqueType
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    await deleteTechnique.mutateAsync({
      id: technique.id
    });
    router.push(`/app/projects/${technique.project_item_id}`);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={technique.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {techniqueType.name}
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
                selectedType={techniqueType}
                setSelectedType={setTechniqueType}
                list={techniqueTechniques}
                title="Technique"
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
                  onClick={() => updateExistingTechnique()}
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
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Method</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{method}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={method} setValue={setMethod} />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
