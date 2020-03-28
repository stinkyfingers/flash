import React from 'react';
import Card from './Card';
import Store from '../store';
import Error from './Error';
import Results from './Results';

const Body = () => {
  const store = Store.useStore();
  const running = store.get('running');
  return (
    <div className='body'>
      <Error />
      {running ? <Card /> : <Results />}
    </div>
  );
};

export default Body;
