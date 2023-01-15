import React, { useState } from 'react';
import useGetNotesQuery from 'hooks/notes/useNotes';

import { useCreateNote } from 'hooks/notes/useCreateNote';

import Note from './Note';

export default function Notes({ projectItemId }: any) {
  const createNote = useCreateNote();

  const {
    data: notes,
    isLoading,
    isError
  } = useGetNotesQuery({ projectItemId });
  const [body, setBody] = useState('');

  const createNewNote = async () => {
    await createNote.mutateAsync({
      body,
      projectItemId
    });

    setBody('');
  };

  return (
    <section aria-labelledby="notes-title">
      {!isLoading && (
        <div className="sm:overflow-hidden sm:rounded-lg">
          <div className="divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h2
                id="notes-title"
                className="text-lg font-medium text-gray-900"
              >
                Notes
              </h2>
            </div>
            <div className="px-4 py-6 sm:px-6">
              <ul role="list" className="space-y-8">
                {notes?.map((note) => (
                  <Note key={note.id} note={note} />
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-6 sm:px-6">
            <div className="flex space-x-3">
              {/* <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.imageUrl}
                  alt=""
                />
              </div> */}
              <div className="min-w-0 flex-1">
                <form action="#">
                  <div>
                    <label htmlFor="comment" className="sr-only">
                      About
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={3}
                      className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Add a note"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        createNewNote();
                      }}
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
