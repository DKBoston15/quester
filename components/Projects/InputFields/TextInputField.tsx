import React from 'react';

export default function TextInputField({ value, setValue, title, width }: any) {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1">
        <input
          name={title}
          id={title}
          className={`block ${
            width ? width : 'w-10/12'
          } dark:bg-gray-700 dark:text-white dark:border-none rounded-md border-gray-300 border-1 border h-10 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2`}
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
