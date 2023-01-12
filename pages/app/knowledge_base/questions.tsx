import Card from '@/components/KnowledgeBase/Card';
import Layout from '@/components/Layout/Layout';

export default function Questions() {
  const items = [
    {
      id: 1,
      paradigm: {
        name: 'Exploratory',
        link: ''
      },
      ontology: 'Observation exists as a generalized action.',
      epistemology:
        'Researchers can know methods of observation. Researchers reduce bias from observation.',
      methodology: 'Interviews, textual notes, simple statistics',
      product: 'Qualitatively, Mixed manner'
    },
    {
      id: 2,
      paradigm: {
        name: 'Predictive',
        link: ''
      },
      ontology: 'Observation exists in the future.',
      epistemology:
        'Researchers may or may not know observation. Researchers may or may not place themselves in the observation.',
      methodology:
        'Interviews, current events, textual notes, Multivariate analysis',
      product: 'Qualitatively, Mixed manner, Quantitatively'
    },
    {
      id: 3,
      paradigm: {
        name: 'Interpretive',
        link: ''
      },
      ontology: 'Observation exists in nature.',
      epistemology:
        'Researchers can know setting of observation. Researchers take no action during observation.',
      methodology: 'Interviews, secondary interviews, simple statistics',
      product: 'Qualitatively, Mixed manner'
    },
    {
      id: 4,
      paradigm: {
        name: 'Comparative',
        link: ''
      },
      ontology: 'Observation may or may not exist in a causal framework.',
      epistemology:
        'Researchers can know elements for observation. Researchers may or may not participate in observation.',
      methodology: 'Interviews, Correlational analysis',
      product: 'Mixed manner, Quantitatively'
    },
    {
      id: 5,
      paradigm: {
        name: 'Relationship',
        link: ''
      },
      ontology: 'Observation exists in a causal framework.',
      epistemology:
        'Researchers know elements for observation. Researchers choose to not participate in observation.',
      methodology: 'Multivariate analysis',
      product: 'Mixed manner, Quantitatively'
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
                Research
              </span>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                Questions
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              Research questions express the perspective of researchers in the
              act of observation during research.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <p>
              Research questions provide foundational sets of beliefs and
              understandings about the role of observations in research. This
              allows researchers to generate, test, and extend theories and
              practices associated with those observations used by themselves in
              conducting research. To recognize the questions that influences
              your research, you will need to answer a few philosophical
              questions. For example, responses to ontological (e.g., what is
              the nature of observation?), epistemological (e.g., what can
              researchers know about observations?), and methodological (e.g.,
              how do researchers gain knowledge through observation) questions
              will help you to generate your own foundational sets of beliefs
              and understandings about research questions. In turn, they inform
              your identification of products you wish to generate, test, and/or
              extend through your research.
            </p>
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/research_question.png"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Figure 1. A conceptual framework for defining questions in terms
                of observation
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
                  href="https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aresearch_design&btnG="
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
                  href="https://plato.stanford.edu/search/search?query=research+questions"
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
