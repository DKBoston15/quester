import Layout from '@/components/Layout/Layout';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useEffect, useMemo, useState } from 'react';
import HomePageTitle from '@/components/Layout/PageTitle/HomePageTitle';
import _ from 'lodash';
import CreateProjectModal from '@/components/Projects/CreateModals/CreateProjectModal';
import DeleteProjectModal from '@/components/Projects/DeleteModals/DeleteProjectModal';
import useGetProjectsQuery from 'hooks/projects/useProjects';
import { useCreateProject } from 'hooks/projects/useCreateProject';
import { useUpdateProject } from 'hooks/projects/useUpdateProject';
import { useDeleteProject } from 'hooks/projects/useDeleteProject';
import { projectColors } from '@/utils/constants';
import { Project, ProjectSelectedType } from '@/utils/types';
import { getProjectById } from '@/utils/helpers';
import PinnedProjects from '@/components/Projects/ProjectPageComponents/PinnedProjects';
import ProjectList from '@/components/Projects/ProjectPageComponents/ProjectList';
import ProjectTable from '@/components/Projects/ProjectPageComponents/ProjectTable';

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

export default function Home() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([]);
  const [selectedType, setSelectedType] = useState<ProjectSelectedType | null>(
    null
  );
  const [projectName, setProjectName] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (projects) {
      setPinnedProjects(
        projects.filter((project: { pinned: any }) => project.pinned)
      );
    }
  }, [projects]);

  const sortedProjects = useMemo(() => {
    if (projects) {
      return [...projects].sort((a, b) => a.title.localeCompare(b.title));
    }
    return null;
  }, [projects]);

  useEffect(() => {
    if (sortedProjects) {
      setPinnedProjects(
        sortedProjects.filter((project: { pinned: any }) => project.pinned)
      );
    }
  }, [sortedProjects]);

  const togglePin = async (id: any) => {
    if (projects) {
      const project = getProjectById(id, projects);

      if (typeof project === 'string' || !updateProject) {
        return;
      }

      await updateProject.mutateAsync({
        id,
        title: project.title,
        type: project.type,
        pinned: !project.pinned
      });
    }
  };

  const deleteCurrentProject = async (id: any) => {
    setDeleteModalOpen(false);
    if (!deleteProject) return;
    await deleteProject.mutateAsync({
      id
    });
  };

  const createNewProject = async () => {
    if (!createProject || !selectedType) return;

    await createProject.mutateAsync({
      title: projectName,
      type: selectedType.name,
      bgColorClass: _.sample(projectColors),
      pinned: false
    });

    setOpen(false);
    setSelectedType(null);
    setProjectName('');
  };

  return (
    <Layout>
      <CreateProjectModal
        open={open}
        setOpen={setOpen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        createNewProject={createNewProject}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      <DeleteProjectModal
        deleteCurrentProject={deleteCurrentProject}
        selectedProjectId={selectedProjectId}
        setDeleteModalOpen={setDeleteModalOpen}
        deleteModalOpen={deleteModalOpen}
      />
      <HomePageTitle setOpen={setOpen} />
      {!isLoading && (
        <>
          <PinnedProjects
            pinnedProjects={pinnedProjects}
            togglePin={togglePin}
          />
          {sortedProjects && <ProjectList projects={sortedProjects} />}
          <ProjectTable
            projects={sortedProjects}
            togglePin={togglePin}
            setSelectedProjectId={setSelectedProjectId}
            setDeleteModalOpen={setDeleteModalOpen}
          />
        </>
      )}
    </Layout>
  );
}
