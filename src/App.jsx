import { useState } from "react";
import "../src/abi.json";
import "./App.css";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState("");
  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

  async function requestAccounts() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function depositFunds() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts();
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.deposit({
          value: ethers.parseEther(depositAmount),
        });
        await tx.wait();
        // console.log("Deposit successful");
        toast.success("Deposit successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        // console.error("Deposit failed:", error);
         toast.error("Deposit failed:", error, {
           position: toast.POSITION.BOTTOM_LEFT,
         });
      }
    } else {
      // console.error("Ethereum wallet is not detected");
      toast.error("Ethereum wallet is not detected:", error, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }

  async function withdrawFunds() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts();
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.withdraw(ethers.parseEther(withdrawAmount));
        await tx.wait();
        // console.log("Withdrawal successful");
        toast.success("Withdrawal successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        // console.error("Withdrawal failed:", error);
        toast.error("Withdrawal failed:", error, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    } else {
      // console.error("Ethereum wallet is not detected");
      toast.error("Ethereum wallet is not detected!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }

  async function getContractBalance() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const balance = await contract.getBalance();
        setBalance(ethers.formatEther(balance));
        // console.log("Balance retrieved:", ethers.formatEther(balance));
        toast.success("Balance retrieved:", ethers.formatEther(balance), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        // console.error("Failed to retrieve balance:", error);
         toast.error("Failed to retrieve balance:", error, {
           position: toast.POSITION.BOTTOM_LEFT,
         });
      }
    } else {
      // console.error("Ethereum wallet is not detected");
      // toast("Ethereum wallet is not detected");
      
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }

  return (
    <>
      <div className="w-full bg-[#123] text-white flex justify-evenly py-5 px-8">
        <h4 className="font-extrabold text-white">DAPP</h4>
        <h1 className="font-extrabold text-white">
          Smart Contract Interaction
        </h1>
        <h2 className="text-white">@Web3Bridge</h2>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* desposite  */}
        <div className="mb-5">
          <input
            type="text"
            onChange={(e) => setDepositAmount(e.target.value)}
            // value={depositAmount}
            className="mb-4 py-2 px-2 border border-[#123] border-solid rounded-md"
            placeholder="Enter deposit amount (ETH)"
          />
          <div className="flex justify-evenly gap-5 items-center ">
            <button
              onClick={depositFunds}
              className="py-2 px-8 rounded-md bg-[#0c0c51] text-white shadow-md"
            >
              Deposite
            </button>
          </div>
        </div>

        {/* withdrawal  */}
        <div className="mb-5">
          <input
            type="text"
            name=""
            placeholder="Enter withdrawal amount (ETH)"
            className="mb-4 py-2 px-2 border border-[#123] border-solid rounded-md"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <div className="flex justify-evenly gap-5 items-center ">
            <button
              onClick={withdrawFunds}
              className="py-2 px-8 rounded-md bg-[#580d0d] text-white shadow-md"
            >
              Withdraw
            </button>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex flex-col mb-7 justify-evenly gap-5 items-center ">
            <button
              onClick={getContractBalance}
              className="py-2 px-8 rounded-md bg-[#136219] text-white shadow-md"
            >
              Get Balance
            </button>
            <h4 className="font-extrabold">Available Balance: {balance} ETH</h4>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
