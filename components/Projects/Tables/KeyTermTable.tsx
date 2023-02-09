import { useState } from 'react';
import useGetJournalsByIdQuery from 'hooks/journals/useJournalsById';
import CreateJournalModal from '../CreateModals/CreateJournalModal';
import useGetKeyTermsByIdQuery from 'hooks/key_terms/useKeyTermsById';
import CreateKeyTermModal from '../CreateModals/CreateKeyTermModal';

export default function KeyTermTable({
  projectItemId,
  setSelectedKeyTerm
}: any) {
  const [open, setOpen] = useState(false);
  const {
    data: keyTerms,
    isLoading,
    isError
  } = useGetKeyTermsByIdQuery({ projectItemId });

  return (
    <>
      <CreateKeyTermModal
        open={open}
        setOpen={setOpen}
        projectItemId={projectItemId}
      />
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Key Terms</h1>
            <p className="mt-2 text-sm text-gray-700">
              Key terms provide foundational sets of beliefs and understandings
              about concepts.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setOpen(true)}
            >
              Add key term
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
                        Title
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {keyTerms && (
                      <>
                        {keyTerms.map((keyTerm: any) => (
                          <tr
                            key={keyTerm.id}
                            onClick={() => setSelectedKeyTerm(keyTerm)}
                            className={`hover:bg-gray-100 cursor-pointer`}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {keyTerm.title}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                href={`/app/projects/${projectItemId}/key_terms/${keyTerm.id}`}
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