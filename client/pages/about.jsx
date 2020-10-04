import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils';
import PageLayout from '../components/Layout/PageLayout';

const About = () => {
  const { data: categories, error } = useSWR(
    'http://localhost:8081/categories',
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (!categories) return 'Loading...';

  console.log(categories);
  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <h1>All Categories</h1>
      {categories.data.map((ele) => (
        <p>{ele.category}</p>
      ))}
      <style jsx>{`
        h1 {
          font-weight: bold;
          color: red;
        }
      `}</style>
    </PageLayout>
  );
};

export default About;
