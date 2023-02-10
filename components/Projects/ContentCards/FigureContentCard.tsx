import { findItemByName } from '@/utils/helpers';
import {
  analyticDesigns,
  articleTypes,
  figureTypes,
  paradigmTypes,
  researchDesigns,
  sampleDesigns,
  sampleTechniques
} from 'constants/dropdownLists';
import useGetArticleByIdQuery from 'hooks/articles/useArticleById';
import { useDeleteArticle } from 'hooks/articles/useDeleteArticle';
import { useUpdateArticle } from 'hooks/articles/useUpdateArticle';
import { useDeleteFigure } from 'hooks/figures/useDeleteFigure';
import useGetFigureByIdQuery from 'hooks/figures/useFigureById';
import { useUpdateFigure } from 'hooks/figures/useUpdateFigure';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import TextInputField from '../InputFields/TextInputField';

export default function FigureContentCard({
  figure,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledFigure,
    isLoading,
    isError
  } = useGetFigureByIdQuery({ id: figure.id });
  const router = useRouter();
  const deleteFigure = useDeleteFigure();
  const updateFigure = useUpdateFigure();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [figureType, setFigureType] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (pulledFigure) {
      if (pulledFigure.length > 0) {
        setTitle(pulledFigure[0].title);
        setLink(pulledFigure[0].link);
        const item1 = findItemByName(figureTypes, pulledFigure[0].type);
        setFigureType(item1 ? item1 : { id: 0, name: '' });
        setNumber(pulledFigure[0].number);
      }
    }
  }, [figure, pulledFigure]);

  const updateExistingFigure = async () => {
    await updateFigure.mutateAsync({
      id: figure.id,
      title,
      link,
      number,
      type:
        typeof figureType === 'object' && figureType.hasOwnProperty('name')
          ? figureType.name
          : figureType
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    await deleteFigure.mutateAsync({
      id: figure.id
    });
    router.push(`/app/projects/${figure.project_item_id}`);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={figure.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {figureType.name}
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
                selectedType={figureType}
                setSelectedType={setFigureType}
                list={figureTypes}
                title="Figure Type"
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
                  onClick={() => updateExistingFigure()}
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
            <dt className="text-sm font-medium text-gray-500">Figure Number</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{number}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={number} setValue={setNumber} />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
