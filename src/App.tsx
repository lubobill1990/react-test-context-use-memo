import React, { createContext, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const AppContext = createContext({
  count: 0,
  setCount: (count: number) => {},
  text: "",
  setText: (text: string) => {},
  setInternalCount: (value: number) => {},
});

function useAppContext() {
  return React.useContext(AppContext);
}

const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const [internalCount, setInternalCount] = useState(0);
  const [text, setText] = useState("");
  // const value = useMemo(
  //   () => ({
  //     count,
  //     setCount,
  //     text,
  //     setText,
  //     setInternalCount,
  //   }),
  //   [count, text, internalCount]
  // );

  const value = {
    count,
    setCount,
    text,
    setText,
    setInternalCount,
  };
  console.log("AppContextProvider rerender", value);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const Count = () => {
  const { count, setCount } = useAppContext();
  console.log("count rerender", count);
  return (
    <div className="card">
      <p>Count: {count}</p>
      <button onClick={() => setCount(10)}>Set count to 10</button>
      <button onClick={() => setCount(0)}>Set count to 0</button>
    </div>
  );
};
const InternalCount = () => {
  const { setInternalCount } = useAppContext();
  console.log("internal count rerender");
  return (
    <div className="card">
      <p>Internal Count</p>
      <button onClick={() => setInternalCount(10)}>
        Set internal count to 10
      </button>
      <button onClick={() => setInternalCount(0)}>
        Set internal count to 0
      </button>
    </div>
  );
};

const Paragraph = () => {
  const { setText, text } = useAppContext();
  console.log("paragraph rerender", text);
  return (
    <div className="card">
      <p>Text: {text}</p>
      <button onClick={() => setText("World")}>Set text to `World`</button>
      <button onClick={() => setText("Hello")}>Set text to `Hello`</button>
    </div>
  );
};

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <h1>Test React context useMemo</h1>
        <div className="flex">
          <InternalCount></InternalCount>
          <Count></Count>
          <Paragraph></Paragraph>
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
