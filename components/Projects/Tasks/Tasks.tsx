import useGetTasksQuery from 'hooks/tasks/useTasks';
import React, { useEffect, useState } from 'react';
import CreateTaskModal from '@/components/Tasks/CreateTaskModal';
import Task from './Task';

export default function Tasks({ projectItemId }: any) {
  const {
    data: tasks,
    isLoading,
    isError
  } = useGetTasksQuery({ projectItemId });
  const [open, setOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [sort, setSort] = useState('Oldest');

  useEffect(() => {
    if (currentFilter == 'all') {
      setFilteredTasks(tasks);
    }
    if (currentFilter == 'done') {
      //@ts-ignore
      const newTasks = tasks.filter((task) => task.status === true);
      setFilteredTasks(Array.isArray(newTasks) ? newTasks : [newTasks]);
    }
    if (currentFilter == 'pending') {
      //@ts-ignore
      const newTasks = tasks.filter((task) => task.status === false);
      setFilteredTasks(Array.isArray(newTasks) ? newTasks : [newTasks]);
    }
  }, [currentFilter]);

  useEffect(() => {
    if (tasks) {
      const newTasks = sortByCreatedAt(tasks, 'asc');
      setFilteredTasks(newTasks);
    }
  }, [tasks]);

  const sortByCreatedAt = (arr: any, order: any) => {
    if (order === 'asc') {
      return arr.sort(
        //@ts-ignore
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else {
      return arr.sort(
        //@ts-ignore
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }
  };

  const handleSort = (e: any) => {
    setSort(e.target.value);
    if (e.target.value === 'Oldest') {
      const newTasks = sortByCreatedAt(filteredTasks, 'asc');
      setFilteredTasks(newTasks);
    } else {
      const newTasks = sortByCreatedAt(filteredTasks, 'desc');
      setFilteredTasks(newTasks);
    }
  };

  return (
    <div className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-700">
      <CreateTaskModal open={open} setOpen={setOpen} />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p
            //@ts-ignore
            tabIndex="0"
            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white"
          >
            Tasks
          </p>
          <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 dark:bg-[#1f242b] dark:text-white hover:bg-gray-300 cursor-pointer rounded">
            <p>Sort By:</p>
            <select
              aria-label="select"
              className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1 cursor-pointer"
              onChange={handleSort}
            >
              <option className="text-sm text-indigo-800">Oldest</option>
              <option className="text-sm text-indigo-800">Latest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-700 dark:text-white dark:border-gray-700 px-4 max-h-[29rem] h-[29rem]">
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
              onClick={() => setCurrentFilter('all')}
            >
              <div
                className={`py-2 px-8 ${
                  currentFilter === 'all'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-blue-600 dark:text-white'
                    : 'text-gray-700 dark:bg-[#1f242b] dark:text-white'
                } rounded-full cursor-pointer`}
              >
                <p>All</p>
              </div>
            </div>
            <div
              className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 cursor-pointer"
              onClick={() => setCurrentFilter('done')}
            >
              <div
                className={`py-2 px-8 ${
                  currentFilter === 'done'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-blue-600 dark:text-white'
                    : 'text-gray-700 dark:bg-[#1f242b] dark:text-white'
                } rounded-full cursor-pointer`}
              >
                <p>Done</p>
              </div>
            </div>
            <div
              className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 cursor-pointer"
              onClick={() => setCurrentFilter('pending')}
            >
              <div
                className={`py-2 px-8 ${
                  currentFilter === 'pending'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-blue-600 dark:text-white'
                    : 'text-gray-700 dark:bg-[#1f242b] dark:text-white'
                } rounded-full cursor-pointer`}
              >
                <p>Pending</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-blue-600 hover:bg-blue-600 focus:outline-none rounded"
          >
            <p className="text-sm font-medium leading-none text-white">
              Add Task
            </p>
          </button>
        </div>
        <div className="mt-7">
          <table className="w-full whitespace-nowrap overflow-visible overflow-scroll">
            {tasks && (
              <tbody>
                {filteredTasks?.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
                <tr className="h-3"></tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
