import { useUser } from '@/utils/useUser';
import { checklists } from 'constants/checklists';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Checklist from '../Checklist/Checklist';
import ProjectContentCard from '../ContentCards/ProjectContentCard';
import Notes from '../Notes/Notes';
import Tasks from '../Tasks/Tasks';

export const Tabs = ({ color }: any) => {
  const { user } = useUser();
  const [openTab, setOpenTab] = useState(1);
  const router = useRouter();
  const { projectItemId } = router.query;

  return (
    <>
      <div className="flex flex-wrap dark:bg-[#1f242b]">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 3
                    ? 'text-white bg-' + color + '-600 '
                    : 'text-' + color + '-600 bg-white ') +
                  (openTab === 3
                    ? 'dark:bg-blue-600 dark:text-white dark:border-blue-600'
                    : 'dark:bg-gray-700 dark:text-white dark:border-gray-700')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Overview
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 4
                    ? 'text-white bg-' + color + '-600 '
                    : 'text-' + color + '-600 bg-white ') +
                  (openTab === 4
                    ? 'dark:bg-blue-600 dark:text-white dark:border-blue-600'
                    : 'dark:bg-gray-700 dark:text-white dark:border-gray-700')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                Checklist
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1
                    ? 'text-white bg-' + color + '-600 '
                    : 'text-' + color + '-600 bg-white ') +
                  (openTab === 1
                    ? 'dark:bg-blue-600 dark:text-white dark:border-blue-600'
                    : 'dark:bg-gray-700 dark:text-white dark:border-gray-700')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Tasks
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 2
                    ? 'text-white bg-' + color + '-600 '
                    : 'text-' + color + '-600 bg-white ') +
                  (openTab === 2
                    ? 'dark:bg-blue-600 dark:text-white dark:border-blue-600'
                    : 'dark:bg-gray-700 dark:text-white dark:border-gray-700')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Notes
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-700 dark:text-white dark:border-gray-700 w-full mb-6 shadow-lg rounded overflow-y-scroll">
            <div className="">
              <div className="tab-content tab-space">
                <div
                  className={`${
                    openTab === 1 ? 'block' : 'hidden'
                  } p-2 flex-auto`}
                  id="link1"
                >
                  {projectItemId && <Tasks projectItemId={projectItemId} />}
                </div>
                <div
                  className={`${
                    openTab === 2 ? 'block' : 'hidden'
                  } px-4 py-5 flex-auto`}
                  id="link2"
                >
                  {projectItemId && <Notes projectItemId={projectItemId} />}
                </div>
                <div
                  className={`${
                    openTab === 3 ? 'block' : 'hidden'
                  } px-4 py-5 flex-auto`}
                  id="link3"
                >
                  {projectItemId && (
                    <ProjectContentCard projectItemId={projectItemId} />
                  )}
                </div>
                {user?.id && (
                  <div
                    className={`${
                      openTab === 4 ? 'block' : 'hidden'
                    } px-4 py-5 flex-auto`}
                    id="link4"
                  >
                    <Checklist projectItemId={projectItemId} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
