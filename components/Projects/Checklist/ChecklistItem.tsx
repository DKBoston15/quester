import { useState } from 'react';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  MinusCircleIcon
} from '@heroicons/react/24/outline';

export default function ChecklistItem({
  checklistItem,
  updateChecklist,
  updateChecklistValue,
  removeChecklistItem
}: any) {
  const [checked, setChecked] = useState(checklistItem.val);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  const handleLeftArrowClick = () => {
    const updatedNestedLevels = Math.max(0, checklistItem.nestedLevels - 1);
    updateChecklist(checklistItem.id, { nestedLevels: updatedNestedLevels });
  };

  const handleRightArrowClick = () => {
    const updatedNestedLevels = checklistItem.nestedLevels + 1;
    console.log(updatedNestedLevels);
    updateChecklist(checklistItem.id, { nestedLevels: updatedNestedLevels });
  };

  return (
    <fieldset
      className={classNames(
        checklistItem.nestedLevels === 0 && 'ml-0',
        checklistItem.nestedLevels === 1 && 'ml-4',
        checklistItem.nestedLevels === 2 && 'ml-8',
        checklistItem.nestedLevels === 3 && 'ml-12',
        checklistItem.nestedLevels === 4 && 'ml-16',
        checklistItem.nestedLevels === 5 && 'ml-20'
      )}
    >
      <div className="relative flex items-start my-2 cursor-move">
        <div className="flex h-5 items-center">
          <input
            aria-describedby="checklist-item-description"
            name="checklistItem"
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              updateChecklistValue(checklistItem.id, e.target.checked);
            }}
            className="h-6 w-6 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <span className="text-gray-500 flex space-x-1">
            <div className="text-black dark:text-white">
              {checklistItem.text}
            </div>
            <div className="flex items-center cursor-pointer">
              {checklistItem.nestedLevels != 0 && (
                <ArrowLeftCircleIcon
                  width={24}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeftArrowClick();
                  }}
                />
              )}
              <ArrowRightCircleIcon
                width={24}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRightArrowClick();
                }}
              />
              <MinusCircleIcon
                width={24}
                className="text-red-700"
                onClick={() => removeChecklistItem(checklistItem.id)}
              />
            </div>
          </span>
        </div>
      </div>
    </fieldset>
  );
}
