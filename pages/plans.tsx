import { Pricing } from '@/components/LandingPage/Pricing';
import { getActiveProductsWithPrices } from '@/utils/supabase-client';
import { useUser } from '@/utils/useUser';
import React, { useEffect, useState } from 'react';
import { ProductWithPrice } from 'types';

export default function plans() {
  const [products, setProducts] = useState<ProductWithPrice[]>();

  useEffect(() => {
    const getProducts = async () => {
      const products = await getActiveProductsWithPrices();
      setProducts(products.reverse());
    };
    getProducts();
  }, []);

  return <>{products && <Pricing products={products} />}</>;
}
