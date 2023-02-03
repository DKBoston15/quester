import NavigationSideBar from './NavigationSideBar/NavigationSideBar';

export default function Layout({ children }: any) {
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
