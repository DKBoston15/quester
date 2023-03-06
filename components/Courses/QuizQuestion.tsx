import React, { useState } from 'react';

function QuizQuestion({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  function handleAnswerClick(answer) {
    setSelectedAnswer(answer);
    onAnswer(answer);
  }

  return (
    <div className="space-y-2">
      <div className="font-medium">{question.text}</div>
      <div className="space-y-2">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={`w-full py-2 text-left rounded-md ${
              selectedAnswer === answer.text
                ? 'bg-gray-200'
                : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => handleAnswerClick(answer.text)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion;
