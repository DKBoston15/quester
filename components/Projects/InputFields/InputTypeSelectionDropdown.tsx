import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import Tooltip from '@/components/Tooltip';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function InputTypeSelectionDropdown({
  selectedType,
  setSelectedType,
  list,
  title,
  widthLimit,
  width
}: any) {
  const [query, setQuery] = useState('');

  const filteredList =
    query === ''
      ? list
      : list.filter((list: any) => {
          return list.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedType}
      onChange={setSelectedType}
      className={`mt-4 text-black ${widthLimit ? 'w-10/12' : 'w-full'} ${
        width ? width : 'w-full'
      }`}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {title}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          //@ts-ignore
          displayValue={(list) => list?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredList.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredList.map((list: any) => (
              <Combobox.Option
                key={list.id}
                value={list}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <div className="flex justify-between group relative">
                    <Tooltip name="hello" />
                    <span
                      className={classNames(
                        'block truncate w-64',
                        selected && 'font-semibold'
                      )}
                    >
                      {list.name}
                    </span>
                    {list.source_table && (
                      <span
                        className={classNames(
                          'block capitalize bg-gray-300 rounded-xl p-2',
                          selected && 'font-semibold',
                          active ? 'bg-indigo-600 text-black' : 'text-gray-900'
                        )}
                      >
                        {list.source_table}
                      </span>
                    )}

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
