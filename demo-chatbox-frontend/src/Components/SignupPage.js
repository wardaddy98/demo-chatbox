import React, {useContext, useState} from 'react'
import AppContext from './AppContext';

const SignupPage=()=> {

    const [userNameField, setUserNameField]= useState('');
    const [nameField, setNameField]= useState('');
    const [passwordField, setPasswordField]= useState('');

    const {view,setView,setcurrentUser}= useContext(AppContext)

    const onNameChange=(event)=>{
        setNameField(event.target.value)
    }

    const onUserNameChange=(event)=>{
        setUserNameField(event.target.value)
    }

    const onPasswordChange=(event)=>{
        setPasswordField(event.target.value)
    }
    const onSigninClick=()=>{
        setView('signin')
    }

    const onRegister=()=>{
        
        fetch('http://localhost:3000/signup',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name:nameField,
                username:userNameField,
                password:passwordField
            })
        }).then(response=>response.json())
            .then(res=>{
            if(res.status == 200){
                setView('chat-room')
                setcurrentUser(res.username)
            }
        })
    }


  return (
    <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw8 center">
        
    <main className="pa4 black-80">
        <form className="measure ">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f4 fw6 ph0 mh0">Register</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" for="name">Name</label>
            <input onChange={onNameChange}  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
        </div>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" for="user-name">User Name</label>
            <input onChange={onUserNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="user-name"/>
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f6" for="password">Password</label>
            <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
        </div>
        </fieldset>
        <div className="">
            
        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"  type="button" value="Register" onClick={onRegister}/>
        </div>

        <div className="lh-copy mt3">
            <a href="#0" className="f6  fw6 link dim black db ba pointer pa1" onClick={onSigninClick}>Signin Instead</a>    
        </div>
    
    </form>
</main>
</article>
  )
}

export default SignupPage