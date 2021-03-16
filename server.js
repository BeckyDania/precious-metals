const express = require('express');
const app = express();
const PORT = 3030
const Metal = require('./models/metals')

// Set up Database
const mongoose = require('mongoose');

// include the method-override package
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

//preciousMetals - name of the database
const mongoURI = "mongodb://127.0.0.1:27017/preciousMetals"

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

app.use((req, res, next) => {
	console.log('HELLO, I am custom middleware, every request passes through me')
	console.log("Think: like a bouncer at a club")
	console.log("Here is req", req.body)
	next() // this sends the request on to the next step in the process
  })

// this will parse the data and create the "req.body" object
//AKA Body Parser
app.use(express.urlencoded({extended:true}));

// CONTROLLERS

// Index Route
app.get('/metals', (req, res)=>{
	Metal.find({}, (err, allMetals) =>{
		res.render('index.ejs', {
			metals: allMetals
		})
	})
});

// NEW Route
app.get('/metals/new', (req, res)=>{
    res.render('new.ejs');
});

// SHOW Route
app.get('/metals/:id', (req, res)=>{
    Metal.findById(req.params.id, (err, foundMetal)=>{
        res.render('show.ejs', {
			metal: foundMetal
		});
		
    });
});

// POST Route - "Create"
app.post('/metals', (req, res)=>{
	Metal.create(req.body, (err, createdMetal) =>{
		if(err){
			console.log(err);
			res.send(err)

		} else {
			//res.send(createdMetal);
			console.log(createdMetal)
			res.redirect('/metals')
		}
	})
    
});

app.delete('/metals/:id', (req, res)=>{
	Metal.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/metals') 
    })
})




app.listen(PORT, ()=>{
    console.log('Server listening');
});


//localhost:3030/metals/new