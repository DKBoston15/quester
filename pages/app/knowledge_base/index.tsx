import MainNavStack from '@/components/KnowledgeBase/MainNavStack';
import Layout from '@/components/Layout/Layout';
import React from 'react';
import {
  BeakerIcon,
  ChartBarSquareIcon,
  BriefcaseIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import ResourceCard from '@/components/KnowledgeBase/ResourceCard';
import KnowledgeBaseTitle from '@/components/Layout/PageTitle/KnowledgeBaseTitle';

const researchItems = [
  {
    id: 1,
    title: 'Research',
    description:
      'An umbrella term across the sciences and the humanities, research describes the systematic acts, on the part of researchers, taken to study overarching problems.',
    href: '/app/knowledge_base/research',
    icon: BeakerIcon
  },
  {
    id: 2,
    title: 'Paradigms',
    description:
      'Paradigms provide foundational sets of beliefs and understandings about reality.',
    href: '/app/knowledge_base/paradigms'
  },
  {
    id: 3,
    title: 'Designs',
    description:
      'Research designs provide foundational sets of beliefs and understandings about processes in research.',
    href: '/app/knowledge_base/designs'
  },
  {
    id: 4,
    title: 'Questions',
    description:
      'Research questions provide foundational sets of beliefs and understandings about the role of observations in research.',
    href: '/app/knowledge_base/questions'
  }
];

const analysisItems = [
  {
    id: 1,
    title: 'Analysis',
    description:
      'A word describing the study of complex information derived from research.',
    href: '/app/knowledge_base/analysis',
    icon: ChartBarSquareIcon
  },
  {
    id: 2,
    title: 'Models',
    description:
      'Models provide foundational sets of beliefs and understandings about ideas used to guide analyses.',
    href: '/app/knowledge_base/models'
  },
  {
    id: 3,
    title: 'Samples',
    description:
      'Samples provide foundational sets of beliefs for sample statistics in relation to population parameters.',
    href: '/app/knowledge_base/samples'
  },
  {
    id: 4,
    title: 'Techniques',
    description:
      'Techniques provide foundational sets of beliefs and understandings about methods used to conduct analyses.',
    href: '/app/knowledge_base/techniques'
  }
];

const professionalismItems = [
  {
    id: 1,
    title: 'Professionalism',
    description:
      'The conduct or qualities of researchers resulting from the development of academic preparation.',
    href: '/app/knowledge_base/professionalism',
    icon: BriefcaseIcon
  },
  {
    id: 2,
    title: 'Tables',
    description:
      'Tables provide foundational sets of beliefs and understandings about data.',
    href: '/app/knowledge_base/tables'
  },
  {
    id: 3,
    title: 'Figures',
    description:
      'Figures provide foundational sets of beliefs and understandings about the use of images in areas of professionalism.',
    href: '/app/knowledge_base/figures'
  },
  {
    id: 4,
    title: 'Labs',
    description:
      'Labs provide foundational sets of beliefs and understandings about the manner in which inquiry drives professionalism.',
    href: '/app/knowledge_base/labs'
  }
];

const writingItems = [
  {
    id: 1,
    title: 'Writing',
    description:
      'An expression used to describe the clear, concise, and structured use of written language backed up with the interpretation of evidence acquired through research.',
    href: '/app/knowledge_base/writing',
    icon: PencilIcon
  },
  {
    id: 2,
    title: 'Researchers',
    description:
      'People provide foundational sets of beliefs and understandings about the role of authors in writing.',
    href: '/app/knowledge_base/researchers'
  },
  {
    id: 3,
    title: 'Key Terms',
    description:
      'Key terms provide foundational sets of beliefs and understandings about concepts.',
    href: '/app/knowledge_base/key_terms'
  },
  {
    id: 4,
    title: 'Articles',
    description:
      'Articles provide foundational sets of beliefs and understandings about community.',
    href: '/app/knowledge_base/articles'
  }
];

const resources = [
  { id: 1, name: 'Google Scholar', href: 'https://scholar.google.com/' },
  {
    id: 1,
    name: 'Google Scholar Label Search',
    href: 'https://scholar.google.co.uk/citations?view_op=search_authors&hl=en&mauthors=label:'
  },
  { id: 1, name: 'LinkedIn', href: 'https://www.linkedin.com/' }
];

export default function index() {
  return (
    <Layout>
      <KnowledgeBaseTitle />
      <div className="flex flex-col-reverse 2xl:flex-row pr-8 mr-4 pl-4">
        <div className="flex xl:flex-row flex-col">
          <MainNavStack items={researchItems} />;
          <MainNavStack items={analysisItems} />;
          <MainNavStack items={professionalismItems} />;
          <MainNavStack items={writingItems} />;
        </div>
        <ResourceCard resources={resources} />
      </div>
    </Layout>
  );
}
