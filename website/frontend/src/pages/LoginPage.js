import React, { useContext , useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext'
import './LoginPage.css'
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)
    let {user, logoutUser} = useContext(AuthContext)
    let {authTokens, logoutTokens} = useContext(AuthContext)
    const options = ["Org1", "Org2", "Org3"];

    const [selected, setSelected] = useState(options[0])
    const [mail, setMail] = useState('empty mail')
    const navigate = useNavigate();

    const fetchMail = async () => {
        try {
            const response = await fetch('http://10.8.2.183:8000/api/email', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            const data = await response.json()
            setMail(data.email)
            console.log("data: ", data.email)
        } 
        catch (error) {
            console.log("error", error)
        }
    };

    const submitHandler = (e) => {
        // let un = e.target.username.value
        // if((un == 'org1minter' || un == 'org1admin' || un == 'org1spender' || un == 'org1user1') && selected != 'Org1'){
        //     alert('Username or password incorrect')
        // } else if ((un == 'org2admin' || un == 'org2recipient' || un == 'org2user1') && selected != 'Org2'){
        //     alert('Username or password incorrect')
        // } else if ((un == 'org3admin' || un == 'org3user1') && selected != 'Org3') {
        //     alert('Username or password incorrect')
        // } else {

        loginUser(e);
        console.log('logged in')
            
        // }
    }

    useEffect( () => { 
        fetchMail();
        console.log('use effect user')
    }, [ user ])

    useEffect( () => {    
        chechOrg();
        if(mail=='') {
            logoutUser();
        }
        console.log('use effect email:', mail)
    }, [ mail ])

    const chechOrg = () => {
        if(user){
            console.log(mail)
            if(mail != `${selected}@gmail.com` ){
                logoutUser();
                setMail('');
                console.log('logged our')
                alert('Username or password incorrect')
            }
            else {   
                navigate('/');        
            }
        }
    }
    // useEffect( () => { 

    //     console.log('fetched mail');
    // }, [])

    return (
        <div className='loginContainer'>
            <div className='formContainer'>
                <p>LOGIN</p>
                <form onSubmit={submitHandler}>
                    <label for="organization">Organization</label>
                    <select name="organization" className='textInput' value={selected} onChange={e => {setSelected(e.target.value); console.log(selected)}}>
                    { options.map((value) => (
                        <option value={value} key={value}>{value}</option> 
                    ))}
                    </select>
                    <label for="username">Username</label>
                    <input type="text" className='textInput' name="username" placeholder="Enter Username" />
                    <label for="password">Password</label>
                    <input type="password" className='textInput' name="password" placeholder="Enter Password" />
                    <input type="submit" id='submitButton' value='Login'/>
                    <p id='signupLink'>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage