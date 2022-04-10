import './App.css';
import LoginPage from './Components/LoginPage';
import 'tachyons';
import SignupPage from './Components/SignupPage';
import AppContext from './Components/AppContext';
import Chatroom from './Components/Chatroom'
import { useState } from 'react';

const App=()=>{

  const [view,setView]= useState('signin');
  const [chatData, setChatData]= useState(null);
  const [currentUser, setcurrentUser]= useState(null);



return(
  <>
  <AppContext.Provider value={{view,setView,currentUser, setcurrentUser, chatData, setChatData}}>

    {
      (view==='signin')&&(
          <LoginPage/>
      )
    }

    {
      (view ==='signup')&& (
        <SignupPage/>
      )
    }

    {
      (view === 'chat-room')&&(
        <Chatroom/>
      )
    }
  </AppContext.Provider>
</>
)

}

export default App;
