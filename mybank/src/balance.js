import App from "./App";
import React,{useState,useEffect} from 'react'
import "./balance.css";

function BalanceAmount({balance,balance2}){
    const [transaction, setTransaction] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=> {
        fetch('http://127.0.0.1:8000/transaction')
        .then(response =>{
          if(!response.ok) {
                throw new Error('Network reponse not ok')
            }
            return response.json();
        })
        .then(data => {
            setTransaction(data);
            setLoading(false);
        })
        .catch(error =>{
            setError(error.message);
            setLoading(false);

        })
    }, []);
    if (loading) return <div>Loading....</div>
    if (error) return <div>Error:{error}</div>
    return(
        <>
        <h2>Your Balance is: {balance}</h2>
        <h2>Your Balance2 is: {balance2}</h2>
        <h2>Transaction Details</h2>
        <div>
        <table id="transaction">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.account}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        
        
        
        </>
    );
}
export default BalanceAmount;