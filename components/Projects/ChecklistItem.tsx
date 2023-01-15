import { useState } from 'react';

export default function ChecklistItem({ checklistItem, updateChecklist }: any) {
  const [checked, setChecked] = useState(checklistItem.val);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <fieldset
      className={classNames(
        checklistItem.nestedLevels === 1 && 'ml-4',
        checklistItem.nestedLevels === 2 && 'ml-8',
        checklistItem.nestedLevels === 3 && 'ml-12',
        checklistItem.nestedLevels === 4 && 'ml-16',
        checklistItem.nestedLevels === 5 && 'ml-20'
      )}
    >
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            aria-describedby="checklist-item-description"
            name="checklistItem"
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              updateChecklist(checklistItem.id, e.target.checked);
            }}
            className="h-6 w-6 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <span className="text-gray-500">
            <div className="text-black">{checklistItem.text}</div>
          </span>
        </div>
      </div>
    </fieldset>
  );
}
