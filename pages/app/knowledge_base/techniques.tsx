import Card from '@/components/KnowledgeBase/Card';
import Layout from '@/components/Layout/Layout';

export default function Models() {
  const items = [
    {
      id: 1,
      paradigm: {
        name: 'Content',
        link: ''
      },
      ontology: 'Methods exist as easily accessible.',
      epistemology:
        'Researchers can create techniques. Researchers infuse themselves in techniques.',
      methodology: 'Criteria for inclusion',
      product: 'Constructing units of analysis, Constructing codes for meaning'
    },
    {
      id: 2,
      paradigm: {
        name: 'Narrative',
        link: ''
      },
      ontology:
        'Methods exist to highlight the interactive and change qualities of life.',
      epistemology:
        'Researchers can observe techniques. Researchers act as interpreters for the techniques expressed by study participants.',
      methodology: 'Diversity in criterion for inclusion',
      product: 'Selecting data sources.'
    },
    {
      id: 3,
      paradigm: {
        name: 'Thematic',
        link: ''
      },
      ontology: 'Methods exist to support personal understanding.',
      epistemology:
        'Researchers can experience techniques. Researchers become the avatar of techniques.',
      methodology: 'Induction/deductive approaches, semantic/latent approaches',
      product: 'Summarizing codes'
    },
    {
      id: 4,
      paradigm: {
        name: 'Univariate',
        link: ''
      },
      ontology:
        'Methods exist to support a quantifiable understanding of the world.',
      epistemology:
        'Researchers can know techniques. Researchers are distinct from techniques.',
      methodology: 'Statistical software, text, interviews',
      product:
        'Knowing and understanding jargon, differentiating point estimates from intervals.'
    },
    {
      id: 5,
      paradigm: {
        name: 'Bivariate',
        link: ''
      },
      ontology: 'Methods exist to support the interaction of ideas.',
      epistemology:
        'Researchers can know techniques. Researchers are distinct from techniques.',
      methodology: 'Statistical software, text, interviews',
      product: 'Knowing and understanding jargon, Quantifying interactions'
    },
    {
      id: 6,
      paradigm: {
        name: 'Multivariate',
        link: ''
      },
      ontology: 'Methods exist to reflect the complexity of reality.',
      epistemology:
        'Researchers can know techniques. Researchers are distinct from techniques.',
      methodology: 'Statistical software, text, interviews',
      product: 'Knowing and understanding jargon, Quantifying interactions'
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
                Techniques
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              Techniques convey the manner in which researchers portray their
              analyses while standardizing methods.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <p>
              Techniques provide foundational sets of beliefs and understandings
              about methods used to conduct analyses. This allows researchers to
              generate, test, and extend theories and practices associated with
              those techniques used in conducting analyses. To recognize the
              techniques that influences your analyses, you will need to answer
              a few philosophical questions. For example, responses to
              ontological (e.g., what is the nature of a method?),
              epistemological (e.g., what can researchers know about a method?),
              and methodological (e.g., how do researchers gain knowledge about
              a method) questions will help you to generate your own
              foundational sets of beliefs and understandings about how to use
              techniques. In turn, they inform your identification of products
              you wish to generate, test, and/or extend through your analyses.
            </p>
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/techniques_banner.png"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Figure 1. A conceptual framework for defining techniques in
                terms of a method
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
                  href="https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Adata_analysis&btnG="
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
                  href="https://plato.stanford.edu/search/search?query=analysis+techniques"
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
