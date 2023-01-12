import Card from '@/components/KnowledgeBase/Card';
import Layout from '@/components/Layout/Layout';

export default function Designs() {
  const items = [
    {
      id: 1,
      paradigm: {
        name: 'Correlational',
        link: 'https://www.sciencedirect.com/topics/social-sciences/positivism'
      },
      ontology: 'Processes exist and can be quantified.',
      epistemology:
        'Researchers can know processes. Researchers observe processes.',
      methodology: 'Validated instruments, measures',
      product: 'Percentages, Pearson’s r, Spearman’s rho, Chi-square'
    },
    {
      id: 2,
      paradigm: {
        name: 'Descriptive',
        link: ''
      },
      ontology: 'Processes exist after being identified.',
      epistemology:
        'Researchers can give a rich knowledge of processes. Researchers view processes through their personal perspectives.',
      methodology: 'Interviews, textual data',
      product: 'Visualizations, frequencies, quotes'
    },
    {
      id: 3,
      paradigm: {
        name: 'Diagnostic',
        link: ''
      },
      ontology: 'Processes exist as direct precursors to outcomes.',
      epistemology:
        'Researchers can know the cause and effect purpose of processes. Researchers attempt to make objective observations and judgments.',
      methodology: 'Standardized protocols, interviews, direct observation',
      product: 'Prescriptions, generalizations'
    },
    {
      id: 4,
      paradigm: {
        name: 'Experimental',
        link: ''
      },
      ontology: 'Processes exist when controlling for extraneous factors.',
      epistemology:
        'Researchers know important elements of processes. Researchers separate elements of processes.',
      methodology: 'Validated instruments',
      product: 'Uni-, bi-, and multivariate statistics'
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
                Designs
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              Research designs structure the use of specific processes in
              conducting research.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <p>
              Research designs provide foundational sets of beliefs and
              understandings about processes in research. This allows
              researchers to generate, test, and extend theories and practices
              associated with processes used in their own research. To recognize
              the designs that influences your research, you will need to answer
              a few philosophical questions. For example, responses to
              ontological (e.g., what is the nature of processes?),
              epistemological (e.g., what can researchers know about
              processes?), and methodological (e.g., how do researchers gain
              knowledge about processes) questions will help you to generate
              your own foundational sets of beliefs and understandings about
              research designs. In turn, they inform your identification of
              products you wish to generate, test, and/or extend through your
              research.
            </p>
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/design_banner.png"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                A conceptual framework for defining designs in terms of
                processes
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
                  href="https://methods.sagepub.com/reference/encyc-of-research-design?fromsearch=true"
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
                  href="https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aanalysis&btnG="
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
                  href="https://plato.stanford.edu/search/search?query=research"
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
