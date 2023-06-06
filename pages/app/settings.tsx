import { ReactNode, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import SettingsPageTitle from '@/components/Settings/SettingsPageTitle';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@/utils/useUser';
import { postData } from '@/utils/helpers';
import { supabase, updateUserName } from '@/utils/supabase-client';
import TextInputField from '@/components/Projects/InputFields/TextInputField';
import useGetSettings from 'hooks/settings/useSettings';
import { useCreateSetting } from 'hooks/settings/useCreateSetting';
import { useUpdateSetting } from 'hooks/settings/useUpdateSetting';
import { useTheme } from 'next-themes';

const tabs = [
  { name: 'General', href: '#', current: true },
  { name: 'About', href: '#', current: false },
  { name: 'Settings', href: '#', current: false }
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, userDetails, subscription } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { data: settings } = useGetSettings();

  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [inGraduateSchool, setInGraduateSchool] = useState(false);
  const [participatingInCoursework, setParticipatingInCoursework] =
    useState(false);
  const [lookingAtGraduateSchools, setLookingAtGraduateSchools] =
    useState(false);
  const [degreeSeeking, setDegreeSeeking] = useState(false);
  const [university, setUniversity] = useState('');
  const [status, setStatus] = useState('');
  const [conductingResearch, setConductingResearch] = useState(false);
  const [writingProposal, setWritingProposal] = useState(false);
  const [writingDissertation, setWritingDissertation] = useState(false);
  const [attendingConferences, setAttendingConferences] = useState(false);
  const [lookingForPositions, setLookingForPositions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const createSetting = useCreateSetting();

  const createNewSetting = async () => {
    await createSetting?.mutateAsync({
      fieldOfStudy,
      inGraduateSchool,
      participatingInCoursework,
      degreeSeeking,
      university,
      status,
      conductingResearch,
      writingProposal,
      writingDissertation,
      attendingConferences,
      lookingForPositions,
      darkMode
    });
  };

  useEffect(() => {
    if (settings) {
      if (settings.length === 0) {
        createNewSetting();
      } else {
        setFieldOfStudy(settings[0].field_of_study || false);
        setInGraduateSchool(settings[0].in_graduate_school || false);
        setParticipatingInCoursework(
          settings[0].participating_in_coursework || false
        );
        setLookingAtGraduateSchools(
          settings[0].looking_at_graduate_schools || false
        );
        setDegreeSeeking(settings[0].degree_seeking || false);
        setUniversity(settings[0].university || '');
        setConductingResearch(settings[0].conducting_research || false);
        setWritingProposal(settings[0].writing_proposal || false);
        setWritingDissertation(settings[0].writing_dissertation || false);
        setAttendingConferences(settings[0].attending_conferences || false);
        setLookingForPositions(settings[0].looking_for_positions || false);
        setDarkMode(settings[0].dark_mode || false);
      }
    }
  }, [settings]);

  useEffect(() => {
    if (userDetails) {
      setName(
        `${
          userDetails.full_name ??
          `${userDetails.first_name || ''} ${userDetails.last_name || ''}`
        }`
      );
    }
    if (user) {
      //@ts-ignore
      setEmail(user ? user.email : undefined);
    }
  }, [userDetails]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  // const subscriptionPrice =
  //   subscription &&
  //   new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: subscription?.prices?.currency,
  //     minimumFractionDigits: 0
  //   }).format((subscription?.prices?.unit_amount || 0) / 100);

  const [activeTab, setActiveTab] = useState(0);

  const updateUser = async (name: string, email: string) => {
    setCurrentlyUpdating(false);
    //@ts-ignore
    if (email != user.email) {
      const { data, error } = await supabase.auth.updateUser({
        email
      });
    }
    //@ts-ignore
    await updateUserName(user, name);
  };

  const updateSettingsFunc = useUpdateSetting();
  const updateSettings = async () => {
    await updateSettingsFunc?.mutateAsync({
      //@ts-ignore
      id: settings[0].id,
      fieldOfStudy,
      inGraduateSchool,
      participatingInCoursework,
      degreeSeeking,
      university,
      status,
      conductingResearch,
      writingProposal,
      writingDissertation,
      attendingConferences,
      lookingForPositions,
      darkMode
    });
    setCurrentlyUpdating(false);
  };

  return (
    <Layout>
      <SettingsPageTitle />
      <div className="w-full">
        {/* Content area */}
        <div className="">
          <div className="">
            <div className="mx-auto flex flex-col">
              <main className="flex-1">
                <div className="relative w-full px-6">
                  <div className="">
                    <div className="px-4 sm:px-6 lg:px-0">
                      <div className="py-6">
                        {/* Tabs */}
                        <div className="lg:hidden">
                          <label htmlFor="selected-tab" className="sr-only">
                            Select a tab
                          </label>
                          <select
                            id="selected-tab"
                            name="selected-tab"
                            className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                            onChange={(e) => {
                              if (e.target.value === 'General') {
                                setActiveTab(0);
                              }
                              if (e.target.value === 'About') {
                                setActiveTab(1);
                              }
                              if (e.target.value === 'Settings') {
                                setActiveTab(2);
                              }
                            }}
                            //@ts-ignore
                            defaultValue={tabs.find((tab) => tab.current).name}
                          >
                            {tabs.map((tab, index) => (
                              <option
                                key={tab.name}
                                onClick={() => setActiveTab(index)}
                              >
                                {tab.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="hidden lg:block">
                          <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                              {tabs.map((tab, index) => (
                                <a
                                  key={tab.name}
                                  onClick={() => setActiveTab(index)}
                                  className={classNames(
                                    index === activeTab
                                      ? 'border-blue-500 text-blue-600'
                                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 ',
                                    'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer'
                                  )}
                                >
                                  {tab.name}
                                </a>
                              ))}
                            </nav>
                          </div>
                        </div>

                        <div
                          className={`${
                            activeTab === 0 ? 'block' : 'hidden'
                          } flex-auto`}
                          id="link2"
                        >
                          <div className="mt-10 divide-y divide-gray-200">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Profile
                              </h3>
                              <p className="max-w-2xl text-sm text-gray-500">
                                Account Information
                              </p>
                            </div>
                            <div className="mt-6">
                              <dl className="divide-y divide-gray-200">
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Name
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">{name}</span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Name
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <TextInputField
                                          value={name}
                                          setValue={setName}
                                          width="w-[23rem]"
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              updateUser(name, email)
                                            }
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Email
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">{email}</span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}

                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Email
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <TextInputField
                                          value={email}
                                          setValue={setEmail}
                                          width="w-[23rem]"
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              updateUser(name, email)
                                            }
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Your Plan
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      {subscription
                                        ? `${subscription?.prices?.products?.name} plan`
                                        : ''}
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        disabled={loading || !subscription}
                                        onClick={redirectToCustomerPortal}
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Open Account Portal
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${
                            activeTab === 1 ? 'block' : 'hidden'
                          } flex-auto`}
                          id="link2"
                        >
                          <div className="mt-10 divide-y divide-gray-200">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                About
                              </h3>
                              <p className="max-w-2xl text-sm text-gray-500">
                                Information specifically about you and your
                                journey
                              </p>
                            </div>
                            <div className="mt-6">
                              <dl className="divide-y divide-gray-200">
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Field of Study
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {fieldOfStudy}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Field of Study
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <TextInputField
                                          value={fieldOfStudy}
                                          setValue={setFieldOfStudy}
                                          width="w-[23rem]"
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      In Graduate School?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(inGraduateSchool) ==
                                        'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      In Graduate School?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="inGraduateSchool"
                                          name="inGraduateSchool"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={inGraduateSchool || false}
                                          onChange={() => {
                                            setInGraduateSchool(
                                              !inGraduateSchool
                                            );
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Participating in Coursework?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(
                                          participatingInCoursework
                                        ) == 'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Participating in Coursework?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="participatingInCoursework"
                                          name="participatingInCoursework"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={
                                            participatingInCoursework || false
                                          }
                                          onChange={() => {
                                            setParticipatingInCoursework(
                                              !participatingInCoursework
                                            );
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Looking at Graduate Schools?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(
                                          lookingAtGraduateSchools
                                        ) == 'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Looking at Graduate Schools?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="lookingAtGraduateSchools"
                                          name="lookingAtGraduateSchools"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={
                                            lookingAtGraduateSchools || false
                                          }
                                          onChange={() => {
                                            setLookingAtGraduateSchools(
                                              !lookingAtGraduateSchools
                                            );
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Degree Seeking?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(degreeSeeking) ==
                                        'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Degree Seeking?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="degreeSeeking"
                                          name="degreeSeeking"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={degreeSeeking || false}
                                          onChange={() => {
                                            setDegreeSeeking(!degreeSeeking);
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      University
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {university}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      University
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <TextInputField
                                          value={university}
                                          setValue={setUniversity}
                                          width="w-[23rem]"
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Status
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {status}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Status
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <TextInputField
                                          value={status}
                                          setValue={setStatus}
                                          width="w-[23rem]"
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Conducting Research?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(conductingResearch) ==
                                        'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Conducting Research?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="conductingResearch"
                                          name="conductingResearch"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={conductingResearch || false}
                                          onChange={() => {
                                            setConductingResearch(
                                              !conductingResearch
                                            );
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Writing Proposal?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(writingProposal) ==
                                        'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Writing Proposal?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="writingProposal"
                                          name="writingProposal"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={writingProposal || false}
                                          onChange={() => {
                                            setWritingProposal(
                                              !writingProposal
                                            );
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Writing Dissertation?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(writingDissertation) ==
                                        'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Writing Dissertation?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="writingDissertation"
                                          name="writingDissertation"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={writingDissertation || false}
                                          onChange={() => {
                                            setWritingDissertation(
                                              !writingDissertation
                                            );
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Attending Conferences?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(attendingConferences) ==
                                        'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Attending Conferences?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="attendingConferences"
                                          name="attendingConferences"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={
                                            attendingConferences || false
                                          }
                                          onChange={() => {
                                            setAttendingConferences(
                                              !attendingConferences
                                            );
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Looking for Positions?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {JSON.stringify(lookingForPositions) ==
                                        'false'
                                          ? 'No'
                                          : 'Yes'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Looking for Positions?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="lookingForPositions"
                                          name="lookingForPositions"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={lookingForPositions || false}
                                          onChange={() => {
                                            setLookingForPositions(
                                              !lookingForPositions
                                            );
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${
                            activeTab === 2 ? 'block' : 'hidden'
                          } flex-auto`}
                          id="link2"
                        >
                          <div className="mt-10 divide-y divide-gray-200">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Settings
                              </h3>
                              <p className="max-w-2xl text-sm text-gray-500">
                                General settings for your time using Quester.
                              </p>
                            </div>
                            <div className="mt-6">
                              <dl className="divide-y divide-gray-200">
                                {!currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Dark Mode
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        {darkMode ? 'Yes' : 'No'}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setCurrentlyUpdating(true)
                                          }
                                        >
                                          Update
                                        </button>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                                {currentlyUpdating && (
                                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Dark Mode?
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span className="flex-grow">
                                        <input
                                          id="darkMode"
                                          name="darkMode"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={darkMode || false}
                                          onChange={() => {
                                            if (!darkMode) {
                                              setTheme('dark');
                                            } else {
                                              setTheme('light');
                                            }
                                            setDarkMode(!darkMode);
                                          }}
                                        />
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <div className="flex space-x-4 justify-end">
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() =>
                                              setCurrentlyUpdating(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            onClick={() => updateSettings()}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </span>
                                    </dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
