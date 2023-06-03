import { useDeleteQuestion } from 'hooks/questions/useDeleteQuestion';
import useGetQuestionByIdQuery from 'hooks/questions/useQuestionById';
import { useUpdateQuestion } from 'hooks/questions/useUpdateQuestion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import TextInputField from '../InputFields/TextInputField';

export default function QuestionContentCard({
  question,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledQuestion,
    isLoading,
    isError
  } = useGetQuestionByIdQuery({ id: question.id });
  const router = useRouter();
  const deleteQuestion = useDeleteQuestion();
  const updateQuestion = useUpdateQuestion();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');

  useEffect(() => {
    if (pulledQuestion) {
      if (pulledQuestion.length > 0) {
        setTitle(pulledQuestion[0].title);
        setLink(pulledQuestion[0].link);
        setQuestionOne(pulledQuestion[0].question_1);
        setQuestionTwo(pulledQuestion[0].question_2);
        setQuestionThree(pulledQuestion[0].question_3);
        setQuestionFour(pulledQuestion[0].question_4);
        setQuestionFive(pulledQuestion[0].question_5);
        setQuestionSix(pulledQuestion[0].question_6);
        setQuestionSeven(pulledQuestion[0].question_7);
      }
    }
  }, [question, pulledQuestion]);

  const updateExistingQuestion = async () => {
    if (!updateQuestion) return;
    await updateQuestion.mutateAsync({
      id: question.id,
      title,
      link,
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      questionFive,
      questionSix,
      questionSeven
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    if (!deleteQuestion) return;
    await deleteQuestion.mutateAsync({
      id: question.id
    });
    router.push(`/app/projects/${question.project_item_id}`);
  };

  return (
    <div className="overflow-visible bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={question.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
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
                  onClick={() => updateExistingQuestion()}
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
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Question One</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{questionOne}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={questionOne} setValue={setQuestionOne} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Question Two</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{questionTwo}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={questionTwo} setValue={setQuestionTwo} />
            )}
          </div>
        </dl>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Question Three
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{questionThree}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField
                value={questionThree}
                setValue={setQuestionThree}
              />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Question Four</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{questionFour}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={questionFour} setValue={setQuestionFour} />
            )}
          </div>
        </dl>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Question Five</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{questionFive}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={questionFive} setValue={setQuestionFive} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Question Six</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{questionSix}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={questionSix} setValue={setQuestionSix} />
            )}
          </div>
        </dl>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Question Seven
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{questionSeven}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField
                value={questionSeven}
                setValue={setQuestionSeven}
              />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
