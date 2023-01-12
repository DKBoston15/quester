import Card from '@/components/KnowledgeBase/Card';
import Layout from '@/components/Layout/Layout';

export default function Paradigms() {
  const items = [
    {
      id: 1,
      paradigm: {
        name: 'Positivism',
        link: 'https://www.sciencedirect.com/topics/social-sciences/positivism'
      },
      ontology: 'Reality exists and can be captured, studied, and understood.',
      epistemology:
        'Researchers can know reality. Researchers are distinct from reality.',
      methodology: 'Experiments, quasi-experiments, surveys',
      product: 'Facts, theories, laws'
    },
    {
      id: 2,
      paradigm: {
        name: 'Post positivism',
        link: 'https://methods.sagepub.com/reference/the-sage-encyclopedia-of-educational-research-measurement-and-evaluation/i16217.xml'
      },
      ontology: 'Reality exists but cannot be fully understood.',
      epistemology:
        'Researchers can approximate reality. Researchers act as data collection instruments in attempting to understand reality.',
      methodology: 'Frequencies, qualitative methods',
      product: 'Generalizations, descriptions, patterns, grounded theories'
    },
    {
      id: 3,
      paradigm: {
        name: 'Constructivism',
        link: 'https://www.sciencedirect.com/topics/psychology/constructivism'
      },
      ontology:
        'Reality exists in multiple states and is constructed by individuals.',
      epistemology:
        'Researchers believe that knowledge of reality is constructed. Researchers and participants co-construct knowledge about reality.',
      methodology: 'Naturalistic inquiry',
      product: 'Case studies, narratives, reconstructions'
    },
    {
      id: 4,
      paradigm: {
        name: 'Critical',
        link: 'https://www.oxfordbibliographies.com/view/document/obo-9780195396577/obo-9780195396577-0374.xml?rskey=v4JfuZ&result=1&q=critical+theory#firstMatch'
      },
      ontology:
        'An individual’s reality exists in terms of multiple factors (e.g., class, gender, and race).',
      epistemology:
        'Researchers view knowledge as subjective and political. Researchers infuse values into their inquiry of reality.',
      methodology: 'Transformative inquiry',
      product: 'Critiques of power structures'
    },
    {
      id: 5,
      paradigm: {
        name: 'Post structuralism',
        link: 'https://www.oxfordbibliographies.com/display/document/obo-9780190221911/obo-9780190221911-0008.xml'
      },
      ontology:
        'Order is created within the minds of individuals to give meaning to a meaningless reality.',
      epistemology:
        'Researchers do not believe a reality exists to know. Researchers examine false realities through textual representation.',
      methodology: 'Deconstruction, genealogy',
      product: 'Deconstructions, genealogies, reflexive texts'
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
                Paradigms
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              Research paradigms provide theoretical support in the development
              of research products from studying some form of reality.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <p>
              Paradigms provide foundational sets of beliefs and understandings
              about reality. This allows researchers to generate, test, and
              extend theories and practices associated with research into
              reality. To recognize the paradigm that influences your research,
              you will need to answer a few philosophical questions. For
              example, responses to ontological (e.g., what is the nature of
              reality?), epistemological (e.g., what can researchers know about
              reality?), and methodological (e.g., how do researchers gain
              knowledge about reality) questions will help you to generate your
              own foundational sets of beliefs and understandings about
              paradigms. In turn, they inform your identification of products
              you wish to generate, test, and/or extend through your research.
            </p>
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/research_paradigm.png"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Philosophical Influence on the Development of Research Paradigms
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
                  href="https://methods.sagepub.com/reference/the-sage-dictionary-of-social-research-methods/n141.xml#:~:text=The%20general%20principles%20of%20the,of%20law%20to%20be%20considered"
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
                  href="https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aparadigms&btnG="
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
                  href="https://plato.stanford.edu/entries/thomas-kuhn/"
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
