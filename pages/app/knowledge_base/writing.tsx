import Layout from '@/components/Layout/Layout';

export default function Writing() {
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
                Writing
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              An expression used to describe the clear, concise, and structured
              use of written language backed up with the interpretation of
              evidence acquired through research (see Figure 1). Writing allows
              researchers to convey their understanding of complex ideas to
              readers. Although possessing a formal tone and style, researchers
              do not use complex sentences or complicated vocabulary in writing
              as both actions reduce clarity of understanding for readers.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <figure>
              <img
                className="w-full rounded-lg"
                src="/knowledge_base/writing_banner.jpg"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Figure 1. Common Visualization Products Generated from Writing
              </figcaption>
            </figure>
            <h2>Questions to ask</h2>
            <h3>What are some common types of writing?</h3>
            <ul role="list">
              <li>Comparative/Contrasting</li>
              <li>Expository</li>
              <li>Narrative</li>
              <li>Persuasive</li>
              <li>Reflective</li>
            </ul>
            <h3>What are some common methods used in writing?</h3>
            <ul role="list">
              <li>Alliteration and assonance</li>
              <li>Foreshadowing</li>
              <li>Hyperbole</li>
              <li>Metaphor</li>
              <li>Personification</li>
              <li>Phenomenological</li>
              <li>Technical</li>
            </ul>
            <h3>What are some common elements of writing?</h3>
            <ul role="list">
              <li>Introducing the purpose</li>
              <li>Creating an informative literature review</li>
              <li>Identifying the audience</li>
              <li>Providing clarity</li>
              <li>Understanding construction</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
