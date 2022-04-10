import { Paper, Box, Button} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from './AppContext'
import ChatBubble from './ChatBubble';
import Textbox from './Textbox';

const Chatroom=()=> {

const {chatData,setChatData, setcurrentUser, setView}= useContext(AppContext);


const getChatData=async()=>{
    fetch('http://localhost:3000/chatroom')
    .then(res=>res.json())
    .then(data=>setChatData(data));
}

const onLogout=()=>{
    setView('signin');
    setcurrentUser(null);
}

useEffect(()=>{
    getChatData();
},[])


        if(chatData){
            return (
                <Box mx={2} my={1}>
                    <Box sx={{background: '#0F2027',background: '-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)',background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)', borderRadius:'6px', color:'whitesmoke'}} mt={0} py={3} px={5}>
                        <Box>
                            <h2 align='center'>Demo Chat-Room</h2>
                        </Box>

                        <Box >
                            <Button variant="outlined" sx={{color:'white'}} onClick={onLogout}>Log out</Button>
                        </Box>
                    </Box>
                 

                    <Paper elevation={5} sx={{background: '#bdc3c7', background: '-webkit-linear-gradient(to right, #2c3e50, #bdc3c7)', background: 'linear-gradient(to right, #2c3e50, #bdc3c7)',}}>

                        <Box display={'flex'} flexDirection={'column'} >
                        {
                            chatData.map((chat,index)=>{
                                return <ChatBubble chat={chat} key={index} user={chat.username}/>
                            })
                        }
                        </Box>

                    </Paper>

                    <Textbox/>
                </Box>
              )
        }else{
            return(<h1>loading</h1>)
        }

}

export default Chatroom

// background: '#bdc3c7', background: '-webkit-linear-gradient(to right, #2c3e50, #bdc3c7)', background: 'linear-gradient(to right, #2c3e50, #bdc3c7)',
