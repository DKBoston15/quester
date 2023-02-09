import { findItemByName } from '@/utils/helpers';
import {
  analyticDesigns,
  articleTypes,
  paradigmTypes,
  researchDesigns,
  sampleDesigns,
  sampleTechniques
} from 'constants/dropdownLists';
import useGetArticleByIdQuery from 'hooks/articles/useArticleById';
import { useDeleteArticle } from 'hooks/articles/useDeleteArticle';
import { useUpdateArticle } from 'hooks/articles/useUpdateArticle';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import TextInputField from '../InputFields/TextInputField';

export default function ArticleContentCard({
  article,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledArticle,
    isLoading,
    isError
  } = useGetArticleByIdQuery({ id: article.id });
  const router = useRouter();
  const deleteArticle = useDeleteArticle();
  const updateArticle = useUpdateArticle();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [researchParadigm, setResearchParadigm] = useState('');
  const [articleType, setArticleType] = useState('');
  const [researchDesign, setResearchDesign] = useState('');
  const [sampleDesign, setSampleDesign] = useState('');
  const [sampleTechnique, setSampleTechnique] = useState('');
  const [analyticDesign, setAnalyticDesign] = useState('');
  const [startPage, setStartPage] = useState();
  const [endPage, setEndPage] = useState();
  const [read, setRead] = useState(false);

  useEffect(() => {
    if (pulledArticle) {
      if (pulledArticle.length > 0) {
        setTitle(pulledArticle[0].title);
        setLink(pulledArticle[0].link);
        const item1 = findItemByName(
          paradigmTypes,
          pulledArticle[0].research_paradigm
        );
        setResearchParadigm(item1 ? item1 : { id: 0, name: '' });
        const item2 = findItemByName(
          articleTypes,
          pulledArticle[0].literature_type
        );
        setArticleType(item2 ? item2 : { id: 0, name: '' });
        const item3 = findItemByName(
          researchDesigns,
          pulledArticle[0].research_design
        );
        setResearchDesign(item3 ? item3 : { id: 0, name: '' });
        const item4 = findItemByName(
          sampleDesigns,
          pulledArticle[0].sampling_design
        );
        setSampleDesign(item4 ? item4 : { id: 0, name: '' });
        const item5 = findItemByName(
          sampleTechniques,
          pulledArticle[0].sampling_technique
        );
        setSampleTechnique(item5 ? item5 : { id: 0, name: '' });
        const item6 = findItemByName(
          analyticDesigns,
          pulledArticle[0].analytic_design
        );
        setAnalyticDesign(item6 ? item6 : { id: 0, name: '' });
        setRead(pulledArticle[0].read);
        setStartPage(pulledArticle[0].start_page);
        setEndPage(pulledArticle[0].end_page);
      }
    }
  }, [article, pulledArticle]);

  const updateExistingArticle = async (newRead: boolean) => {
    await updateArticle.mutateAsync({
      id: article.id,
      title,
      researchParadigm:
        typeof researchParadigm === 'object' &&
        researchParadigm.hasOwnProperty('name')
          ? researchParadigm.name
          : researchParadigm,
      samplingDesign:
        typeof sampleDesign === 'object' && sampleDesign.hasOwnProperty('name')
          ? sampleDesign.name
          : sampleDesign,
      samplingTechnique:
        typeof sampleTechnique === 'object' &&
        sampleTechnique.hasOwnProperty('name')
          ? sampleTechnique.name
          : sampleTechnique,
      analyticDesign:
        typeof analyticDesign === 'object' &&
        analyticDesign.hasOwnProperty('name')
          ? analyticDesign.name
          : analyticDesign,
      researchDesign:
        typeof researchDesign === 'object' &&
        researchDesign.hasOwnProperty('name')
          ? researchDesign.name
          : researchDesign,
      authors: null,
      year: null,
      journal: null,
      volume: null,
      issue: null,
      startPage,
      endPage,
      link,
      read: newRead,
      literatureType:
        typeof articleType === 'object' && articleType.hasOwnProperty('name')
          ? articleType.name
          : articleType
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    await deleteArticle.mutateAsync({
      id: article.id
    });
    router.push(`/app/projects/${article.project_item_id}/articles`);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={article.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {articleType.name}
              </p>
              <div className="relative flex items-start mt-2">
                <div className="flex h-5 items-center">
                  <input
                    id="comments"
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={read || false}
                    onChange={() => {
                      setRead(!read);
                      updateExistingArticle(!read);
                    }}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-700"
                  >
                    Read?
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setCurrentlyUpdating(true)}
              >
                Update
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => window.location.assign(link)}
              >
                Link
              </button>
            </div>
          </div>
        )}
        {currentlyUpdating && (
          <div className="flex justify-between">
            <div className="flex flex-col space-y-4">
              <TextInputField
                title="Title"
                value={title}
                setValue={setTitle}
                width="w-[23rem]"
              />
              <InputTypeSelectionDropdown
                selectedType={articleType}
                setSelectedType={setArticleType}
                list={articleTypes}
                title="Literature Type"
                width="w-[23rem]"
              />
            </div>
            <div className="flex flex-col space-y-12 w-96">
              <div className="flex space-x-4 justify-end">
                <button
                  type="button"
                  className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={() => setCurrentlyUpdating(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={() => updateExistingArticle(read)}
                >
                  Save
                </button>
              </div>

              <div className="flex justify-end w-full">
                <TextInputField
                  width="w-96"
                  title="Link"
                  value={link}
                  setValue={setLink}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Research Paradigm
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">
                {researchParadigm.name}
              </dd>
            )}
            {currentlyUpdating && (
              <InputTypeSelectionDropdown
                selectedType={researchParadigm}
                setSelectedType={setResearchParadigm}
                list={paradigmTypes}
                widthLimit={true}
              />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Research Sample
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">
                {researchDesign.name}
              </dd>
            )}
            {currentlyUpdating && (
              <InputTypeSelectionDropdown
                selectedType={researchDesign}
                setSelectedType={setResearchDesign}
                list={researchDesigns}
                widthLimit={true}
              />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Sampling Design
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">
                {sampleDesign.name}
              </dd>
            )}
            {currentlyUpdating && (
              <InputTypeSelectionDropdown
                selectedType={sampleDesign}
                setSelectedType={setSampleDesign}
                list={sampleDesigns}
                widthLimit={true}
              />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Sampling Technique
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">
                {sampleTechnique.name}
              </dd>
            )}
            {currentlyUpdating && (
              <InputTypeSelectionDropdown
                selectedType={sampleTechnique}
                setSelectedType={setSampleTechnique}
                list={sampleTechniques}
                widthLimit={true}
              />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Analytic Design
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">
                {analyticDesign.name}
              </dd>
            )}
            {currentlyUpdating && (
              <InputTypeSelectionDropdown
                selectedType={analyticDesign}
                setSelectedType={setAnalyticDesign}
                list={analyticDesigns}
                widthLimit={true}
              />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500"></dt>
            <dd className="mt-1 text-sm text-gray-900"></dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Start Page</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{startPage}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={startPage} setValue={setStartPage} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">End Page</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{endPage}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={endPage} setValue={setEndPage} />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
