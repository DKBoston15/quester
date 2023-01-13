import Layout from '@/components/Layout/Layout';
import React from 'react';
import Table from '@/components/Tasks/Table';
import TaskPageTitle from '@/components/Layout/PageTitle/TaskPageTitle';

export default function tasks() {
  return (
    <Layout>
      <TaskPageTitle />
      <Table />
    </Layout>
  );
}
