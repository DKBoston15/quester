import React, { Fragment, useEffect, useState } from 'react';
import { useSidebar } from 'context/SidebarContext';
import { Dialog, Transition } from '@headlessui/react';
import {
  DocumentChartBarIcon,
  HomeIcon,
  ScaleIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeSelector from '@/components/ThemeSelector';
import { useUser } from '@/utils/useUser';

const navigation = [
  { name: 'Projects', href: '/app/projects', icon: HomeIcon, current: true },
  {
    name: 'Documents',
    href: '/app/documents',
    icon: ScaleIcon,
    current: false
  },
  // { name: 'Tasks', href: '/app/tasks', icon: CreditCardIcon, current: false },
  {
    name: 'Knowledge Base',
    href: '/app/knowledge_base',
    icon: UserGroupIcon,
    current: false
  },
  {
    name: 'Courses',
    href: '/app/courses',
    icon: DocumentChartBarIcon,
    current: false
  }
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function NavigationSideBar() {
  const [sidebarOpen, toggleSidebar] = useSidebar();
  const { user, userDetails, subscription } = useUser();
  const [name, setName] = useState('');

  useEffect(() => {
    if (userDetails) {
      setName(
        `${
          userDetails.full_name ??
          `${userDetails.first_name || ''} ${userDetails.last_name || ''}`
        }`
      );
    }
  }, [userDetails]);

  const router = useRouter();

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={toggleSidebar}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-blue-700 dark:bg-gray-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => toggleSidebar()}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="w-[3rem] h-[6rem] mt-[-1rem] w-auto object-cover ml-[-1rem]"
                    src="/nav_logo.png"
                    alt="Quester logo"
                  />
                </div>
                <nav
                  className="mt-2 h-full flex-shrink-0 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="space-y-2 px-2 ml-4 text-lg">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-white-800 text-white'
                            : 'text-white-100 hover:text-white hover:bg-white-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <div className="flex cursor-pointer">
                          <item.icon
                            className="mr-4 h-6 w-6 flex-shrink-0 text-white-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-blue-700 dark:bg-gray-700 pt-5">
          <div className="flex flex-shrink-0 items-center px-4 ml-[-1rem]">
            <img
              className="w-[3rem] h-[6rem] mt-[-1rem] w-auto object-cover"
              src="/nav_logo.png"
              alt="Quester logo"
            />
          </div>
          <nav
            className="mt-2 flex flex-1 flex-col overflow-y-auto justify-between"
            aria-label="Sidebar"
          >
            <div>
              <div className="space-y-4 px-2 ml-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-white-800 text-white'
                        : 'text-white-100 hover:text-white hover:bg-white-600',
                      'group flex items-center px-2 py-2 text-lg leading-6 font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <div className="flex cursor-pointer">
                      <item.icon
                        className="mr-4 h-6 w-6 flex-shrink-0 text-white-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4 justify-between dark:bg-gray-800">
              <div className="group block w-full flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <a className="ml-3" href="/app/settings">
                      <p className="text-sm font-medium text-white">{name}</p>
                      <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                        View settings
                      </p>
                    </a>
                  </div>
                  <ThemeSelector />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
