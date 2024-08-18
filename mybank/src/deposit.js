import React,{useState, useEffect} from "react";
import "./withdraw.css"

function Deposite({onDeposit,balance}){
    const [totalBalance, settotalBalance] = useState(0)
    const [amount1, setAmount] = useState(totalBalance)
    const [loadingDeposit, setLoadingDeposit] = useState(true);
    const [error, setError] = useState(null);

    const handleDeposit = () => {
        const input = document.getElementById('Amount')
        const amount1 = parseFloat(input.value);
        if (isNaN(amount1) || amount1 <= 0 || amount1 > balance) {
            alert("Please enter a valid amount to deposit.");
            return;
        }
     onDeposit(amount1);
     setAmount('');

    }
    
    
     
    useEffect(()=> {
        if (amount1 === '') return;

        setLoadingDeposit(true)
        fetch(`http://127.0.0.1:8000/deposit/${amount1}`)
        .then(response =>{
          if(!response.ok) {
                throw new Error('Network reponse not ok')
            }
            return response.json();
        })
        .then(data => {
          settotalBalance(data.amount1)
            setLoadingDeposit(false);
        })
        .catch(error =>{
            setError(error.message);
            setLoadingDeposit(false);
  
        })
    }, [amount1, onDeposit]);
    if (loadingDeposit) return <div>Loading....</div>
    if (error) return <div>Error:{error}</div>
  
   return(
    <>
    <div className="deposit">
        <h2>Enter an Amount to Deposit</h2>
        <input type="text" id="Amount" value={amount1} onChange={(e) => setAmount(e.target.value)}></input><br></br>
        <button type="button" onClick={handleDeposit}>Deposit</button>
        <h2>Your Balance is: {balance}</h2>
        </div>
        
    </>
   );
}
export default Deposite