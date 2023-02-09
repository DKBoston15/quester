import { findItemByName } from '@/utils/helpers';
import { designTechniques } from 'constants/dropdownLists';
import useGetDesignByIdQuery from 'hooks/designs/useGetDesignById';
import { useDeleteDesign } from 'hooks/designs/useDeleteDesign';
import { useUpdateDesign } from 'hooks/designs/useUpdateDesign';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import TextInputField from '../InputFields/TextInputField';
import Datepicker from 'react-tailwindcss-datepicker';
import { format } from 'date-fns';

export default function DesignContentCard({
  design,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledDesign,
    isLoading,
    isError
  } = useGetDesignByIdQuery({ id: design.id });
  const router = useRouter();
  const deleteDesign = useDeleteDesign();
  const updateDesign = useUpdateDesign();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [designType, setDesignType] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });
  const handleDateRangeChange = (newRange) => {
    setDateRange({
      startDate: new Date(newRange.startDate),
      endDate: new Date(newRange.endDate)
    });
  };

  useEffect(() => {
    if (pulledDesign) {
      if (pulledDesign.length > 0) {
        setTitle(pulledDesign[0].title);
        setLink(pulledDesign[0].link);
        const item1 = findItemByName(
          designTechniques,
          pulledDesign[0].technique
        );
        setDesignType(item1 ? item1 : { id: 0, name: '' });
        setDateRange({
          startDate: new Date(pulledDesign[0].start_date),
          endDate: new Date(pulledDesign[0].end_date)
        });
      }
    }
  }, [design, pulledDesign]);

  const updateExistingDesign = async () => {
    await updateDesign.mutateAsync({
      id: design.id,
      title,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      link,
      technique:
        typeof designType === 'object' && designType.hasOwnProperty('name')
          ? designType.name
          : designType
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    await deleteDesign.mutateAsync({
      id: design.id
    });
    router.push(`/app/projects/${design.project_item_id}/designs`);
  };

  return (
    <div className="overflow-visible bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={design.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {designType.name}
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
                selectedType={designType}
                setSelectedType={setDesignType}
                list={designTechniques}
                title="Design Technique"
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
                  onClick={() => updateExistingDesign()}
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
            <dt className="text-sm font-medium text-gray-500 overflow-auto">
              Date Range
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900 text-lg">
                {format(dateRange.startDate, 'MM/dd/yyyy')}
                {' - '}
                {format(dateRange.endDate, 'MM/dd/yyyy')}
              </dd>
            )}
            {currentlyUpdating && (
              <Datepicker value={dateRange} onChange={handleDateRangeChange} />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
