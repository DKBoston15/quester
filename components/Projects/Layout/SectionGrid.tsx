import { useRouter } from 'next/router';

const sections = [
  {
    id: 1,
    name: 'Articles',
    title:
      'Articles provide foundational sets of beliefs and understandings about community.',
    section: 'Writing',
    color: 'bg-blue-200',
    href: 'articles'
  },
  {
    id: 2,
    name: 'Designs',
    title:
      'Research designs provide foundational sets of beliefs and understandings about processes in research.',
    section: 'Research',
    color: 'bg-green-200',
    href: 'designs'
  },
  {
    id: 3,
    name: 'Figures',
    title:
      'Figures provide foundational sets of beliefs and understandings about the use of images in areas of professionalism.',
    section: 'Professionalism',
    color: 'bg-red-200',
    href: 'figures'
  },
  {
    id: 4,
    name: 'Journals',
    title:
      'Articles provide foundational sets of beliefs and understandings about community.',
    section: 'Writing',
    color: 'bg-blue-200',
    href: 'journals'
  },
  {
    id: 5,
    name: 'Key Terms',
    title:
      'Key terms provide foundational sets of beliefs and understandings about concepts.',
    section: 'Writing',
    color: 'bg-blue-200',
    href: 'key_terms'
  },
  {
    id: 6,
    name: 'Labs',
    title:
      'Labs provide foundational sets of beliefs and understandings about the manner in which inquiry drives professionalism.',
    section: 'Professionalism',
    color: 'bg-red-200',
    href: 'labs'
  },
  {
    id: 7,
    name: 'Models',
    title:
      'Models provide foundational sets of beliefs and understandings about ideas used to guide analyses.',
    section: 'Analysis',
    color: 'bg-yellow-200',
    href: 'models'
  },
  {
    id: 8,
    name: 'Paradigms',
    title:
      'Paradigms provide foundational sets of beliefs and understandings about reality. This allows researchers to generate, test, and extend theories and practices associated with research into reality.',
    section: 'Research',
    color: 'bg-green-200',
    href: 'paradigms'
  },
  {
    id: 9,
    name: 'Questions',
    title:
      'Research questions provide foundational sets of beliefs and understandings about the section of observations in research.',
    section: 'Research',
    color: 'bg-green-200',
    href: 'questions'
  },
  {
    id: 10,
    name: 'Researchers',
    title:
      'Researchers provide foundational sets of beliefs and understandings about the section of authors in writing.',
    section: 'Writing',
    color: 'bg-blue-200',
    href: 'researchers'
  },
  {
    id: 11,
    name: 'Samples',
    title:
      'Samples provide foundational sets of beliefs and understandings about the section of representation for the sample statistics in relation to population parameters.',
    section: 'Analysis',
    color: 'bg-yellow-200',
    href: 'samples'
  },
  {
    id: 12,
    name: 'Tables',
    title:
      'Tables provide foundational sets of beliefs and understandings about data.',
    section: 'Professionalism',
    color: 'bg-red-200',
    href: 'tables'
  },
  {
    id: 13,
    name: 'Techniques',
    title:
      'Techniques provide foundational sets of beliefs and understandings about methods used to conduct analyses.',
    section: 'Analysis',
    color: 'bg-yellow-200',
    href: 'techniques'
  }
];

export default function SectionGrid({ projectItemId }: any) {
  const router = useRouter();

  return (
    <ul
      section="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-8"
    >
      {sections.map((section) => (
        <li
          key={section.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-700 shadow cursor-pointer"
          onClick={() =>
            router.push(`/app/projects/${projectItemId}/${section.href}`)
          }
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {section.name}
                </h3>
                <span
                  className={`inline-block flex-shrink-0 rounded-full ${section.color} px-2 py-0.5 text-xs font-medium text-black`}
                >
                  {section.section}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                {section.title}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
