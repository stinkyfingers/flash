import React, {useState, useRef, useEffect} from 'react';
import Store from '../store';
import '../css/card.css';

const Card = () => {
  const store = Store.useStore();
  const cards = store.get('cards');
  const [index, setIndex] = useState(0);
  const [problem, setProblem] = useState(cards[index]);
  const [answer, setAnswer] = useState('');
  const answerRef = useRef(null);



  useEffect(() => {
    // const handleKey = (e) => {
    //   if (e.keyCode === 13) {
    //     handleClick();
    //     // answerRef.current.click()
    //   }
    // };
    if (answerRef && answerRef.current) answerRef.current.focus();
    // document.addEventListener("keydown", handleKey, false);
    // return () => {
    //   document.removeEventListener("keydown", handleKey, false);
    // };
  }, []);

  const handleClick = () => {
    const result = (parseInt(answer, 10) !== problem.answer) ?
      `${problem.first} ${problem.operation} ${problem.second} = ${problem.answer} You answered ${answer}` :
      `${problem.first} ${problem.operation} ${problem.second} = ${problem.answer} Correct!`;

    const res = store.get('results');
    res.push({
      ...problem,
      result
    })
    store.set('results')(res);
    setIndex(index + 1);
    setProblem(cards[index + 1]);
    setAnswer('');
    if (index + 1 >= cards.length) {
      store.set('running')(false);
    }
    if (answerRef && answerRef.current) answerRef.current.focus();
  };

  const renderProblem = () => {
    if (!problem) return null;
    return (<React.Fragment>
      <input type='text' name='first' disabled value={problem.first} />
      <input type='text' name='operation' disabled value={problem.operation} />
      <input type='text' name='second' disabled value={problem.second} />
      <span className='equals'>=</span>
      <input type='text' name='answer' onChange={(e) => {setAnswer(e.target.value)}} value={answer} ref={answerRef} />
      <div className='goButton'><button className='go' onClick={handleClick} disabled={!answer.length}>Go</button></div>
    </React.Fragment>);
  };

  return (
    <div className='card'>
      {renderProblem()}
    </div>
  );
};

export default Card;
