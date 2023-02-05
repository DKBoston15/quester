import { useState } from 'react';
import useGetResearchersByIdQuery from 'hooks/researchers/useResearchersById';
import CreateResearcherModal from '../CreateModals/CreateResearcherModal';

export default function ResearcherTable({
  projectItemId,
  setSelectedResearcher
}: any) {
  const [open, setOpen] = useState(false);
  const {
    data: researchers,
    isLoading,
    isError
  } = useGetResearchersByIdQuery({ projectItemId });

  return (
    <>
      <CreateResearcherModal
        open={open}
        setOpen={setOpen}
        projectItemId={projectItemId}
      />
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Researchers</h1>
            <p className="mt-2 text-sm text-gray-700">
              Researchers provide foundational sets of beliefs and
              understandings about the section of authors in writing.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setOpen(true)}
            >
              Add researcher
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {researchers && (
                      <>
                        {researchers.map((researcher: any) => (
                          <tr
                            key={researcher.id}
                            onClick={() => setSelectedResearcher(researcher)}
                            className={`hover:bg-gray-100 cursor-pointer`}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {researcher.first_name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {researcher.last_name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {researcher.email}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                href={`/app/projects/${projectItemId}/researchers/${researcher.id}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
