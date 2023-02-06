import useGetProjectsQuery from 'hooks/projects/useProjects';
import { useUpdateProject } from 'hooks/projects/useUpdateProject';
import { useEffect, useState } from 'react';

export default function ProjectContentCard({ projectItemId }: any) {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [selectedProject, setSelectedProject] = useState();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [description, setDescription] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const updateProject = useUpdateProject();

  useEffect(() => {
    if (projects) {
      const project = projects.find((project) => project.id == projectItemId);
      if (project) {
        setSelectedProject(project);
        setProjectTitle(project.title);
        setDescription(project.description);
      }
    }
  }, [projects, projectItemId]);

  const saveUpdates = async () => {
    await updateProject.mutateAsync({
      id: selectedProject.id,
      title: projectTitle,
      type: undefined,
      bgColorClass: undefined,
      pinned: undefined,
      description: description
    });
    setCurrentlyUpdating(false);
  };

  return (
    <div className=" p-4">
      {selectedProject && (
        <>
          <div>
            <div className="flex justify-between">
              <dd className="flex justify-between items-center w-full">
                {!currentlyUpdating && (
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {selectedProject.title}
                  </h3>
                )}
                {currentlyUpdating && (
                  <>
                    <label htmlFor="email" className="sr-only">
                      Title
                    </label>
                    <input
                      type="title"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      name="title"
                      id="title"
                      className="block w-full rounded-md border-gray-300 border p-2 w-full focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                      placeholder="Project Title"
                    />
                  </>
                )}
              </dd>
              <span className="flex flex-col space-y-4 space-between ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => saveUpdates()}
                  className={`rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    currentlyUpdating ? 'visible' : 'hidden'
                  }`}
                >
                  {currentlyUpdating ? 'Save' : ''}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentlyUpdating(!currentlyUpdating)}
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {currentlyUpdating ? 'Close' : 'Update'}
                </button>
              </span>
            </div>

            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {selectedProject.type}
            </p>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {currentlyUpdating && (
                    <div className="w-full">
                      <label htmlFor="description" className="sr-only">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full p-2 h-24 rounded-md border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder=" Enter your project description here"
                      />
                    </div>
                  )}
                  {!currentlyUpdating && (
                    <span className="flex-grow">
                      {selectedProject.description}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </div>
  );
}
