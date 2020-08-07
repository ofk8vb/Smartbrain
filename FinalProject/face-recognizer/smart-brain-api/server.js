const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')

const db = knex({
	client:'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password:'test',
		database: 'smart-brain'
	}

});

db.select('*').from('users').then(data => {
	console.log(data);
});



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
	const hash= bcrypt.hashSync(password);
		db.transaction(trx=>{
			trx.insert({
				hash:hash,
				email:email
			})
			.into('login')
			.returning('email')
			.then(loginEmail=>{
				return db('users')
					.returning('*')
					.insert({
					email:loginEmail[0],
					name:name,
					joined:new Date()
				})
				.then(user=>{
					res.json(user[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})	
		.catch(err=>res.status(400).json('unable to register'))
})

app.get('/profile/:id',(req,res)=>{
	const{id} = req.params;
	db.select('*').from('users').where({
		id: id
	}).then(user=>{
		console.log(user)
		if(user.length){
			res.json(user[0]);
		}else{
			res.status(400).json('error getting user')
		}
		
	}).catch(err => res.status(400).json('error getting user'))
	// if(!found){
	// 	res.status(400).json('not found')
	// }



})

app.put('/image',(req,res)=>{
	const{id} = req.body;
	
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);

	})
	.catch(err => res.status(400).json('unable to get entries'))
	
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