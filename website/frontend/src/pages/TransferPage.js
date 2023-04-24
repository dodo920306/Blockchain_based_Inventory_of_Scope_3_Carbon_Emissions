import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './TransferPage.css'

const TransferPage = () => {
    
    let {authTokens, logoutTokens} = useContext(AuthContext)
    let {user, logoutUser} = useContext(AuthContext)

    const [balance, setBalance] = useState(null)

    const [clientID, setClientID] = useState(null)
    const [showClientID, setShowClientID] = useState(false)

    const [totalSupply, setTotalSupply] = useState(null)
    const [showSupply, setShowSupply] = useState(false)

    const [balanceOf, setBalanceOf] = useState(null)
    const [balanceOfAccount, setBalanceOfAccount] = useState(null)
    const [showBalanceOf, setShowBalanceOf] = useState(false)


    const [transferRecipient, setTransferRecipient] = useState(null)
    const [transferAmount, setTransferAmount] = useState(null)
    const [showTransfer, setShowTransfer] = useState(false)
    const [transferStatus, setTransferStatus] = useState(null)

    const [approveSpender, setApproveSpender] = useState(null)
    const [approveValue, setApproveValue] = useState(null)
    const [approveStatus, setApproveStatus ] = useState(null)
    const [showApprove, setShowApprove] = useState(false)

    const [allowanceOwner, setAllowanceOwner] = useState(null)
    const [allowanceSpender, setAllowanceSpender] = useState(null)
    const [allowanceStatus, setAllowanceStatus] = useState(null)
    const [showAllowance, setShowAllowance] = useState(false)

    const [tfFrom, setTfFrom] = useState(null)
    const [tfTo, setTfTo] = useState(null)
    const [tfValue, setTfValue] = useState(null)
    const [tfStatus, setTfStatus] = useState(null)
    const [showTf, setShowTf] = useState(false)

    const fetchBalance = async () => {
        try {
            const response = await fetch('http://10.8.2.183:8000/api/query/?cmd=clientAccountBalance', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            console.log(AuthContext)
            const data = await response.json()
            console.log("user balance:", data)
            setBalance(data.result)
            console.log("balance all :", balance)
            // console.log("balance: ", balance[2])
        } 
        catch (error) {
            console.log("error", error)
        }
    };

    const fetchClientID = async () => {
        try {
            const response = await fetch('http://10.8.2.183:8000/api/query/?cmd=clientAccountID', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            const data = await response.json()
            setClientID(data.result)
            console.log("clientID: ", clientID)
        } 
        catch (error) {
            console.log("error", error)
        }
    };

    const fetchTotalSupply = async () => {
        try {
            const response = await fetch('http://10.8.2.183:8000/api/query/?cmd=totalSupply', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            const data = await response.json()
            setTotalSupply(data.result)
            console.log("total supply: ", totalSupply)
        } 
        catch (error) {
            console.log("error", error)
        }
    };

    const fetchBalanceOf = async () => {
        try {
            const response = await fetch(`http://10.8.2.183:8000/api/query/?cmd=balanceOf%20${balanceOfAccount}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })            
            const data = await response.json()
            console.log('data: ', data)
            if(data.result=='Failed.') {
                setBalanceOf('Failed, please try again.')
            }else{
                setBalanceOf(data.result)
            }
            console.log("balance of: ", balanceOf)
        } 
        catch (error) {
            console.log("error", error)
        }
    };

    const fetchTransfer = async () => {
        try {
            const response = await fetch(`http://10.8.2.183:8000/api/query/?cmd=transfer%20${transferRecipient}%20${transferAmount}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })            
            const data = await response.json()
            console.log('transfer data: ', data)
            setTransferStatus(data.result)
        } 
        catch (error) {
            console.log("error", error)
        }
    };

    const fetchApprove = async () => {
        try {
            const response = await fetch(`http://10.8.2.183:8000/api/query/?cmd=approve%20${approveSpender}%20${approveValue}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })            
            const data = await response.json()
            console.log('approve data: ', data)
            setApproveStatus(data.result)
        } 
        catch (error) {
            console.log("error", error)
        }
    }

    const fetchAllowance = async () => {
        try {
            const response = await fetch(`http://10.8.2.183:8000/api/query/?cmd=allowance%20${allowanceOwner}%20${allowanceSpender}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })            
            const data = await response.json()
            console.log('allowance data: ', data)
            setAllowanceStatus(data.result)
        } 
        catch (error) {
            console.log("error", error)
        }
    }

    const fetchTransferFrom = async () => {
        try {
            const response = await fetch(`http://10.8.2.183:8000/api/query/?cmd=transferFrom%20${tfFrom}%20${tfTo}%20${tfValue}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })            
            const data = await response.json()
            console.log('transferFrom data: ', data)
            setTfStatus(data.result)
        } 
        catch (error) {
            console.log("error", error)
        }
    }

    const balanceOfAccountHandler = (e) => {
        setBalanceOfAccount(e.target.value);
        console.log('balance of changed: ', balanceOfAccount)
    }

    const balanceOfHandler = (e) => {
        fetchBalanceOf(balanceOf);
    }

    useEffect(() => {
        
        fetchBalance(); // on first render, refresh
        fetchClientID();
        fetchTotalSupply();
        console.log("env: ", user.username)

        const interval = setInterval(() => {
            fetchBalance();
        }, 1000000); /* 10000 ten sec*/
        return () => clearInterval(interval);

    }, [])



    const transferRecipientHandler = (e) => {
        setTransferRecipient(e.target.value);
        console.log('transfer reciever changed')
    }
    const transferAmountHandler = (e) => {
        setTransferAmount(e.target.value);
        console.log('transfer amount changed')
    }

    const transferHandler = async () => {
        try {
            fetchTransfer();
        } catch (error) {
            console.log(error);
        }
    }

    const approveSenderHandler = (e) => {
        setApproveSpender(e.target.value);
    }
    const appoveValueHandler = (e) => {
        setApproveValue(e.target.value);
    }

    const approveHandler = async () => {
        try {
            fetchApprove();
        } catch (error) {
            console.log(error);
        }
    }

    const allowanceOwnerHandler = (e) => {
        setAllowanceOwner(e.target.value);
    }
    const allowanceSpenderHandler = (e) => {
        setAllowanceSpender(e.target.value);
    }
    const allowanceHandler = async () => {
        try {
            fetchAllowance();
        } catch (error) {
            console.log(error);
        }
    }

    const tfFromHandler = (e) => {
        setTfFrom(e.target.value);
    }
    const tfToHandler = (e) => {
        setTfTo(e.target.value);
    }
    const tfValueHandler = (e) => {
        setTfValue(e.target.value);
    }
    const tfHandler = async () => {
        try {
            fetchTransferFrom();
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <div className='transferContainer'>
        <div className='functionsContainer'>
            <div className='funcDropContainer' >
                <div className='funcItemContainer' onClick={ () => { 
                            setBalanceOfAccount(null); 
                            setBalanceOf("");
                            setShowBalanceOf(!showBalanceOf);
                        } } >
                    <i class='fa fa-search' ></i>
                    <p>Search the balance of an account</p>                
                </div>
                { showBalanceOf && 
                    (   
                        <div className='infoContainer'>
                            <div className='infoItemContainer'>
                                <input onChange={ balanceOfAccountHandler } placeholder='Account'></input>
                            </div>
                            <div className='infoItemContainer'>
                                <button id='transferFunc' onClick={ balanceOfHandler } >Submit</button>
                            </div>
                            <div className='resultContainer'>{ balanceOf }</div>
                        </div>
                    )
                }
            </div>
            <div className='funcDropContainer'>
                <div className='funcItemContainer'
                    onClick={ () => { 
                        setTransferRecipient(null); 
                        setTransferAmount(null);
                        setShowTransfer(!showTransfer) 
                        setTransferStatus(null);
                    } } >
                    <i class="fa fa-send"></i>
                    <p>Send tokens to recipient account</p>
                </div>
                {
                    showTransfer && 
                    (
                        <div className='infoContainer'>
                            <div className='infoItemContainer'>
                                <input onChange={ transferRecipientHandler } placeholder='Recipient Address'></input>
                                <input onChange={ transferAmountHandler } placeholder='Transfer Amount'></input>
                            </div>
                            <div className='infoItemContainer'>
                                <button id='transferFunc' onClick={ transferHandler } >Submit</button>
                            </div>
                            <div className='resultContainer'>{ transferStatus }</div>
                        </div>
                    )
                }
            </div>
            <div className='funcDropContainer'>
                <div className='funcItemContainer'
                    onClick={ () => { 
                        setApproveSpender(null); 
                        setApproveValue(null);
                        setShowApprove(!showApprove) 
                        setApproveStatus(null);
                    } }>
                    <i class="fa-solid fa-user-check"></i>
                    <p>Allow an account to withdraw from your account</p>
                </div>
                {
                    showApprove && 
                    (
                        <div className='infoContainer'>
                            <div className='infoItemContainer'>
                                <input onChange={ approveSenderHandler } placeholder='Address'></input>
                                <input onChange={ appoveValueHandler } placeholder='Value'></input>
                            </div>
                            <div className='infoItemContainer'>
                                <button id='transferFunc' onClick={ approveHandler } >Submit</button>
                            </div>
                            <div className='resultContainer'>{ approveStatus }</div>
                        </div>
                        
                    )
                }
            </div>
            <div className='funcDropContainer'>
                <div className='funcItemContainer' 
                    onClick={ () => { 
                        setAllowanceOwner(null); 
                        setAllowanceSpender(null);
                        setShowAllowance(!showAllowance) 
                        setAllowanceStatus(null);
                    } }>
                    <i class="fa-sharp fa-solid fa-coins" ></i>
                    <p>Search for the amount still available for the client account to withdraw from the owner account</p>
                </div>
                {
                    showAllowance && 
                    (
                        <div className='infoContainer'>
                            <div className='infoItemContainer'>
                                <input onChange={ allowanceOwnerHandler } placeholder='Owner Address'></input>
                                <input onChange={ allowanceSpenderHandler } placeholder='Client Address'></input>
                            </div>
                            <div className='infoItemContainer'>
                                <button id='transferFunc' onClick={ allowanceHandler } >Submit</button>
                            </div>
                            <div className='resultContainer'>{ allowanceStatus }</div>
                        </div>
                        
                    )
                }
            </div>
            <div className='funcDropContainer'>
                <div className='funcItemContainer'
                    onClick={ () => { 
                        setTfFrom(null); 
                        setTfTo(null);
                        setTfValue(null);
                        setShowTf(!showTf) 
                        setTfStatus(null);
                    } }>
                    <i class="fa-solid fa-money-bill-transfer"></i>
                    <p>Transfer the value amount from a specific account to another</p>
                </div>
                {
                    showTf && 
                    (
                        <div className='infoContainer'>
                            <div className='infoItemContainer'>
                                <input onChange={ tfFromHandler } placeholder='From address'></input>
                                <input onChange={ tfToHandler } placeholder='To address'></input>
                                <input onChange={ tfValueHandler } placeholder='Value'></input>
                            </div>
                            <div className='infoItemContainer'>
                                <button id='transferFunc' onClick={ tfHandler } >Submit</button>
                            </div>
                            <div className='resultContainer'>{ tfStatus }</div>
                        </div>
                    )
                }
            </div>
        </div>
      </div>
    )
  }
  
  export default TransferPage

//   <div className='funcItemContainer'>
//   <button onClick={ () => setShowClientID(!showClientID) } >Your ID</button>
//   <p>Your membership account ID</p>
// </div>
// { showClientID && 
//   (   
//       <div className='singleInfoContainer' id='clientID'>{ clientID }</div> 
//   )
// }
// <div className='funcItemContainer'>
//   <button onClick={ () => { fetchTotalSupply(); setShowSupply(!showSupply) } } >Total Supply</button>
//   <p>The total supply number of carbon tokens</p>
// </div>
// { showSupply && 
//   (   
//       <div className='singleInfoContainer'>{ totalSupply }</div> 
//   )
// }
