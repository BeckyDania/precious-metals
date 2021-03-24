require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT
const axios = require('axios')

const url_api = `https://metals-api.com/api/latest?access_key=${process.env.API_KEY}&base=XAU&symbols=USD`;


const metalsControllers = require('./controllers/metals.js')


// Set up Database
const mongoose = require('mongoose');

// include the method-override package
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

//preciousMetals - name of the database
const mongoURI = process.env.MONGODBURI

const db = mongoose.connection;

mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("database connection checked");
})

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")})
db.on('disconnected', ()=> { console.log("mongo disconnected")})

//MIDDLEWARES

app.use(express.static('public'))

app.use(express.json())

app.use(express.urlencoded({extended:true}));


app.use((req, res, next) => {
	console.log('HELLO, I am custom middleware, every request passes through me')
	console.log("Think: like a bouncer at a club")
	console.log("Here is req", req.body)
	next() // this sends the request on to the next step in the process
  })

// this will parse the data and create the "req.body" object
//AKA Body Parser
app.use(express.urlencoded({extended:true}));



app.listen(PORT, ()=>{
    console.log('Server listening');
});
//custom middleware - everyrequest passes through 
//configure - pass single callback - req, res, next - code makes the api call - data - set res.locals - a obj holds all local variables pass into a template when render it 

app.use(async (req, res, next)=>{
	try
	{
	const urlAPI = await axios.get(url_api)
	//console.log(urlAPI.data.rates)

	const currentRates = urlAPI.data.rates
	//console.log(currentRates.USD)
    const goldRate = currentRates.USD
    //console.log(goldRate)
    //console.log(Object.values(currentRates))
    //const goldRate = Object.values(currentRates)
    //console.log(Object.values(goldRate[0]))
  //  console.log(typeof goldRate)
	
res.locals.goldRate = goldRate
app.locals.price = goldRate	
 //import the header into index.ejs
 // worse come to repeat the code


	}catch(err){
		console.error(err)
	}
next()

})

app.use('/metals', metalsControllers);

//localhost:3030/metals/new