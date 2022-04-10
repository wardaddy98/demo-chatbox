const express= require('express');
const knex= require('knex');
const bcrypt= require('bcrypt');
const cors= require('cors');

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'qwerty123',
      database : 'demo-chatroom'
}
});

// db('users').select('*').returning('*').then(data=>console.log(data));

const app= express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.json('hello');
})



app.post('/signup',(req,res)=>{

    bcrypt.hash(req.body.password,10,(err,hash)=>{

        if(err){
            res.status(500).json('error with hashing')
        }else{
            
            db.transaction(trx=>{
    
                db('login').insert({
                    username: req.body.username,
                    hash: hash
                }).returning('username')
                .then(user=>{
                    return db('users').insert({
                        name: req.body.name,
                        username: user[0].username
                    }).returning('*')
                    .then(user=>res.status(200).json({"status":"200", "username":user[0].username}))
                }).then(trx.commit)
                .catch(trx.rollback)
            })
            .catch(err=>res.json(err))
        }
    })
    
});


app.post('/signin',(req,res)=>{

    db('login').select('*').where({
        username:req.body.username
    }).returning('*')
    .then(data=>{
        bcrypt.compare(req.body.password,data[0].hash, (err,result)=>{
            if(result){
                res.status(200).json({"status":"200","username":data[0].username})
            }else{
                res.json('wrong credentials')
            }

            if(err){
                res.status(500).json('error with password check');
            }
        })
    })
    .catch(err=>{
        res.status(400).json('wrong credentials');
    })
})

app.post('/send',(req,res)=>{


    db('messages').insert({
        username:req.body.username,
        message: req.body.message,
        time: new Date()
    }).returning('*').
    then(data=>{
        res.status(200).json({"status":"200"});
    })
    .catch(err=>{
        res.status(500).json(err);
    })
})


app.get('/chatroom',(req,res)=>{


    db('messages').select('*').orderBy('time','asc')
    .returning('*')
    .then(chats=>{
        res.json(chats);
    })
    .catch(err=>{
        res.status(500).json('error while fetching chats');
    })
})


app.listen(3000,()=>{
    console.log('server is live');
})