import { useState, useEffect } from "react";
import { Sun, Moon, ArrowDownUp } from "lucide-react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit"; // <- wallet
import Logo from "./assets/Logo.png";
import TokenSelect from "./components/TokenSelect";
import TransactionHistory from "./components/Transactionhistory";

export default function App() {
  // Wallet
  const account = useCurrentAccount(); // This will give connected wallet info

  // Theme
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as "light" | "dark";
      return saved || "light";
    }
    return "light";
  });

  const [modalOpen, setModalOpen] = useState(false);

  // Swap state
  const [sendToken, setSendToken] = useState("SUI");
  const [receiveToken, setReceiveToken] = useState("WAL");
  const [sendAmount, setSendAmount] = useState(1);
  const [receiveAmount, setReceiveAmount] = useState(2.3);
  const [popupStatus, setPopupStatus] = useState<null | "loading" | "success" | "error">(null);

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const handleTokenSwitch = () => {
    setSendToken(receiveToken);
    setReceiveToken(sendToken);
    setSendAmount(receiveAmount);
    setReceiveAmount(sendAmount);
  };

  const handleSwap = async () => {
    if (!account) {
      alert("Connect your wallet first");
      return;
    }

    setPopupStatus("loading");
    await new Promise(r => setTimeout(r, 2000));
    setPopupStatus(Math.random() > 0.3 ? "success" : "error");
    setTimeout(() => setPopupStatus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-white transition-colors duration-300">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 font-bold">
          <img src={Logo} alt="Logo" className="h-13 w-15" />
          <h3 className="text-2xl font-bold text-blue-600">SuiSwap</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 transition-all hover:scale-110 active:scale-95"
          >
            {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-400" />}
          </button>

          {/* Connect Wallet */}
           <ConnectButton modal={{ isOpen: modalOpen, setIsOpen: setModalOpen }} />
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-10">
        <h1 className="text-5xl font-bold text-blue-600">Sui ↔ Swap</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Seamlessly swap your testnet token to other assets
        </p>

        {/* Display connected wallet */}
        {account && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Connected wallet: {account.address}
          </p>
        )}
      </section>

      {/* SWAP CARD */}
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 space-y-4 transition-colors">

        {/* SEND BLOCK */}
        <div>
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Send</label>
          <div className="flex justify-between bg-slate-100 dark:bg-black p-4 rounded-xl mt-2 border border-transparent focus-within:border-blue-500 transition-all">
            <TokenSelect value={sendToken} onChange={setSendToken} options={["SUI", "WAL", "IKA", "WACKO"]} />
            <input type="number" value={sendAmount} onChange={e => setSendAmount(+e.target.value)} className="bg-transparent text-right w-24 text-xl outline-none font-medium" />
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {sendAmount && receiveAmount ? `1 ${sendToken} ≈ ${(receiveAmount / sendAmount).toFixed(4)} ${receiveToken}` : ""}
          </div>
        </div>

        {/* SWITCH BUTTON */}
        <div className="flex justify-center -my-2 relative z-10">
          <button onClick={handleTokenSwitch} className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:rotate-180 transition-transform duration-300">
            <ArrowDownUp size={18} className="text-blue-600" />
          </button>
        </div>

        {/* RECEIVE BLOCK */}
        <div>
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Receive</label>
          <div className="flex justify-between bg-slate-100 dark:bg-black p-4 rounded-xl mt-2 border border-transparent focus-within:border-blue-500 transition-all">
            <TokenSelect value={receiveToken} onChange={setReceiveToken} options={["WAL", "SUI", "IKA", "WACKO"]} />
            <input type="number" value={receiveAmount} onChange={e => setReceiveAmount(+e.target.value)} className="bg-transparent text-right w-24 text-xl outline-none font-medium" />
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {sendAmount && receiveAmount ? `1 ${receiveToken} ≈ ${(sendAmount / receiveAmount).toFixed(4)} ${sendToken}` : ""}
          </div>
        </div>

        {/* SWAP BUTTON */}
        <button onClick={handleSwap} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
          {account ? "Confirm & Swap" : "Connect Wallet"}
        </button>
      </div>

      {/* POPUP */}
      {popupStatus && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl text-center shadow-2xl border dark:border-slate-800 animate-in fade-in zoom-in duration-200">
            {popupStatus === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="font-medium">Processing swap...</p>
              </div>
            )}
            {popupStatus === "success" && <p className="font-bold text-green-500">Swap successful!</p>}
            {popupStatus === "error" && <p className="font-bold text-red-500">Swap failed</p>}
          </div>
        </div>
      )}

      <TransactionHistory />
    </div>
  );
}
