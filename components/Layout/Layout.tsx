import { useUser } from '@/utils/useUser';
import router from 'next/router';
import { useEffect } from 'react';
import NavigationSideBar from './NavigationSideBar/NavigationSideBar';

export default function Layout({ children }: any) {
  const { user, subscription, isLoadingData } = useUser();

  useEffect(() => {
    console.log(isLoadingData);
    if (!isLoadingData) {
      if (user && !subscription) {
        router.replace('/plans');
      }
    }
  }, [isLoadingData]);

  return (
    <>
      <div className="min-h-full h-full">
        <NavigationSideBar />

        <div className="flex flex-1 flex-col lg:pl-64 h-full">
          <main className="flex-1 dark:text-white dark:bg-[#1f242b]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
