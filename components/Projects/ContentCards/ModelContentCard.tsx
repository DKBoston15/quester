import { findItemByName } from '@/utils/helpers';
import { modelTypes } from 'constants/dropdownLists';
import { useDeleteModel } from 'hooks/models/useDeleteModel';
import useGetModelByIdQuery from 'hooks/models/useModelById';
import { useUpdateModel } from 'hooks/models/useUpdateModel';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import TextInputField from '../InputFields/TextInputField';

export default function ModelContentCard({
  model,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledModel,
    isLoading,
    isError
  } = useGetModelByIdQuery({ id: model.id });
  const router = useRouter();
  const deleteModel = useDeleteModel();
  const updateModel = useUpdateModel();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [modelType, setModelType] = useState('');

  useEffect(() => {
    if (pulledModel) {
      if (pulledModel.length > 0) {
        setTitle(pulledModel[0].title);
        setLink(pulledModel[0].link);
        const item1 = findItemByName(modelTypes, pulledModel[0].type);
        setModelType(item1 ? item1 : { id: 0, name: '' });
      }
    }
  }, [model, pulledModel]);

  const updateExistingModel = async () => {
    await updateModel.mutateAsync({
      id: model.id,
      title,
      link,
      type:
        typeof modelType === 'object' && modelType.hasOwnProperty('name')
          ? modelType.name
          : modelType
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    await deleteModel.mutateAsync({
      id: model.id
    });
    router.push(`/app/projects/${model.project_item_id}`);
  };

  return (
    <div className="overflow-visible bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={model.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {modelType.name}
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
                selectedType={modelType}
                setSelectedType={setModelType}
                list={modelTypes}
                title="Model Type"
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
                  onClick={() => updateExistingModel()}
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
