import Head from 'next/head';
import { CallToAction } from '@/components/LandingPage/CallToAction';
import { Faqs } from '@/components/LandingPage/Faqs';
import { Footer } from '@/components/LandingPage/Footer';
import { Header } from '@/components/LandingPage/Header';
import { Hero } from '@/components/LandingPage/Hero';
import { Pricing } from '@/components/LandingPage/Pricing';
import { PrimaryFeatures } from '@/components/LandingPage/PrimaryFeatures';
import { SecondaryFeatures } from '@/components/LandingPage/SecondaryFeatures';
import { Testimonials } from '@/components/LandingPage/Testimonials';

import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/useUser';
import { useEffect } from 'react';

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.replace('/app/projects');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Quester - A better way to manage research</title>
        <meta name="description" content="A better way to manage research!" />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        {/* <SecondaryFeatures /> */}
        {/* <Testimonials /> */}
        <CallToAction />
        <Pricing products={products} />
        {/* <Faqs /> */}
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products: products.reverse()
    },
    revalidate: 60
  };
}
