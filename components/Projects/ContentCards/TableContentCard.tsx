import { useDeleteTable } from 'hooks/tables/useDeleteTable';
import useGetTableByIdQuery from 'hooks/tables/useTableById';
import { useUpdateTable } from 'hooks/tables/useUpdateTable';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import TextInputField from '../InputFields/TextInputField';

export default function TableContentCard({
  table,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledTable,
    isLoading,
    isError
  } = useGetTableByIdQuery({ id: table.id });
  const router = useRouter();
  const deleteTable = useDeleteTable();
  const updateTable = useUpdateTable();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [number, setNumber] = useState('');
  const [rowCount, setRowCount] = useState('');
  const [columnCount, setColumnCount] = useState('');

  useEffect(() => {
    if (pulledTable) {
      if (pulledTable.length > 0) {
        setTitle(pulledTable[0].title);
        setLink(pulledTable[0].link);
        setNumber(pulledTable[0].number);
        setRowCount(pulledTable[0].number);
        setColumnCount(pulledTable[0].number);
      }
    }
  }, [table, pulledTable]);

  const updateExistingTable = async () => {
    if (!updateTable) return;
    await updateTable.mutateAsync({
      id: table.id,
      title,
      link,
      number,
      rowCount,
      columnCount
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    if (!deleteTable) return;
    await deleteTable.mutateAsync({
      id: table.id
    });
    router.push(`/app/projects/${table.project_item_id}`);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={table.title}
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
                  onClick={() => updateExistingTable()}
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
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Number</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{number}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={number} setValue={setNumber} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Column Count</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{columnCount}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={columnCount} setValue={setColumnCount} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Row Count</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{rowCount}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={rowCount} setValue={setRowCount} />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
