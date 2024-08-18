import React,{useState} from "react";
function Transfer({balance, balance2, onTransfer, }){
const[takenAccount, setTakenAccount] = useState(1);
const[givenAccount, setGivenAccount] = useState(2);
const [funds, setFunds] = useState('');


const Transferfund = () =>{
    const amount = parseFloat(funds);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (takenAccount === givenAccount) {
        alert("Cannot transfer to the same account.");
        return;
    }

    if ((takenAccount === 1 && amount > balance) || (takenAccount === 2 && amount > balance2)) {
        alert("Insufficient funds.");
        return;
    }

    onTransfer(takenAccount, givenAccount, amount);
    setFunds('');
};
    return(
        <div>
            <h2>Transfer Funds</h2>
            <div>
                <label>From Account: </label>
                <select value={takenAccount} onChange={(e) => setTakenAccount(parseInt(e.target.value))}>
                    <option value={1}>Account 1</option>
                    <option value={2}>Account 2</option>
                </select>
            </div>
            <div>
                <p></p>
            </div>
            <div>
                <label>To Account: </label>
                <select value={givenAccount} onChange={(e) => setGivenAccount(parseInt(e.target.value))}>
                    <option value={1}>Account 1</option>
                    <option value={2}>Account 2</option>
                </select>
            </div>
            <div>
            <p></p>
                <label>Amount: </label>
                <input type="text" value={funds} onChange={(e) => setFunds(e.target.value)} />
                <p></p>
            </div>
            <button type="button" onClick={Transferfund}>Transfer</button>
            <h2>Your Balance 1 is: {balance}</h2>
            <h2>Your Balance 2 is: {balance2}</h2>
        </div>
    );
}
export default Transfer