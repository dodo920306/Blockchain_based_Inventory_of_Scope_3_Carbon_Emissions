import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './HomePage.css'
import { useLocation } from 'react-router-dom'
import TransactionItem from '../components/TransactionItem'

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutTokens} = useContext(AuthContext)
    let {user, logoutUser} = useContext(AuthContext)
    const location = useLocation()
    const currDirection = new URLSearchParams(location.search).get("direction");

    const [balance, setBalance] = useState(null)

    const [clientID, setClientID] = useState(null)
    const [showClientID, setShowClientID] = useState(false)
    const [croppedID, setCroppedID] = useState(null)

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

    const [tx, setTx] = useState(null)
    const [txMap, setTxMap] = useState(null)

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
            console.log("home clientID: ", clientID)
            setCroppedID(sliceID(data.result))
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
            setBalanceOf(data.result)
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

    const fetchTX = async () => {
        try {
            const response = await fetch(`http://10.8.2.183:8000/api/tx/`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })            
            const data = await response.json()
            console.log("tx: ", data.output.length)
            setTx(data.output)
            setTxMap(data.output.slice(data.output.length-10,data.output.length).reverse().map((value) => {
                return <TransactionItem TransactionID={value.TransactionID} 
                    BlockNumber={value.BlockNumber} 
                    EventName={value.EventName} 
                    From={value.Payload.from} 
                    To={value.Payload.to} 
                    Value={value.Payload.value}/>;
            }));
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
        fetchTX();
        console.log("env: ", user.username)
        console.log("env: ", user.groups)

        const interval = setInterval(() => {
            fetchBalance();
        }, 1000000); /* 10000 ten sec*/
        return () => clearInterval(interval);

    }, [])



    // useEffect(() => {
    //     fetchTX();
    // }, [location])

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

    const sliceID = (input) => {
        return input.length > 10 ? `${input.substring(0, 5)}...${input.substring(input.length-5, input.length)}` : input;
    }

    const unsecuredCopyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Unable to copy to clipboard', err);
        }
        document.body.removeChild(textArea);
    }

    return (
      <div className='homeContainer'>
        <div className='dashContainer'>
            <div className='tokenContainer'>
                <p id='balanceTitle'>Carbon Tokens:</p>
                <p id='tokenNumber'>{ balance }</p>
                {/* <p id='tokenUnit'>carbon tokens</p> */}
            </div>
            <div className='supplyContainer'>
                <p id='supplyTitle'>Total Supply: </p>
                <p id='supplyDisplay'>{ totalSupply }</p>
            </div>
            <div className='idContainer'>
                <p id='idTitle'>Member ID: </p>
                <p id='idDisplay'>{ croppedID }</p>
                <button id='copyButton' 
                    onClick={ () => { 
                        unsecuredCopyToClipboard(clientID);
                        console.log("cl");
                    } }>
                    <i class="fa fa-copy"></i>
                </button>
                <div className='tipCopy'>
                    Copy
                </div>
            </div>
        </div>
        <div className='transactionsContainer'>
            <p id='txTitle'>Recent Transactions</p>
            <li className='colTitle'>
				<span>Transaction ID</span>
				<span>Event</span>
				<span>From</span>
				<span>To</span>
                <span>Value</span>
			</li>
            { txMap }
        </div>
      </div>
    )
  }
  
  export default HomePage

  /*

      useEffect(()=> {
        getNotes()
    }, [])

    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        
    }



        <ul>
        {notes.map(note => (
            <li key={note.id} >{note.body}</li>
        ))}
        </ul>
  
   */

/*
org1 minter eDUwOTo6Q049bWludGVyLE9VPWNsaWVudCxPPUh5cGVybGVkZ2VyLFNUPU5vcnRoIENhcm9saW5hLEM9VVM6OkNOPWNhLm9yZzEuZXhhbXBsZS5jb20sTz1vcmcxLmV4YW1wbGUuY29tLEw9RHVyaGFtLFNUPU5vcnRoIENhcm9saW5hLEM9VVM=
org1 user1 eDUwOTo6Q049b3JnMWFkbWluLE9VPWFkbWluLE89SHlwZXJsZWRnZXIsU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUzo6Q049Y2Eub3JnMS5leGFtcGxlLmNvbSxPPW9yZzEuZXhhbXBsZS5jb20sTD1EdXJoYW0sU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUw==
*/