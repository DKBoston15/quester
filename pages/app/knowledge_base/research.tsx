import Layout from '@/components/Layout/Layout';

export default function Research() {
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
                Overview
              </span>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                Research
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              An umbrella term across the sciences and the humanities, research
              describes the systematic acts, on the part of researchers, taken
              to study overarching problems (see Figure 1). The purpose of
              research reflects the philosophical positions (i.e., paradigms) of
              those researchers. Through the course of research, researchers use
              paradigms to answer more specific questions associated with
              overarching problems.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/research_image.jpg"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Figure 1. The Onion Model Used to Describe Common Elements
                Associated with Research.
              </figcaption>
            </figure>
            <h2>Questions to ask</h2>
            <h3>What are some common types of research?</h3>
            <ul role="list">
              <li>Casual</li>
              <li>Derived</li>
              <li>Experimental</li>
              <li>Observational</li>
              <li>Simulated</li>
            </ul>
            <h3>What are some common methods used in research?</h3>
            <ul role="list">
              <li>Experimental</li>
              <li>Participant observation</li>
              <li>Secondary</li>
              <li>Survey</li>
              <li>Tetxual</li>
            </ul>
            <h3>What are some common elements of research?</h3>
            <ul role="list">
              <li>
                Identifying overarching problems and developing research
                questions
              </li>
              <li>Creating an informative literature review</li>
              <li>
                Designing a method for the collection, archiving, and analysis
                of data
              </li>
              <li>Completing analysis of data</li>
              <li>Interpreting results from analysis of data</li>
              <li>
                Linking results to overarching problem and research questions
              </li>
              <li>
                Identifying strengths and limitations, as well as, future
                directions for research
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
