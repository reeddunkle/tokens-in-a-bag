import range from 'lodash.range';
import random from 'lodash.random';
import React, { useState } from 'react';
import './styles.css';

const players = ['red', 'green'];

const startingTokens = {
  neutral: 0,
  black: 0,
  ...players.reduce(
    (acc, color) => ({
      ...acc,
      [color]: 0
    }),
    {}
  )
};

const filterValue = (obj, value) => {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    return val === value
      ? acc
      : {
          ...acc,
          [key]: val
        };
  }, {});
};

export default function App() {
  const [tokens, setTokens] = useState(startingTokens);
  const [drawn, setDrawn] = useState();

  const addToken = (key) => {
    setTokens({
      ...tokens,
      [key]: tokens[key] + 1
    });
  };

  const subtractToken = (key) => {
    setTokens({
      ...tokens,
      [key]: tokens[key] - 1
    });
  };

  const drawRandom = () => {
    const bag = Object.entries(tokens).reduce((acc, [key, value]) => {
      return [...acc, ...range(value).map(() => key)];
    }, []);

    if (bag.length === 0) {
      return;
    }

    const chosen = bag[random(0, bag.length - 1)];

    setDrawn(chosen);
    subtractToken(chosen);
  };

  return (
    <div>
      {players.map((color) => {
        return (
          <div key={color}>
            <p>{color}</p>
            <button
              onClick={() => {
                addToken(color);
              }}
            >
              +1
            </button>
            <span>{tokens[color]}</span>
          </div>
        );
      })}
      <div>
        <button
          onClick={() => {
            setTokens(startingTokens);
          }}
        >
          Reset
        </button>
      </div>
      <div>
        <p>Drawn: {drawn}</p>
        <button onClick={drawRandom}>Draw Random</button>
      </div>
      <div>
        <pre>{JSON.stringify(filterValue(tokens, 0), null, 2)}</pre>
      </div>
    </div>
  );
}
