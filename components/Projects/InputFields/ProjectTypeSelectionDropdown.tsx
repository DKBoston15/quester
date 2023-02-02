import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';

const projectTypes = [
  { id: 1, name: 'None' },
  { id: 2, name: 'Systematic Literature Review' },
  { id: 3, name: 'Narrative Literature Review' },
  { id: 4, name: 'Primary Research Article' },
  { id: 5, name: 'Secondary Research Article' },
  { id: 6, name: 'Meta Research Article' },
  { id: 7, name: 'Journal Op Ed' },
  { id: 8, name: 'Periodical Op Ed (Newspaper/Magazine)' },
  { id: 9, name: 'Conference Paper' },
  { id: 10, name: 'Chapter Dissertation' },
  { id: 11, name: 'Article Dissertation' },
  { id: 12, name: 'Book Chapter' },
  { id: 13, name: 'Book' },
  { id: 14, name: 'Book Series' },
  { id: 15, name: 'National Grant' },
  { id: 16, name: 'State Grant' },
  { id: 17, name: 'Local Grant' },
  { id: 18, name: 'Institutional Grant' },
  { id: 19, name: 'Private Grant' },
  { id: 20, name: 'Corporation/Professional Grant' },
  { id: 21, name: 'Primary Analysis' },
  { id: 22, name: 'Secondary Analysis' },
  { id: 23, name: 'Meta Analysis' },
  { id: 24, name: 'Instrument Development' },
  { id: 25, name: 'Descriptive Table' },
  { id: 26, name: 'Associative Table' },
  { id: 27, name: 'Inferential Table' },
  { id: 28, name: 'Conceptual Model' },
  { id: 29, name: 'Theoretical Model' },
  { id: 30, name: 'Empirical Model' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectTypeSelectionDropdown({
  selectedType,
  setSelectedType
}: any) {
  const [query, setQuery] = useState('');

  const filteredProjectTypes =
    query === ''
      ? projectTypes
      : projectTypes.filter((projectType) => {
          return projectType.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedType}
      onChange={setSelectedType}
      className="w-full mt-4 text-black"
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Project Type
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(projectType) => projectType?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredProjectTypes.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredProjectTypes.map((projectType) => (
              <Combobox.Option
                key={projectType.id}
                value={projectType}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {projectType.name}
                    </span>

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
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
