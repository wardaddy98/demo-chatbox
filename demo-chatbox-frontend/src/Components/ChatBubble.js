import { Box, Card, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React,{useContext} from 'react';
import AppContext from './AppContext';

const useStyles= makeStyles({
    bubblesLeft:{
        alignSelf:'flex-start',
        background:'#dae5f7',
        maxWidth:'40%',
        borderRadius:'10px',
        border:'2px solid black',
        overflowWrap: 'break-word'
    },

    bubblesRight:{
        alignSelf:'flex-end',
        background:'#dae5f7',
        maxWidth:'40%',
        borderRadius:'10px',
        border:'2px solid black',
        overflowWrap: 'break-word'
    }
})

const ChatBubble=({chat,user})=> {

    const {currentUser}= useContext(AppContext); 

  const classes= useStyles();

if(user == currentUser){
    return (
        <Box className={classes.bubblesRight} my={3} mr={3}> 
            <Box p={2}>
                <Typography variant='subtitle1'>{chat.message}</Typography>
                <Typography color="blue" variant='subtitle2'>{chat.username}</Typography>
                <Typography variant='subtitle2'>{chat.time}</Typography>  
            </Box>
        </Box>
      )
}else{
    return (
        <Box className={classes.bubblesLeft} my={3} ml={3}>  
            <Box p={2}>
                <Typography variant='subtitle1'>{chat.message}</Typography>
                <Typography color="blue" variant='subtitle2'>{chat.username}</Typography>
                <Typography variant='subtitle2'>{chat.time}</Typography> 
            </Box>
        </Box>
      )
}

}

export default ChatBubble