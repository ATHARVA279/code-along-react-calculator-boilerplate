import { useReducer } from 'react';
import './App.css';

const initState = {
  inputs: '',
  res: '',
};

const operators = ['+', '-', '*', '/'];

function reducer(state = initState, { type, payload }) {
  switch (type) {
    case 'AddInp': {
      let addOPs = true;

      if (
        operators.includes(payload) &&
        operators.includes(state.inputs.slice(state.inputs.length - 1))
      ) {
        addOPs = false;
      } else {
        addOPs = true;
      }

      if (addOPs) {
        return { ...state, inputs: state.inputs + payload };
      }
      return { ...state };
    }
    case 'Cal': {
      const inplen = state.inputs.length;

      if (!operators.includes(state.inputs.slice(inplen - 1, inplen))) {
        try {
          const result = eval(state.inputs);
          if (!Number.isFinite(result)) {
            throw new Error('Cannot divide by zero');
          }

          return {
            ...state,
            res: result.toString(),
            inputs: result.toString(),
          };
        } catch (err) {
          console.log('error:', err.message);
        }
      } else {
        return {
          ...state,
          inputs: eval(state.inputs.slice(0, inplen - 1)).toString(),
          res: '',
        };
      }
    }
    case 'Delete': {
      return {
        ...state,
        inputs: state.inputs.slice(0, state.inputs.length - 1),
      };
    }
    case 'Clear': {
      return { ...state, inputs: '', res: '' };
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleClick = (val) => {
    dispatch({ type: 'AddInp', payload: val });
  };

  const handleClear = () => {
    dispatch({ type: 'Clear' });
  };

  const handleCal = () => {
    dispatch({ type: 'Cal' });
  };

  const handleDel = () => {
    dispatch({ type: 'Delete' });
  };

  return (
    <div className='main'>
      <div className='console'>
        <input type='text' disabled value={state.inputs} />
      </div>
      <div className='div c1'>
        <button onClick={handleClear}>AC</button>
        <button onClick={handleDel}>DEL</button>
        <button onClick={() => handleClick('+')}>+</button>
      </div>
      <div className='div c2'>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
      </div>
      <div className='div c3'>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>X</button>
      </div>
      <div className='div c4'>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>
      </div>
      <div className='div c5'>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={handleCal}>=</button>
      </div>
    </div>
  );
}

export default App;
