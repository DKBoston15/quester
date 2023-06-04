import useGetProjectsQuery from 'hooks/projects/useProjects';
import { useUpdateProject } from 'hooks/projects/useUpdateProject';
import React, { useEffect, useState } from 'react';
import ChecklistItem from './ChecklistItem';
import { ReactSortable } from 'react-sortablejs';
import CreateChecklistItemModal from '../CreateModals/CreateChecklistItemModal';

export default function Checklist({ projectItemId }: any) {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [checklist, setSelectedChecklist] = useState([]);
  const [open, setOpen] = useState(false);
  const updateProject = useUpdateProject();

  useEffect(() => {
    if (projects) {
      const project = projects.find((project) => project.id == projectItemId);
      if (project) {
        console.log(project.checklist);
        setSelectedChecklist(project.checklist);
      }
    }
  }, [projects]);

  const addChecklistItem = async (newItem: { [key: string]: any }) => {
    if (checklist) {
      const updatedArray = [newItem, ...checklist];
      //@ts-ignore
      setSelectedChecklist(updatedArray);
      if (!updateProject) return;
      await updateProject.mutateAsync({
        id: projectItemId,
        checklist: updatedArray
      });
    }
  };

  const removeChecklistItem = async (id: number) => {
    //@ts-ignore
    const updatedArray = checklist.filter((item) => item.id !== id);
    setSelectedChecklist(updatedArray);
    if (!updateProject) return;
    await updateProject.mutateAsync({
      id: projectItemId,
      checklist: updatedArray
    });
  };

  function updateArrayItemByIdValue(
    array: any[],
    id: number,
    update: { [key: string]: any }
  ) {
    return array.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return { ...item, val: update };
    });
  }

  const updateChecklistValue = async (
    id: number,
    update: { [key: string]: any }
  ) => {
    if (checklist) {
      const updatedArray = updateArrayItemByIdValue(checklist, id, update);
      console.log(updatedArray);
      if (!updateProject) return;
      await updateProject.mutateAsync({
        id: projectItemId,
        checklist: updatedArray
      });
    }
  };

  function updateArrayItemById(
    array: any[],
    id: number,
    update: { [key: string]: any }
  ) {
    return array.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return { ...item, ...update };
    });
  }

  const updateChecklist = async (
    id: number,
    update: { [key: string]: any }
  ) => {
    if (checklist) {
      const updatedArray = updateArrayItemById(checklist, id, update);
      if (!updateProject) return;
      await updateProject.mutateAsync({
        id: projectItemId,
        checklist: updatedArray
      });
    }
  };

  const updateChecklistDragged = async (newChecklist: any) => {
    setSelectedChecklist(newChecklist);
    if (checklist) {
      if (!updateProject) return;
      await updateProject.mutateAsync({
        id: projectItemId,
        checklist: newChecklist
      });
    }
  };

  return (
    <>
      <CreateChecklistItemModal
        open={open}
        setOpen={setOpen}
        addChecklistItem={addChecklistItem}
      />
      <div className="flex flex-col space-y-4">
        <>
          <div className="flex justify-between">
            <h3 className="text-black text-xl font-bold">Checklist</h3>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={() => setOpen(true)}
            >
              Add Item
            </button>
          </div>
          {checklist && (
            <ReactSortable list={checklist} setList={updateChecklistDragged}>
              {checklist.map((checklistItem: any) => (
                <ChecklistItem
                  key={checklistItem.id}
                  checklistItem={checklistItem}
                  updateChecklist={updateChecklist}
                  updateChecklistValue={updateChecklistValue}
                  removeChecklistItem={removeChecklistItem}
                />
              ))}
            </ReactSortable>
          )}
        </>
      </div>
    </>
  );
}
