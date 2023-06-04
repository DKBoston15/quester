import React, { useRef, useState } from 'react';
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

import { useDeleteNote } from 'hooks/notes/useDeleteNote';
import { useUpdateNote } from 'hooks/notes/useUpdateNote';
import useAutosizeTextarea from 'hooks/useAutosizeTextarea';
import { useUser } from '@/utils/useUser';
import { formatDistance } from 'date-fns';

export default function Note({ note }: any) {
  const [editedBody, setEditedBody] = useState('');
  const [editingNote, setEditingNote] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextarea(textAreaRef.current, editedBody);
  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote();
  const { user } = useUser();

  const updateExistingNote = async (id: number) => {
    if (!updateNote) return;
    await updateNote.mutateAsync({
      id,
      body: editedBody
    });
    setEditingNote(false);
  };

  const deleteExistingNote = async (id: number) => {
    if (!deleteNote) return;
    await deleteNote.mutateAsync({
      id
    });
  };

  return (
    <li key={note.id} className="group">
      <div className="flex justify-between items-start">
        <div className="w-full">
          <div className="text-sm">
            <a href="#" className="font-medium text-gray-900">
              {user?.user_metadata.full_name}
            </a>
          </div>
          {!editingNote && (
            <div className="my-2 text-md text-gray-700">
              <p>{note.body}</p>
            </div>
          )}
          {editingNote && (
            <div className="my-2 text-md text-gray-700 w-full">
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="block w-full h-32 p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Add a note"
                value={editedBody}
                ref={textAreaRef}
                onChange={(e) => setEditedBody(e.target.value)}
              />
            </div>
          )}

          <div className="mt-2 space-x-2 text-xs">
            <span className="font-medium text-gray-400">
              {formatDistance(new Date(note.created_at), new Date())} ago
            </span>{' '}
          </div>
        </div>
        <div
          className={`flex space-x-4 opacity-0 ${
            editingNote ? 'opacity-100' : 'group-hover:opacity-100'
          }`}
        >
          {!editingNote && (
            <>
              <TrashIcon
                className="w-5 cursor-pointer"
                onClick={() => deleteExistingNote(note.id)}
              />

              <PencilIcon
                className="w-5 cursor-pointer"
                onClick={() => {
                  setEditedBody(note.body);
                  setEditingNote(true);
                }}
              />
            </>
          )}
          {editingNote && (
            <>
              <XMarkIcon
                className="w-5 cursor-pointer"
                onClick={() => {
                  setEditedBody('');
                  setEditingNote(false);
                }}
              />
              <CheckIcon
                className="w-5 cursor-pointer"
                onClick={() => {
                  updateExistingNote(note.id);
                }}
              />
            </>
          )}
        </div>
      </div>
    </li>
  );
}
