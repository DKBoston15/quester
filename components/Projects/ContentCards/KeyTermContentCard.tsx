import { useDeleteKeyTerm } from 'hooks/key_terms/useDeleteKeyTerm';
import useGetKeyTermByIdQuery from 'hooks/key_terms/useKeyTermById';
import { useUpdateKeyTerm } from 'hooks/key_terms/useUpdateKeyTerms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import TextInputField from '../InputFields/TextInputField';

export default function KeyTermContentCard({
  keyTerm,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledKeyTerm,
    isLoading,
    isError
  } = useGetKeyTermByIdQuery({ id: keyTerm.id });
  const router = useRouter();
  const deleteKeyTerm = useDeleteKeyTerm();
  const updateKeyTerm = useUpdateKeyTerm();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [googleScholarLabel, setGoogleScholarLabel] = useState('');

  useEffect(() => {
    if (pulledKeyTerm) {
      if (pulledKeyTerm.length > 0) {
        setTitle(pulledKeyTerm[0].title);
        setLink(pulledKeyTerm[0].link);
        setGoogleScholarLabel(pulledKeyTerm[0].google_scholar_label);
      }
    }
  }, [keyTerm, pulledKeyTerm]);

  const updateExistingKeyTerm = async () => {
    await updateKeyTerm.mutateAsync({
      id: keyTerm.id,
      title,
      link,
      googleScholarLabel
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    await deleteKeyTerm.mutateAsync({
      id: keyTerm.id
    });
    router.push(`/app/projects/${keyTerm.project_item_id}`);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={keyTerm.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
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
                  onClick={() => updateExistingKeyTerm()}
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
            <dt className="text-sm font-medium text-gray-500">
              Google Scholar Label
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">
                {googleScholarLabel}
              </dd>
            )}
            {currentlyUpdating && (
              <TextInputField
                value={googleScholarLabel}
                setValue={setGoogleScholarLabel}
              />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
