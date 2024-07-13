const express=require('express'); //is used to create server
const path=require('path'); //path allow us to know our html , css files location
const bodyParser=require('body-parser'); //body-parser allow us to send and receive data
const knex=require('knex');  //will allow us to access out databse

// for connection to local database
const db= knex({
    client:'pg',
    connection: {
        host : '127.0.0.1',
        user:'postgres',
        password:'apoorva21',
        database:'loginform'
    }
})

const app=express();
let initialpath=path.join(__dirname,"public");
app.use(bodyParser.json());
app.use(express.static(initialpath));

app.get('/',(req,res)=>{
    res.sendFile(path.join(initialpath,"index.html"));
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(initialpath,"login.html"));
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(initialpath,"register.html"));
})
// this is way to insert data in database
app.post('/register-user',(req,res)=>{
    const {name,email,password}=req.body;
    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    }else{
        db("users").insert({
            name:name,
            email:email,
            password:password
        })
        .returning(["name","email"])
        .then(data=>{
            res.json(data[0]);
        })
        .catch(err=>{
            if(err.detail.includes('already exits')){
                res.json('email already exits')
            }
        })
    }

})
app.post('/login-user',(req,res)=>{
    const{email,password}=req.body;

    db.select('name','email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data=>{
        if(data.length){
            res.json(data[0]);
        }else{
            res.json('email or password is incorrect')
        }
    })
    .catch(err => {
        // Handle database errors
        console.error('Error fetching data:', err);
    });
})

app.listen(3000,()=>{
    console.log('server is running on port 3000 .....');
}).on('error', (error) => {
    console.error('Error starting server:', error);
});