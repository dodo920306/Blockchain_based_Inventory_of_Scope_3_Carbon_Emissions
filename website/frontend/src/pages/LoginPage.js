import React, { useContext , useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext'
import './LoginPage.css'

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)
    let {user, logoutUser} = useContext(AuthContext)
    const options = ["Org1", "Org2", "Org3"];

    const [selected, setSelected] = useState(options[0])


    const submitHandler = (e) => {
        let un = e.target.username.value
        if((un == 'org1minter' || un == 'org1admin' || un == 'org1spender' || un == 'org1user1') && selected != 'Org1'){
            alert('Username or password incorrect')
        } else if ((un == 'org2admin' || un == 'org2recipient' || un == 'org2user1') && selected != 'Org2'){
            alert('Username or password incorrect')
        } else if ((un == 'org3admin' || un == 'org3user1') && selected != 'Org3') {
            alert('Username or password incorrect')
        } else {
            loginUser(e);
        }
        
    }

    useEffect( () => { 
        logoutUser();
    }, [])

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
                    <input type="submit" id='submitButton'/>
                </form>
            </div>
        </div>
    )
}

export default LoginPage