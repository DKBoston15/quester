import Layout from '@/components/Layout/Layout';
import ProjectItemPageTitle from '@/components/Layout/PageTitle/ProjectItemPageTitle';
import React, { useEffect, useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Notes from '@/components/Projects/Notes/Notes';
import Connection from '@/components/Projects/Connection/Connection';
import useGetSampleByIdQuery from 'hooks/samples/useSampleById';
import { getSampleById } from 'queries/samples/get-sample-by-id';
import SampleContentCard from '@/components/Projects/ContentCards/SampleContentCard';

export default function Sample() {
  const router = useRouter();
  const { projectItemId, sampleId } = router.query;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const {
    data: pulledSample,
    isLoading,
    isError
  } = useGetSampleByIdQuery({ id: sampleId });
  const [sample, setSample] = useState();

  useEffect(() => {
    const getSample = async () => {
      if (sampleId) {
        const retrievedSample = await getSampleById({
          id: sampleId
        });
        //@ts-ignore
        setSample(retrievedSample.data[0]);
      }
    };
    getSample();
  }, [sampleId, pulledSample]);

  return (
    <Layout>
      <ProjectItemPageTitle />
      <div className="min-h-full">
        {sample && (
          <main className="py-10">
            {/* Page header */}
            <div className="mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <PencilIcon width={48} color="black" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {
                      //@ts-ignore
                      sample.title
                    }
                  </h1>
                </div>
              </div>
              <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                {/* <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  Share
                </button> */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={() => setOpenDeleteModal(true)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mx-auto mt-8 grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                {/* Description list*/}
                <SampleContentCard
                  sample={sample}
                  openDeleteModal={openDeleteModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded overflow-y-scroll px-4 py-5">
                  <Notes
                    projectItemId={projectItemId}
                    itemId={sampleId}
                    itemType="samples"
                  />
                </div>
              </div>
              <Connection
                projectItemId={projectItemId}
                itemId={sampleId}
                itemType="samples"
              />
            </div>
          </main>
        )}
      </div>
    </Layout>
  );
}
