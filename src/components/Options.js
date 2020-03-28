import React, {useState} from 'react';
import Store from '../store';

const numbers = [1,2,3,4,5,6,7,8,9,10,11,12];
const operations = ['+','-','*','/'];

const Options = () => {
  const [selectedNumbers, setNumbers] = useState([]);
  const [selectedOperations, setOperations] = useState([]);
  const store = Store.useStore();

  const handleChange = (e) => {
    const val = e.target.value;
    switch (e.target.name) {
      case 'number':
        const nums = [...selectedNumbers];
        if (e.target.checked) {
          if (!nums.includes(val)) {
            nums.push(val);
          }
        } else {
          const index = selectedNumbers.indexOf(val);
          if (index > -1) {
            nums.splice(index, 1);
          }
        }
        setNumbers(nums);
        store.set('numbers')(nums);
        break;
      case 'operations':
        const ops = [...selectedOperations];
        if (e.target.checked) {
          if (!ops.includes(val)) {
            ops.push(val);
          }
        } else {
          const index = selectedOperations.indexOf(val);
          if (index > -1) {
            ops.splice(index, 1);
          }
        }
        setOperations(ops);
        store.set('operations')(ops);
        break;
      default:

    }
  }

  const renderNumbers = () => {
    const opts = numbers.map((n) => {
      return (
        <React.Fragment key={`number-${n}`}>
        <label>{n}</label>
        <input type='checkbox' name='number' value={n} onChange={handleChange} />
        </React.Fragment>
      );
    });

    return (
      <div className='numbers'>
        {opts}
      </div>
    );
  };

  const renderOperations = () => {
    const opts = operations.map((n) => {
      return (
        <React.Fragment key={`operation-${n}`}>
        <label>{n}</label>
        <input type='checkbox' name='operations' value={n} onChange={handleChange} />
        </React.Fragment>
      );
    });

    return (
      <div className='numbers'>
        {opts}
      </div>
    );
  };

  return (
    <div className='Options'>
      {renderNumbers()}
      {renderOperations()}
    </div>
  );
};

export default Options;
