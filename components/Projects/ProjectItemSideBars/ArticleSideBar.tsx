import React from 'react';

export default function ArticleSideBar({ selectedArticle }: any) {
  return (
    <div className="flex flex-col">
      {selectedArticle.title}
      <div>Read?</div>
      <div>Type</div>
      <div>Paradigm</div>
      <div>Link</div>
      <div>Citation</div>
      <button>Share</button>
      <button>View</button>
    </div>
  );
}
