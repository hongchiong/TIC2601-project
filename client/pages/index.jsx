import React from 'react';
import PageLayout from '../components/Layout/PageLayout';

const Index = () => {
  return (
    <PageLayout title='Homepage'>
      <div className='homepage-root'>
        <h1 className='page-title'>TIC2601 Project</h1>
      </div>
      <style jsx>
        {`
          .homepage-root {
            padding: 50px 0;
          }

          .page-title {
            text-align: center;
            
          }
          }
        `}
      </style>
    </PageLayout>
  );
};

export default Index;
