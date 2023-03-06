import Quiz from '@/components/Courses/Quiz';
import Layout from '@/components/Layout/Layout';
import CourseTitle from '@/components/Layout/PageTitle/CourseTitle';

import quizzes, { findQuizByTitle } from 'constants/quizzes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Course() {
  const router = useRouter();
  const { quizId } = router.query;
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    if (quizId) {
      const retrievedQuiz = findQuizByTitle(quizzes, quizId);
      setQuiz(retrievedQuiz);
    }
  }, [quizId]);

  return (
    <Layout>
      {quiz && (
        <div>
          <CourseTitle courseTitle={quiz.title} />
          <div className="w-full h-[30rem]">
            <Quiz quiz={quiz} />
          </div>
        </div>
      )}
    </Layout>
  );
}
