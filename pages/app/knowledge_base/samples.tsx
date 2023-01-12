import Card from '@/components/KnowledgeBase/Card';
import Layout from '@/components/Layout/Layout';

export default function Models() {
  const items = [
    {
      id: 1,
      paradigm: {
        name: 'Convenience',
        link: ''
      },
      ontology:
        'Representation exists outside the need for generalizable information.',
      epistemology:
        'Researchers know the least about representation. Researchers do not consider the value of representation.',
      methodology: 'Chance',
      product: 'The average person for the time and place of the researcher'
    },
    {
      id: 2,
      paradigm: {
        name: 'Purposive',
        link: ''
      },
      ontology: 'Representation exists to serve the purpose of the researcher.',
      epistemology:
        'Researchers can know the representation of unknown populations. Researchers use representation to further their agenda.',
      methodology: 'Personal intent of researcher',
      product: 'Persons’ meeting researchers’ needs.'
    },
    {
      id: 3,
      paradigm: {
        name: 'Snowball',
        link: ''
      },
      ontology:
        'Social influence removes the need to consider the existence of representation.',
      epistemology:
        'Researchers can know the value of participants in representation. Researchers use participants for representation.',
      methodology: 'Personal intent of study participant',
      product: 'Persons as a complex web of social connections'
    },
    {
      id: 4,
      paradigm: {
        name: 'Simple random',
        link: ''
      },
      ontology:
        'Representation exists and can lead to better understanding of the population.',
      epistemology:
        'Researchers can know representation. Researchers are distinct from representation.',
      methodology: 'Sampling frame',
      product: 'The average person for the time and place of a population.'
    },
    {
      id: 5,
      paradigm: {
        name: 'Cluster',
        link: ''
      },
      ontology:
        'Representation exists and relates to elements in the population.',
      epistemology:
        'Researchers can know both representation and elements influencing representation. Researchers choose elements for viewing representation.',
      methodology: 'Sampling frame, population descriptors',
      product: 'Persons within specified physical groupings of a population'
    },
    {
      id: 6,
      paradigm: {
        name: 'Systematic',
        link: ''
      },
      ontology:
        'Representation exists and external methods can improve understanding of the population.',
      epistemology:
        'Researchers can know both representation and how they view representation. Researchers choose how to relate to representation.',
      methodology:
        'Sampling frame, population descriptors, population hierarchies',
      product: 'Persons within specified orders of a population'
    }
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden bg-white py-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          <div
            className="relative mx-auto h-full max-w-prose text-lg"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-lg font-semibold text-indigo-600">
                Analysis
              </span>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                Samples
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              Samples describe attributes used to generate results from analyses
              for supporting claims of representation for populations.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <p>
              Samples provide foundational sets of beliefs and understandings
              about the role of representation for the sample statistics in
              relation to population parameters. This allows researchers to
              generate, test, and extend theories and practices associated with
              research into the validity of sample statistics in their analyses.
              To recognize the samples that influences your analyses, you will
              need to answer a few philosophical questions. For example,
              responses to ontological (e.g., what is the nature of
              representation?), epistemological (e.g., what can researchers know
              about representation?), and methodological (e.g., how do
              researchers gain knowledge about representation) questions will
              help you to generate your own foundational sets of beliefs and
              understandings of representation. In turn, they inform your
              identification of products you wish to generate, test, and/or
              extend through your analyses.
            </p>
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/samples_banner.png"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Figure 1. A conceptual framework for defining questions in
                samples of representation
              </figcaption>
            </figure>
            <h2>Types and Examples</h2>
            <div className="flex flex-col space-y-4">
              {items.map((item) => (
                <Card item={item} key={item.id} />
              ))}
            </div>
            <h2>Links</h2>
            <div className="flex space-x-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <a
                  href="https://methods.sagepub.com/reference/encyclopedia-of-survey-research-methods/n503.xml"
                  target="_blank"
                  className="text-white no-underline"
                >
                  Sage
                </a>
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <a
                  href="https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Asampling&btnG="
                  target="_blank"
                  className="text-white no-underline"
                >
                  Google Scholar
                </a>
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <a
                  href="https://plato.stanford.edu/search/search?query=sampling+designs"
                  target="_blank"
                  className="text-white no-underline"
                >
                  Stanford Encyclopedia
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
