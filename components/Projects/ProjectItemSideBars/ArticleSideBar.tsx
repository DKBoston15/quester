import { useRouter } from 'next/router';
import React from 'react';

export default function ArticleSideBar({
  projectItemId,
  selectedArticle
}: any) {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className=" flex flex-col">
        <span className="text-2xl font-bold">{selectedArticle.title}</span>
        <span className="text-md text-gray-400 font-bold">
          {selectedArticle.literature_type}
        </span>
      </div>
      <hr className="my-4" />
      <div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">
            Research Paradigm
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            Margot Foster
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">Read?</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="read"
                  aria-describedby="read-checkbox"
                  name="read"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          </dd>
        </div>
      </div>
      <div>Citation</div>
      <div className="py-4 w-full">
        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-evenly w-full">
          {selectedArticle.link && (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <a href={`${selectedArticle.link}`} target="_blank">
                Open article link
              </a>
            </button>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={() =>
              router.push(
                `/app/projects/${projectItemId}/articles/${selectedArticle.id}`
              )
            }
          >
            View
          </button>
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            // onClick={() => setOpen(true)}
          >
            Share
          </button> */}
        </dd>
      </div>
    </div>
  );
}
