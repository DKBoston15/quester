import Layout from '@/components/Layout/Layout';

export default function Analysis() {
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
                Analysis
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              A word describing the study of complex information derived from
              research (see Figure 1). The purpose of analysis centers on the
              desire of researchers to understand elements of an overarching
              problem and reach conclusions about more specific questions.
              Through the use of specific methods of analysis, researchers
              answer more specific questions associated with overarching
              problems.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/analysis_banner.png"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Figure 1. Common Visualization Products Generated from Analysis
              </figcaption>
            </figure>
            <h2>Questions to ask</h2>
            <h3>What are some common types of analysis?</h3>
            <ul role="list">
              <li>Descriptive</li>
              <li>Exploratory</li>
              <li>Inferential</li>
              <li>Mechanistic</li>
              <li>Predictive</li>
            </ul>
            <h3>What are some common methods used in analysis?</h3>
            <ul role="list">
              <li>Cluster</li>
              <li>Factor</li>
              <li>Grounded</li>
              <li>Narrative</li>
              <li>Phenomenological</li>
              <li>SEM</li>
              <li>Textual</li>
            </ul>
            <h3>What are some common elements of analysis?</h3>
            <ul role="list">
              <li>Asserting a point of view</li>
              <li>Collecting evidence to support a point of view</li>
              <li>
                Justifying the point of view through the manipulation of
                evidence
              </li>
              <li>
                Discussing the value of a point of view from the manipulation of
                evidence
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
