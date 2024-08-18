import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Withdraw from "./withdraw";
import Deposite from "./deposit";
import BalanceAmount from "./balance";
import Transfer from "./transfer";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBalance, settotalBalance] = useState(0);
  const [totalBalance2, settotalBalance2] = useState(2000);

  const Withdrawal = (account, amount) => {
    if (account === 1) {
      settotalBalance((NewBalance) => NewBalance - amount);
    } else {
      settotalBalance2((NewBalance) => NewBalance - amount);
    }
  };

  const Deposit = (account, amount1) => {
    if (account === 1) {
      settotalBalance((NewBalance) => NewBalance + amount1);
    } else {
      settotalBalance2((NewBalance) => NewBalance + amount1);
    }
  };

  const Transferfund = (takenAccount, givenAccount, amount) => {
    if (takenAccount === 1 && givenAccount === 2) {
      settotalBalance((balance) => balance - amount);
      settotalBalance2((balance2) => balance2 + amount);
    } else if (takenAccount === 2 && givenAccount === 1) {
      settotalBalance2((balance2) => balance2 - amount);
      settotalBalance((balance) => balance + amount);
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/totalbalance")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network reponse not ok");
        }
        return response.json();
      })
      .then((data) => {
        settotalBalance(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error:{error}</div>;

  return (
    <div className="App">
      <Router>
        <div className="App">
          <nav>
            <ul className="title">
              <img src={"./Agribank_logo_.jpg"} />
              <h2>Welcome to my Bank</h2>
              <li>
                <Link to="/">Withdrawal</Link>
              </li>
              <li>
                <Link to="/balance">Balance</Link>
              </li>
              <li>
                <Link to="/deposit">Deposit</Link>
              </li>
              <li>
                <Link to="/transfer">Transfer</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Withdraw
                onWithdraw={Withdrawal}
                balance={totalBalance}
                balance2={totalBalance2}
              />
            }
          />
          <Route
            path="/deposit"
            element={<Deposite onDeposit={Deposit} balance={totalBalance} />}
          />
          <Route
            path="/balance"
            element={
              <BalanceAmount balance={totalBalance} balance2={totalBalance2} />
            }
          />
          <Route
            path="/transfer"
            element={
              <Transfer
                onTransfer={Transferfund}
                balance={totalBalance}
                balance2={totalBalance2}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
