import React from 'react';
import Store from '../store';

const Controls = () => {
  const store = Store.useStore();
  const running = store.get('running');

  const validate = () => {
    const numbers = store.get('numbers');
    if (numbers.length < 2) {
      return 'You must select at least two numbers.';
    }
    const operations = store.get('operations');
    if (operations.length < 1) {
      return 'You must select at least one operation.';
    }
    return null;
  };

  const handleClick = () => {
    if (!running) {
      console.log('here')
      const err = validate();
      if (err) {
        store.set('error')(err);
        return;
      }
      store.set('cards')(makeCards())
    };
    store.set('running')(!running);
  };

  const getAnswer = (op, f, s) => {
    switch (op) {
      case '+':
        return ['+', parseInt(f, 10), parseInt(s, 10), parseInt(f, 10) + parseInt(s, 10)];
      case '-':
        return ['-', parseInt(f, 10), parseInt(s, 10), parseInt(f, 10) - parseInt(s, 10)];
      case '*':
        return ['*', parseInt(f, 10), parseInt(s, 10), parseInt(f, 10) * parseInt(s, 10)];
      case '/':
        const mul = parseInt(f, 10) * parseInt(s, 10);
        return ['/', mul, parseInt(f, 10), parseInt(s, 10)];
      default:
    };
  };

  const makeCards = () => {
    const numbers = store.get('numbers');
    const operations = store.get('operations');
    const cards = [];
    operations.forEach((operation) => {
      numbers.forEach((first) => {
        numbers.forEach((second) => {
          const [op, f, s, answer] = getAnswer(operation, first, second);
          const card = {
            operation: op, first: f, second: s, answer
          };
          cards.push(card)
        });
      });
    });
    return cards;
  };

  return (
    <div className='controls'>
      <button className='startstop' onClick={handleClick}>{running ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default Controls;
