import range from 'lodash.range';
import random from 'lodash.random';
import React, { useCallback, useState } from 'react';
import './styles.css';

const players = ['red', 'green'];

const startingTokens = {
  // neutral: 0,
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

const Counter = ({ onAdd, onSubtract, title, total }) => {
  return (
    <div>
      <button onClick={onAdd}>+1</button>
      <button onClick={onSubtract}>-1</button>
      {'  --  '}
      <span>
        <strong>
          {title}: {total}
        </strong>
      </span>
    </div>
  );
};

function TokensInABag() {
  const [tokens, setTokens] = useState(startingTokens);
  const [drawn, setDrawn] = useState();

  const addToken = useCallback(
    (key) => {
      setTokens({
        ...tokens,
        [key]: tokens[key] + 1
      });
    },
    [tokens]
  );

  const subtractToken = useCallback(
    (key) => {
      setTokens({
        ...tokens,
        [key]: tokens[key] - 1
      });
    },
    [tokens]
  );

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

  const ColorCounter = ({ color }) => {
    return (
      <Counter
        onAdd={() => {
          addToken(color);
          setDrawn('');
        }}
        onSubtract={() => {
          subtractToken(color);
          setDrawn('');
        }}
        title={color}
        total={tokens[color]}
      />
    );
  };

  return (
    <div>
      <h2>Tokens In A Bag</h2>
      {players.map((color) => {
        return <ColorCounter key={color} color={color} />;
      })}
      <ColorCounter color="black" />
      <div>
        <button
          onClick={() => {
            setTokens(startingTokens);
          }}
        >
          Reset All
        </button>
      </div>
      <div>
        <h3>Drawn: {drawn}</h3>
        <button onClick={drawRandom}>Draw Random</button>
      </div>
      <div>
        <pre>{JSON.stringify(tokens, null, 2)}</pre>
      </div>
    </div>
  );
}

const startingHealth = players.reduce((acc, color) => {
  return {
    ...acc,
    [color]: 0
  };
}, {});

const HealthCounters = () => {
  const [health, setHealth] = useState(startingHealth);

  const add = useCallback(
    (key) => {
      setHealth({
        ...health,
        [key]: health[key] + 1
      });
    },
    [health]
  );

  const subtract = useCallback(
    (key) => {
      setHealth({
        ...health,
        [key]: health[key] - 1
      });
    },
    [health]
  );

  return (
    <div>
      <h2>Health Counters</h2>
      {players.map((color) => {
        return (
          <Counter
            key={color}
            onAdd={() => {
              add(color);
            }}
            onSubtract={() => {
              subtract(color);
            }}
            title={color}
            total={health[color]}
          />
        );
      })}
      <div>
        <button
          onClick={() => {
            setHealth(startingHealth);
          }}
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

const RandomPlayer = () => {
  const [selection, setSelection] = useState('');
  const [count, setCount] = useState(0);

  const getRandom = () => {
    const player = players[random(0, players.length - 1)];
    setSelection(player);
    setCount(count + 1);
  };

  return (
    <div>
      <h3>Random Player: {selection}</h3>
      <button onClick={getRandom}>Choose Random</button>
      <span>
        {'   '}Times Pressed: {count}
      </span>
      <div>
        <button
          onClick={() => {
            setCount(0);
            setSelection('');
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <TokensInABag />
      <HealthCounters />
      <RandomPlayer />
    </>
  );
};

export default App;
