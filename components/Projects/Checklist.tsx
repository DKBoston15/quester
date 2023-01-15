import useGetProjectsQuery from 'hooks/projects/useProjects';
import { useUpdateProject } from 'hooks/projects/useUpdateProject';
import React, { useEffect, useState } from 'react';
import ChecklistItem from './ChecklistItem';

export default function Checklist({ projectItemId }: any) {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [checklist, setSelectedChecklist] = useState([]);
  const updateProject = useUpdateProject();

  useEffect(() => {
    if (projects) {
      const project = projects.find((project) => project.id == projectItemId);
      setSelectedChecklist(project.checklist);
    }
  }, [projects]);

  function updateArrayItemById(
    array: any[],
    id: number,
    update: { val: boolean }
  ) {
    return array.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return { ...item, ...update };
    });
  }

  const updateChecklist = async (id: number, value: boolean) => {
    if (checklist) {
      const updatedArray = updateArrayItemById(checklist, id, { val: value });
      await updateProject.mutateAsync({
        id: projectItemId,
        checklist: updatedArray
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {checklist.length > 0 && (
        <>
          {checklist.map((checklistItem: any) => (
            <ChecklistItem
              key={checklistItem.id}
              checklistItem={checklistItem}
              projectItemId={projectItemId}
              updateChecklist={updateChecklist}
            />
          ))}
        </>
      )}
    </div>
  );
}
