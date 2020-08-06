const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

const database = {
	users:[
	{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries:0,
		joined:new Date()
	},
	{
		id: '124',
		name: 'Sally',
		email: 'Sally@gmail.com',
		password: 'bananas',
		entries:0,
		joined:new Date()
	}],
	login:[
	{
		id:'',
		hash:'',
		email:'john@gmail.com'
	}
	]
}

app.get('/',(req,res)=>{
	res.send(database.users)
})


app.post('/signin',(req,res)=>{
	if(req.body.email === database.users[0].email&&
		req.body.password=== database.users[0].password){
		res.json(database.users[0])
	}else{
		res.status(400).json('error logging in');
	}
	res.json('signing in')
})

app.post('/register',(req,res)=>{
	const {email,name,password} = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries:0,
		joined:new Date()

	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res)=>{
	const{id} = req.params;
	let found = false;
	database.users.forEach(user =>{
		if(user.id === id){
			found=true;
			return res.json(user);
		}
		
	})

	if(!found){
		res.status(400).json('not found')
	}



})

app.put('/image',(req,res)=>{
	const{id} = req.body;
	let found = false;
	database.users.forEach(user=>{
		if(user.id===id){
			found=true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(400).json('not found');
	}
})




app.listen(3000,()=>{
	console.log('app is running on port 3000')
});

/*
/we have set our endpoints, the http method we will use , and what will be the response to these requests

/-->res = this is working
/signin route --> POST request ---> will respond with success/fail
/register ---> POST = new user object will be returned to server for registration
/profile/:userId ----> GET = user
/image ----> PUT ----> updated user object


*/