import React from 'react';
import Options from './Options';
import Controls from './Controls';
import Store from '../store';

const Header = () => {
  const store = Store.useStore();
  const running = store.get('running');
  return (
    <div className='header'>
      {running ? null : <Options />}
      <Controls />
    </div>
  );
};

export default Header;
