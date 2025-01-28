import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full bg-[#123] text-white flex justify-between py-5 px-8">
        <h4 className="font-extrabold text-white">DAPP</h4>
        <h2 className="text-white">@Web3Bridge</h2>
      </div>
      <div className="py-auto px-96">
      <input type="text" name="" id="" placeholder="Amount" />
      </div>
    </>
  );
}

export default App;
