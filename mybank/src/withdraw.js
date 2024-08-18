import React, {useState, useEffect} from "react";
import App from "./App";
import "./withdraw.css"
function Withdraw({onWithdraw,balance,balance2}){
    const [totalBalance, settotalBalance] = useState(0)
    const [account, setAccount] = useState(1)
    const [amountInput, setAmountInput]= useState(0);
    const [loadingWithdrawal, setLoadingWithdrawal] = useState(true);
    const [error, setError] = useState(null);
    

    const handleWithdraw = () => {
        const input = document.getElementById('Amount')
        const amountInput = parseFloat(input.value);
        let balance;
        if (account === 1) {
        balance = balance;
        } else {
        balance = balance2;
        }
        if ( isNaN(amountInput)|| amountInput <= 0 || amountInput > balance) {
            alert("Please enter a valid amount to withdraw.");
            return;
    }
   onWithdraw(account,amountInput);
   setAmountInput('')
   
};
    
    
    useEffect(()=> {
        if (amountInput === '')return; 
            setLoadingWithdrawal(true);
        fetch(`http://127.0.0.1:8000/withdraw/${amountInput}`)
        .then(response =>{
          if(!response.ok) {
                throw new Error('Network reponse not ok')
            }
            return response.json();
        })
        .then(data => {
            settotalBalance(data.amountInput)
            setLoadingWithdrawal(false);
           
        })
        .catch(error =>{
            setError(error.message);
            setLoadingWithdrawal(false);
           
    
        })
    
    }, [amountInput,onWithdraw]);
    if (loadingWithdrawal) return <div>Loading....</div>
    if (error) return <div>Error:{error}</div>
   
    return(
        <>
        <h2>Enter an Amount to Withdraw</h2>
        <div className="withdraw">
        <select value={account} onChange={(e) => setAccount(parseInt(e.target.value))}>
                <option value={1}> 1</option>
                <option value={2}> 2</option>
        </select>
        <br></br>
        <br></br>
        <input type="text" id="Amount" value={amountInput} 
        onChange={(e) => setAmountInput(e.target.value)}>
        </input>
        <br></br>
        <button type="button" onClick={handleWithdraw}>Withdraw</button>
        </div>
        <h2>Your Balance1 is: {balance}</h2>
        <h2>Your Balance2 is: {balance2}</h2>
        
        </>
        
    );
     
}
export default Withdraw;