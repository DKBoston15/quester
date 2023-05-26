import { ReactNode, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import SettingsPageTitle from '@/components/Settings/SettingsPageTitle';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@/utils/useUser';
import { postData } from '@/utils/helpers';
import LoadingDots from '@/components/LoadingDots';
import Link from 'next/link';
import { supabase, updateUserName } from '@/utils/supabase-client';
import TextInputField from '@/components/Projects/InputFields/TextInputField';

const tabs = [
  { name: 'General', href: '#', current: true },
  { name: 'About', href: '#', current: false },
  { name: 'Settings', href: '#', current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
        {footer}
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

export default function Settings() {
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, userDetails, isLoading, subscription } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
    if (email != user.email) {
      const { data, error } = await supabase.auth.updateUser({
        email
      });
    }
    await updateUserName(user, name);
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
                                        ? `${subscription?.prices?.products?.name} plan.`
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
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Field of Study
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      Chelsea Hagon
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    In Graduate School?
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Participating in Coursework?
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Looking at Graduate Schools?
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Degree Seeking
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    University
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Status
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Conducting Research?
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Writing Proposal?
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Writing Dissertation?
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Attending Conferences?
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Looking for Positions?
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      chelsea.hagon@example.com
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
                                {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                                <dt className="text-sm font-medium text-gray-500">
                                  Job title
                                </dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  <span className="flex-grow">
                                    Human Resources Manager
                                  </span>
                                  <span className="ml-4 flex-shrink-0">
                                    <button
                                      type="button"
                                      className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                      Update
                                    </button>
                                  </span>
                                </dd>
                              </div> */}
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
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Dark Mode
                                  </dt>
                                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">
                                      Chelsea Hagon
                                    </span>
                                    <span className="ml-4 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </dd>
                                </div>
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
