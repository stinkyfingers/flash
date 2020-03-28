import React from 'react';
import Store from '../store';
import '../css/error.css';

const Error = () => {
  const store = Store.useStore();
  const error = store.get('error');
  if (!error) return null;
  return (
    <div className='error'>
      ERROR: {error}
    </div>
  );
};

export default Error;
