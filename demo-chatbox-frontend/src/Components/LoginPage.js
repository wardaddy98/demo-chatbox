import { Box } from '@mui/system'
import React, { useState, useContext} from 'react'
import AppContext from './AppContext';

const LoginPage=()=>{

    const [userNameField, setUserNameField]= useState('');
    const [passwordField, setPasswordField]= useState('');

    const {view, setView, setcurrentUser}= useContext(AppContext);

    const onUserNameChange=(event)=>{
        setUserNameField(event.target.value);
    }

    const onPasswordChange=(event)=>{
        setPasswordField(event.target.value);
    }

    const onRegisterClick=()=>{
        setView('signup');
    }

    const onSignin=()=>{
        
        fetch('http://localhost:3000/signin',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                username: userNameField,
                password:passwordField
            })
        }).then(response=>{
            return response.json()
        })
        .then(res=>{
            if(res.status == 200){
                setView('chat-room');
                setcurrentUser(res.username);
            }
        })
    }


  return (
      <Box pt={10}>
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw8 center">
                
                <main className="pa4 black-80 ">
                    <form className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="user-name">User Name</label>
                        <input onChange={onUserNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="user-name"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign In" onClick={onSignin}/>
                    </div>
                    <div className="lh-copy mt3">
                    <a href="#0" className="f6  fw6 link dim black db ba pointer pa1" onClick={onRegisterClick}>Register</a>
                    
                    </div>
                </form>
            </main>
        </article>
</Box>
  )
}

export default LoginPage