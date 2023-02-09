import { useDeleteJournal } from 'hooks/journals/useDeleteJournal';
import useGetJournalByIdQuery from 'hooks/journals/useJournalById';
import { useUpdateJournal } from 'hooks/journals/useUpdateJournal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import TextInputField from '../InputFields/TextInputField';

export default function JournalContentCard({
  journal,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledJournal,
    isLoading,
    isError
  } = useGetJournalByIdQuery({ id: journal.id });
  const router = useRouter();
  const deleteJournal = useDeleteJournal();
  const updateJournal = useUpdateJournal();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [impactScore, setImpactScore] = useState('');
  const [editor, setEditor] = useState('');
  const [association, setAssociation] = useState('');
  const [publicationFreq, setPublicationFreq] = useState('');

  useEffect(() => {
    if (pulledJournal) {
      if (pulledJournal.length > 0) {
        setTitle(pulledJournal[0].title);
        setLink(pulledJournal[0].link);
        setImpactScore(pulledJournal[0].impact_score);
        setEditor(pulledJournal[0].editor);
        setAssociation(pulledJournal[0].association);
        setPublicationFreq(pulledJournal[0].publication_freq);
      }
    }
  }, [journal, pulledJournal]);

  const updateExistingJournal = async () => {
    await updateJournal.mutateAsync({
      id: journal.id,
      title,
      link,
      impactScore,
      editor,
      association,
      publicationFreq
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    await deleteJournal.mutateAsync({
      id: journal.id
    });
    router.push(`/app/projects/${journal.project_item_id}/journals`);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={journal.title}
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
                  onClick={() => updateExistingJournal()}
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
            <dt className="text-sm font-medium text-gray-500">Impact Score</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{impactScore}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={impactScore} setValue={setImpactScore} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Editor</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{editor}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={editor} setValue={setEditor} />
            )}
          </div>
        </dl>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Association</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{association}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={association} setValue={setAssociation} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Publication Frequency
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{publicationFreq}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField
                value={publicationFreq}
                setValue={setPublicationFreq}
              />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
