import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useCreateScore } from 'hooks/scores/useCreateScore';
import useGetScores from 'hooks/scores/useScores';
import { useUpdateScore } from 'hooks/scores/useUpdateScore';

function countCorrectAnswers(answerHistory: any) {
  return answerHistory.reduce((count, answer) => {
    return answer.answer === answer.correctAnswer ? count + 1 : count;
  }, 0);
}

export default function Quiz({ quiz }) {
  const router = useRouter();
  const { quizId } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);

  const { data: scores, isLoading, isError } = useGetScores();
  const createScore = useCreateScore();
  const updateScore = useUpdateScore();

  useEffect(() => {
    if (quizId) {
      setCurrentQuestion(0);
      setUserAnswers({});
      setShowResults(false);
      setAnswerHistory([]);
    }
  }, [quizId]);

  const handleNextQuestion = async () => {
    if (currentQuestion === quiz.questions.length - 1) {
      const selectedScore = scores.findIndex(
        (score) => score.score_id == quiz.id
      );
      const correctAnswers = countCorrectAnswers(answerHistory);
      if (selectedScore != -1) {
        await updateScore.mutateAsync({
          id: scores[selectedScore].id,
          score: correctAnswers,
          totalPossibleScore: scores[selectedScore].total_possible_score,
          completedAt: new Date(),
          scoreId: scores[selectedScore].score_id
        });
      } else {
        await createScore.mutateAsync({
          score: correctAnswers,
          totalPossibleScore: quiz.questions.length,
          completedAt: new Date(),
          scoreId: quiz.id
        });
      }
      setShowResults(true);
    } else {
      setCurrentQuestion((prevState) => prevState + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const renderQuestion = (question) => {
    const { id, question: questionText, options } = question;
    const questionAnswer = userAnswers[id];

    const handleAnswerChange = (id, optionText) => {
      setUserAnswers({ ...userAnswers, [id]: optionText });

      const currentQuestion = quiz.questions.find((q) => q.id === id);
      const correctAnswer = currentQuestion.answer;
      setAnswerHistory((prevState) => [
        ...prevState,
        {
          answer: optionText,
          correctAnswer: correctAnswer,
          question: currentQuestion.question
        }
      ]);
    };

    return (
      <div key={id} className="flex flex-col">
        <div className="mb-3 font-medium text-black">{questionText}</div>
        <div className="grid gap-3 grid-cols-1">
          {Object.entries(options).map(([optionKey, optionText]) => (
            <div key={optionKey} className="flex items-center">
              <input
                type={
                  options[id] === 'True' || options[id] === 'False'
                    ? 'radio'
                    : 'checkbox'
                }
                id={`${id}-${optionKey}`}
                name={id}
                value={optionText}
                checked={questionAnswer === optionText}
                onChange={() => handleAnswerChange(id, optionText)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                disabled={showResults}
              />
              <label
                dangerouslySetInnerHTML={{ __html: optionText }}
                htmlFor={`${id}-${optionKey}`}
                className="ml-2 text-sm text-black"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl pl-12 mt-4 pb-12">
      {quiz.questions.length > 0 ? (
        <div className="space-y-2">
          {showResults ? (
            <div className="flex flex-col items-center space-y-4 text-black">
              <h2 className="text-2xl font-medium">Quiz Results</h2>
              <div>
                You got {countCorrectAnswers(answerHistory)} out of{' '}
                {quiz.questions.length} questions correct!
              </div>
              {console.log(answerHistory)}
              {answerHistory.length > 0 && (
                <div>
                  {answerHistory.map((answer, index) => (
                    <div key={index} className="flex flex-col space-y-4">
                      <span className="mt-4">
                        <strong>Question: </strong>
                        {answer.question}
                      </span>
                      {answer.correctAnswer === answer.answer && (
                        <div className="flex space-x-2">
                          <CheckCircleIcon color="green" width={24} />{' '}
                          <div> {answer.answer}</div>
                        </div>
                      )}
                      {answer.correctAnswer !== answer.answer && (
                        <div className="flex flex-col space-y-1">
                          <div className="flex space-x-2">
                            <XCircleIcon color="red" width={24} />{' '}
                            <div>{answer.answer}</div>
                          </div>
                          <div className="flex space-x-2">
                            <CheckCircleIcon color="green" width={24} />
                            <div>{answer.correctAnswer}</div>
                          </div>
                        </div>
                      )}
                      <hr className="bg-gray-200 mb-2" />
                    </div>
                  ))}
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={handleRestartQuiz}
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Restart Quiz
                </button>
                <button
                  onClick={() => router.push('/app/courses')}
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Quit
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {renderQuestion(quiz.questions[currentQuestion])}
              <button
                onClick={() => {
                  handleNextQuestion();
                }}
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!userAnswers[quiz.questions[currentQuestion].id]}
              >
                {currentQuestion === quiz.questions.length - 1
                  ? 'Finish Quiz'
                  : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>No questions found for this quiz.</div>
      )}
    </div>
  );
}
