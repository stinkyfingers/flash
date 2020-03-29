import React from 'react';
import Store from '../store';
import '../css/results.css';

const Card = () => {
  const store = Store.useStore();
  const results = store.get('results');
  const renderResults = () => {
    return results.map((r, i) => {
      return (
        <div className='result' key={`result-${i}`}>
          {i+1}: {r.result}
        </div>
      );
    });
  };

  return (
    <div className='results'>
      {renderResults()}
    </div>
  );
};

export default Card;
