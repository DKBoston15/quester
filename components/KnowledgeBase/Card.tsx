import React from 'react';

export default function Card({ item }: any) {
  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 pb-5 shadow-sm hover:border-gray-400">
      <div className="min-w-0 flex-1">
        <h4 className="text-gray-900 mb-4">
          <>
            {item.paradigm.link.length > 0 && (
              <a href={`${item.paradigm.link}`} target="_blank">
                {item.paradigm.name}
              </a>
            )}
          </>
          <>{item.paradigm.link.length === 0 && <p>{item.paradigm.name}</p>}</>
        </h4>
        <p className="truncate text-sm text-gray-500">
          <span className="font-semibold">Ontology:</span> {item.ontology}
        </p>
        <p className="truncate text-sm text-gray-500">
          <span className="font-semibold">Epistemology: </span>
          {item.epistemology}
        </p>
        <p className="truncate text-sm text-gray-500">
          <span className="font-semibold">Methodology: </span>
          {item.methodology}
        </p>
        <p className="truncate text-sm text-gray-500">
          <span className="font-semibold">Product: </span> {item.product}
        </p>
      </div>
    </div>
  );
}
