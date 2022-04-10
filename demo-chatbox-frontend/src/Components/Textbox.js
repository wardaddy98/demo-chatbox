import { Box, Button, TextField} from '@mui/material'
import React, {useState, useContext} from 'react'
import AppContext from './AppContext';

const Textbox=()=> {

    const [text, setText]= useState('');

    const {currentUser, setChatData}= useContext(AppContext);

    const onTextChange=(event)=>{
        setText(event.target.value)
    }

    const onMessageSend=()=>{

      fetch('http://localhost:3000/send',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          username: currentUser,
          message:text
        })
      }).then(response=>response.json())
      .then(res=>{

        if(res.status == 200){
          fetch('http://localhost:3000/chatroom')
          .then(res=>res.json())
          .then(data=>setChatData(data))
        }

      })
    }
  


  return (
      <Box my={3} >
        <Box>
          <TextField sx={{borderRadius:'10px'}} multiline={true} rows={3} id="filled-basic" label="Type Your Message" variant="filled" fullWidth onChange={onTextChange}/>
        </Box>

        <Box mt={1} m={2} >
          <Button sx={{border:'1px solid black'}} variant="contained" size='large' onClick={onMessageSend}>Send</Button>
        </Box>

    </Box>
  )
}

export default Textbox;