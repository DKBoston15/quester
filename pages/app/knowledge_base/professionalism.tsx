import Layout from '@/components/Layout/Layout';

export default function Professionalism() {
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
                Professionalism
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              The conduct or qualities of researchers resulting from the
              development of academic preparation (see Figure 1).
              Professionalism supports positive first impressions, successful
              relationships, and valid reputations for researchers within
              academic environments. Through professionalism, researchers
              maintain high ethical standards in research, instruction, and
              service.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/professionalism_banner.jpg"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Figure 1. Contextualized Perspective of Tacit and Overt Aspects
                of Professionalism.
              </figcaption>
            </figure>
            <h2>Questions to ask</h2>
            <h3>What are some common perceptions of professionalism?</h3>
            <ul role="list">
              <li>Communicative</li>
              <li>Competent</li>
              <li>Honest</li>
              <li>Team player</li>
              <li>Trustworthiness</li>
            </ul>
            <h3>
              What are some common activities associated with professionalism?
            </h3>
            <ul role="list">
              <li>Generate effective, consistent, and reliable work habits</li>
              <li>Manage time</li>
              <li>Provide excellence in work product</li>
              <li>Solve problems</li>
              <li>Take initiative</li>
            </ul>
            <h3>What are some common elements of professionalism?</h3>
            <ul role="list">
              <li>Possessing specialized knowledge</li>
              <li>Creating an informative literature review</li>
              <li>Exhibiting competency</li>
              <li>Completing analysis of data</li>
              <li>Interpreting results from analysis of data</li>
              <li>Behaving with honesty and integrity</li>
              <li>Monitoring actions through self-regulation</li>
              <li>Generating a system of accountability</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
