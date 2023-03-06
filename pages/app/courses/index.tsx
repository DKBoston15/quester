import CourseGrid from '@/components/Courses/CourseGrid';
import Layout from '@/components/Layout/Layout';
import CoursePageTitle from '@/components/Layout/PageTitle/CoursePageTitle';
import React from 'react';

export default function courses() {
  return (
    <Layout>
      <CoursePageTitle />
      <CourseGrid />
    </Layout>
  );
}
