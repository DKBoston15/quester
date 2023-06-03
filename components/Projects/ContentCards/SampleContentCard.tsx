import { findItemByName, getNameOrOriginal } from '@/utils/helpers';
import { sampleDesigns } from 'constants/dropdownLists';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import TextInputField from '../InputFields/TextInputField';
import Datepicker from 'react-tailwindcss-datepicker';
import { format } from 'date-fns';
import useGetSampleByIdQuery from 'hooks/samples/useSampleById';
import { useDeleteSample } from 'hooks/samples/useDeleteSample';
import { useUpdateSample } from 'hooks/samples/useUpdateSample';

export default function SampleContentCard({
  sample,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledSample,
    isLoading,
    isError
  } = useGetSampleByIdQuery({ id: sample.id });
  const router = useRouter();
  const deleteSample = useDeleteSample();
  const updateSample = useUpdateSample();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [design, setDesign] = useState('');
  const [size, setSize] = useState('');
  const [finalSample, setFinalSample] = useState('');
  const [powerAnalysis, setPowerAnalysis] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
  const handleDateRangeChange = (newRange: any) => {
    setDateRange({
      startDate: new Date(newRange.startDate),
      endDate: new Date(newRange.endDate)
    });
  };

  useEffect(() => {
    if (pulledSample) {
      if (pulledSample.length > 0) {
        setTitle(pulledSample[0].title);
        setLink(pulledSample[0].link);
        const item1 = findItemByName(sampleDesigns, pulledSample[0].design);
        setDesign(item1 ? item1 : { id: 0, name: '' });
        setSize(pulledSample[0].size);
        setFinalSample(pulledSample[0].final_sample);
        setPowerAnalysis(pulledSample[0].power_analysis);
        if (pulledSample[0].start_date) {
          setDateRange({
            startDate: new Date(pulledSample[0].start_date),
            endDate: new Date(pulledSample[0].end_date)
          });
        }
      }
    }
  }, [sample, pulledSample]);

  const updateExistingSample = async () => {
    if (!updateSample) return;
    await updateSample.mutateAsync({
      id: sample.id,
      title,
      link,
      design: getNameOrOriginal(design),
      size,
      finalSample,
      powerAnalysis,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    if (!deleteSample) return;
    await deleteSample.mutateAsync({
      id: sample.id
    });
    router.push(`/app/projects/${sample.project_item_id}`);
  };

  return (
    <div className="overflow-visible bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={sample.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {sample.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {getNameOrOriginal(design)}
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
                selectedType={design}
                setSelectedType={setDesign}
                list={sampleDesigns}
                title="Sample Design"
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
                  onClick={() => updateExistingSample()}
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
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Size</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{size}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={size} setValue={setSize} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Final Sample</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{finalSample}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={finalSample} setValue={setFinalSample} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Power Analysis
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{powerAnalysis}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField
                value={powerAnalysis}
                setValue={setPowerAnalysis}
              />
            )}
          </div>
        </dl>
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
