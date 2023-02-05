import Layout from '@/components/Layout/Layout';
import ProjectItemPageTitle from '@/components/Layout/PageTitle/ProjectItemPageTitle';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DesignTable from '@/components/Projects/Tables/DesignTable';

export default function Designs() {
  const router = useRouter();
  const [selectedDesign, setSelectedDesign] = useState({});
  const { projectItemId } = router.query;

  return (
    <Layout>
      <ProjectItemPageTitle />
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-hidden focus:outline-none">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-[40rem] bg-white w-full shadow-lg">
                  {projectItemId && (
                    <DesignTable
                      projectItemId={projectItemId}
                      setSelectedArticle={setSelectedDesign}
                    />
                  )}
                </div>
              </div>
              {/* End main area */}
            </main>
            {/* <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l bg-gray-100 border-gray-200 xl:flex xl:flex-col">
              <div className="absolute inset-0 py-6">
                <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-gray-100 px-4 lg:block text-black">
                  <ArticleSideBar
                    selectedArticle={selectedArticle}
                    projectItemId={projectItemId}
                  />
                </aside>
              </div>
            </aside> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
