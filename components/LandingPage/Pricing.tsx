import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { postData } from 'utils/helpers';
import { getStripe } from 'utils/stripe-client';
import { useUser } from 'utils/useUser';
import { Price } from 'types';

import { Button } from '@/components/LandingPage/Button';
import { Container } from '@/components/LandingPage/Container';
import BillingButtonGroup from './BillingButtonGroup';

interface CheckIconProps {
  className: string;
}

function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        'h-6 w-6 flex-none fill-current stroke-current',
        className
      )}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface FeatureList {
  id: string;
  features: string[];
}

const featuresList: FeatureList[] = [
  {
    id: 'prod_N8ssJ5vBUEHJ1N',
    features: ['Send 25 quotes and invoices']
  },
  {
    id: 'prod_N94Hz4BR88o1cM',
    features: ['Send 25 quotes and invoices', 'Connect up to 5 bank accounts']
  },
  {
    id: 'prod_N8vFmE0wcvcSuN',
    features: [
      'Send 25 quotes and invoices',
      'Connect up to 5 bank accounts',
      'Track up to 50 expenses per month'
    ]
  }
];

const findItemById = (id: string) => {
  const list = featuresList.find((item) => item.id === id);
  return list?.features;
};

interface PlanProps {
  key: string;
  featured: boolean;
  name: string;
  price: string;
  description: string;
  href?: string;
  interval: string;
  onClick?: () => void;
  buttonText: string;
  features: string[] | undefined;
  priceItem: Price;
}

function Plan({
  name,
  price,
  description,
  href,
  features,
  featured = false,
  interval,
  buttonText,
  priceItem
}: PlanProps) {
  const router = useRouter();
  const { user, subscription } = useUser();

  const handleCheckout = async (price: Price) => {
    if (!user) {
      return router.push('/login');
    }
    if (subscription) {
      return router.push('/account');
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    }
  };

  return (
    <section
      className={clsx(
        'flex flex-col rounded-3xl px-6 sm:px-8',
        featured ? 'order-first bg-blue-600 py-8 lg:order-none' : 'lg:py-8'
      )}
      onClick={() => handleCheckout(priceItem)}
    >
      <h3 className="mt-5 font-display text-lg text-white">{name}</h3>
      <p
        className={clsx(
          'mt-2 text-base',
          featured ? 'text-white' : 'text-slate-400'
        )}
      >
        {description}
      </p>
      <p className="order-first font-display text-5xl font-light tracking-tight text-white">
        {price}{' '}
        <span className="font-display text-lg font-light tracking-tight text-white">
          {' '}
          {interval === 'month' ? 'monthly' : 'yearly'}
        </span>
      </p>
      <ul
        role="list"
        className={clsx(
          'order-last mt-10 flex flex-col gap-y-3 text-sm',
          featured ? 'text-white' : 'text-slate-200'
        )}
      >
        {features && (
          <>
            {features.map((feature) => (
              <li key={feature} className="flex">
                <CheckIcon
                  className={featured ? 'text-white' : 'text-slate-400'}
                />
                <span className="ml-4">{feature}</span>
              </li>
            ))}
          </>
        )}
      </ul>
      <Button
        href={href}
        variant={featured ? 'solid' : 'outline'}
        color="white"
        className="mt-8"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        {buttonText}
      </Button>
    </section>
  );
}

interface PricingProps {
  products: any;
}

export function Pricing({ products }: PricingProps) {
  const [billingInterval, setBillingInterval] = useState('month');
  const { subscription } = useUser();

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="bg-slate-900 py-20 sm:py-32"
    >
      <Container className={''}>
        <div className="md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            <span className="relative whitespace-nowrap">
              <span className="relative">Simple pricing,</span>
            </span>{' '}
            for everyone.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            It doesn’t matter what your budget is, we've got a plan for you
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <BillingButtonGroup
            billingInterval={billingInterval}
            setBillingInterval={setBillingInterval}
          />
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {products.map((product: any) => {
            const price = product?.prices?.find(
              (price: any) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);
            return (
              <Plan
                key={product.id}
                featured={true}
                name={product.name}
                price={priceString}
                priceItem={price}
                description={product.description}
                interval={billingInterval}
                buttonText={
                  product.name === subscription?.prices?.products?.name
                    ? 'Manage'
                    : 'Get Started'
                }
                features={findItemById(product.id)}
              />
            );
          })}
        </div>
        <div className="-mx-4 mt-16 grid max-w-2xl mx-auto">
          <div className="px-4">
            <h3 className="text-lg font-medium leading-6 text-white">
              Need more?
            </h3>
            <p className="mt-2 text-base text-slate-400">
              Contact us to discuss enterprise pricing options.
            </p>
            <div className="mt-4">
              <Button
                href="#"
                variant="outline"
                color="white"
                className="mt-8"
                aria-label={`Contact us for enterprise pricing`}
              >
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
