import Layout from '@/components/Layout/Layout';
import CourseTitle from '@/components/Layout/PageTitle/CourseTitle';
import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import quizzes, { toSnakeCase } from 'constants/quizzes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import useGetScores from 'hooks/scores/useScores';

const memoryOptions = [
  { name: 'Sections', active: true }
  // { name: 'Custom', active: true }
];

function extractQuestions(quizzes: any) {
  const listedQuizzes = quizzes[0].quizzes;
  let questions = [];
  for (let quiz of listedQuizzes) {
    for (let question of quiz.questions) {
      questions.push({ id: question.id, question: question.question });
    }
  }
  return questions;
}

export default function Course() {
  const router = useRouter();
  const { courseId } = router.query;
  const [selection, setSelection] = useState(memoryOptions[0]);
  const [currentlyCreating, setCurrentlyCreating] = useState(false);
  const [questions, setQuestions] = useState(extractQuestions(quizzes));
  const [updatedQuizzes, setUpdatedQuizzes] = useState();

  const { data: scores, isLoading, isError } = useGetScores();

  useEffect(() => {
    const newQuizzes = quizzes;
    if (scores) {
      scores.forEach((score) => {
        const selectedQuiz = newQuizzes[0].quizzes.findIndex(
          (quiz) => quiz.id == score.score_id
        );
        newQuizzes[0].quizzes[selectedQuiz].score = score.score;
      });
      setUpdatedQuizzes(newQuizzes);
    }
  }, [quizzes, scores]);

  return (
    <Layout>
      <CourseTitle courseTitle="APA Style (7th ed.)" />
      {selection.name === 'Sections' && (
        <>
          <RadioGroup value={selection} onChange={setSelection} className="">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 p-4">
              {memoryOptions.map((option) => (
                <RadioGroup.Option
                  key={option.name}
                  value={option}
                  className={({ active, checked }) =>
                    classNames(
                      option.active
                        ? 'cursor-pointer focus:outline-none'
                        : 'opacity-25 cursor-not-allowed',
                      active ? 'ring-2 ring-offset-2 ring-blue-500' : '',
                      checked
                        ? 'bg-blue-600 border-transparent text-white hover:bg-blue-700'
                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                      'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium sm:flex-1'
                    )
                  }
                  disabled={!option.active}
                >
                  <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          {updatedQuizzes && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
              {updatedQuizzes[0].quizzes.map((quiz) => (
                <div
                  key={quiz.title}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                  <div className="min-w-0 flex-1">
                    <a
                      href={`${courseId}/${toSnakeCase(quiz.title)}`}
                      className="focus:outline-none"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {quiz.title}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {quiz.score}/{quiz.questions.length}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {selection.name === 'Custom' && (
        <div className="flex flex-1 items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <RadioGroup value={selection} onChange={setSelection} className="">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 p-4">
                {memoryOptions.map((option) => (
                  <RadioGroup.Option
                    key={option.name}
                    value={option}
                    className={({ active, checked }) =>
                      classNames(
                        option.active
                          ? 'cursor-pointer focus:outline-none'
                          : 'opacity-25 cursor-not-allowed',
                        active ? 'ring-2 ring-offset-2 ring-blue-500' : '',
                        checked
                          ? 'bg-blue-600 border-transparent text-white hover:bg-blue-700'
                          : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                        'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium sm:flex-1'
                      )
                    }
                    disabled={!option.active}
                  >
                    <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <div className="p-4">
              <button
                type="button"
                className="flex flex-col items-center block w-96 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setCurrentlyCreating(true)}
              >
                <QuestionMarkCircleIcon color="gray" width={72} />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Create a new section
                </span>
              </button>
            </div>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <aside className="hidden w-96 overflow-y-scroll border-l border-gray-200 bg-gray-100 lg:block max-h-screen flex flex-col space-y-4 px-2 pt-4">
            {questions.map((question) => (
              <div
                className="text-black p-1 border border-1 border-gray-300 rounded-xl"
                key={question.id}
              >
                {question.question}
              </div>
            ))}
          </aside>
        </div>
      )}
    </Layout>
  );
}
