import { Box, Button, Stack } from '@mui/material';
import './App.css';
import { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {
  const [number, setNumber] = useState('0');
  const [current, setCurrent] = useState('0');
  const [displayResult, setDisplayResult] = useState(false);

  const addNumber = (newNumber) => {
    if (displayResult) {
      setCurrent(number + newNumber);
      setNumber(number + newNumber);
      setDisplayResult(false);
    } else {
      if (current === '0' || current === '-0') {
        setCurrent(newNumber);
      } else {
        setCurrent((prevNumber) => prevNumber + newNumber);
      }
    }
  };

  const deleteLastDigit = () => {
    if (current.length === 1 || displayResult) {
      setCurrent('0');
      setNumber('0');
      setDisplayResult(false);
    } else {
      const updatedState = current.slice(0, -1);
      setCurrent(updatedState);
      setNumber(updatedState);
    }
  };

  const handleEqual = (e) => {
    e.preventDefault();
    try {
      const result = evaluate(current);
      setCurrent(result.toString());
      setNumber(result.toString());
      setDisplayResult(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            m: 0,
            color: '#1976D2',
            border: '1px solid',
            borderColor: '#1976D2',
            borderRadius: 1,
            fontSize: '0.875rem',
            fontWeight: '700',
            justifyContent: 'end',
            alignItems: 'flex-end',
            height: '30px',
            marginTop: '15px',
          }}
        >
          <div className='operation'>
            {current}
          </div>
          <br />
          <div className='result'>
            {displayResult ? number : ''}
          </div>
        </Box>
        <Stack direction="row">
          <Button value={'%'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">%</Button>
          {/* had to create a function that deletes the last digit added */}
          <Button onClick={deleteLastDigit}
            variant="outlined">CE</Button>
          <Button value={0} onClick={() => {
            setNumber('0')
          }}
            variant="outlined">C</Button>
          <Button value={'^2'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">χ²</Button>
        </Stack>
        <Stack direction="row">
          <Button value={'7'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">7</Button>
          <Button value={'8'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">8</Button>
          <Button value={'9'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">9</Button>
          <Button value={'/'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">/</Button>
        </Stack>
        <Stack direction="row">
          <Button value={'4'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">4</Button>
          <Button value={'5'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">5</Button>
          <Button value={'6'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">6</Button>
          <Button value={'*'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">X</Button>
        </Stack>
        <Stack direction="row">
          <Button value={'1'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined"
          >
            1
          </Button>
          <Button value={'2'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">2</Button>
          <Button value={'3'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">3</Button>
          <Button value={'-'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">-</Button>
        </Stack>
        <Stack direction="row">
          <Button value={'.'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">.</Button>
          <Button value={'0'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">0</Button>
          <Button onClick={handleEqual}
            variant="outlined">=</Button>
          <Button value={'+'} onClick={(e) => addNumber(e.target.value)}
            variant="outlined">+</Button>
        </Stack>
      </Box>
    </div>
  );
}

export default App;