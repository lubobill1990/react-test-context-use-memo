import React, { createContext, memo, useMemo, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

const Boundary = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='boundary'>
      <RerenderCount />
      {children}
    </div>
  );
};

const RerenderCount = () => {
  const updateCountRef = React.useRef(0);

  return <div>Re-render: {++updateCountRef.current}</div>;
};

const AppContext = createContext({
  count: 0,
  setCount: (count: number) => {},
  text: '',
  setText: (text: string) => {},
  setInternalCount: (value: number) => {},
});

function useAppContext() {
  return React.useContext(AppContext);
}

const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const [internalCount, setInternalCount] = useState(0);
  const [text, setText] = useState('');
  const value = useMemo(
    () => ({
      count,
      setCount,
      text,
      setText,
      setInternalCount,
    }),
    [count, text]
  );

  // const value = {
  //   count,
  //   setCount,
  //   text,
  //   setText,
  //   setInternalCount,
  // };
  console.log('AppContextProvider rerender', value, { internalCount });
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const Count = memo(() => {
  const { count, setCount } = useAppContext();
  console.log('count rerender', count);
  return (
    <Boundary>
      <p>Count: {count}</p>
      <button onClick={() => setCount(10)}>Set count to 10</button>
      <button onClick={() => setCount(0)}>Set count to 0</button>
    </Boundary>
  );
});

const InternalCount = memo(() => {
  const { setInternalCount } = useAppContext();
  console.log('internal count rerender');
  return (
    <Boundary>
      <p>Internal Count</p>
      <button onClick={() => setInternalCount(10)}>
        Set internal count to 10
      </button>
      <button onClick={() => setInternalCount(0)}>
        Set internal count to 0
      </button>
    </Boundary>
  );
});

const Paragraph = memo(() => {
  const { setText, text } = useAppContext();
  console.log('paragraph rerender', text);
  return (
    <Boundary>
      <p>Text: {text}</p>
      <button onClick={() => setText('World')}>Set text to `World`</button>
      <button onClick={() => setText('Hello')}>Set text to `Hello`</button>
    </Boundary>
  );
});

function App() {
  return (
    <AppContextProvider>
      <div className='App'>
        <Boundary>
          <h1>Test React context useMemo</h1>
          <div className='flex'>
            <InternalCount></InternalCount>
            <Count></Count>
            <Paragraph></Paragraph>
          </div>
        </Boundary>
      </div>
    </AppContextProvider>
  );
}

export default App;
