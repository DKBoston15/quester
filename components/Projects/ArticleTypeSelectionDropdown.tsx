import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';

const articleTypes = [
  { id: 1, name: 'None' },
  { id: 2, name: 'Journal Article' },
  { id: 3, name: 'Primary Research' },
  { id: 4, name: 'Secondary Research' },
  { id: 5, name: 'Meta-analysis' },
  { id: 6, name: 'Other Primary Research' },
  { id: 7, name: 'Literature Review' },
  { id: 8, name: 'Systematic Review' },
  { id: 9, name: 'Other Literature Review' },
  { id: 10, name: 'Book' },
  { id: 11, name: 'Monograph' },
  { id: 12, name: 'Edited Collection' },
  { id: 13, name: 'Manual' },
  { id: 14, name: 'Other Book' },
  { id: 15, name: 'Book Chapter' },
  { id: 16, name: 'Chapter in an edited collection' },
  { id: 17, name: 'Chapter in a manual' },
  { id: 18, name: 'Other Book Chapter' },
  { id: 19, name: 'Gray Literature' },
  { id: 20, name: 'Government Report' },
  { id: 21, name: 'Government Report Brochure' },
  { id: 22, name: 'Government Report Fact Sheet' },
  { id: 23, name: 'Government Report White Paper' },
  { id: 24, name: 'Government Report Other' },
  { id: 25, name: 'Private Report' },
  { id: 26, name: 'Private Report Brochure' },
  { id: 27, name: 'Private Report Fact Sheet' },
  { id: 28, name: 'Private Report White Paper' },
  { id: 29, name: 'Private Report Other' },
  { id: 30, name: 'Other' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ArticleTypeSelectionDropdown({
  selectedType,
  setSelectedType
}: any) {
  const [query, setQuery] = useState('');

  const filteredArticleTypes =
    query === ''
      ? articleTypes
      : articleTypes.filter((articleType) => {
          return articleType.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedType}
      onChange={setSelectedType}
      className="w-full mt-4 text-black"
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Article Type
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(articleType) => articleType?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredArticleTypes.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredArticleTypes.map((articleType) => (
              <Combobox.Option
                key={articleType.id}
                value={articleType}
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
                      {articleType.name}
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
