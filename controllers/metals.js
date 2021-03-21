

const express = require('express');
const router = express.Router();
const axios = require('axios')

//Require Models
const Metal = require('../models/metals.js');


const url_api = `https://metals-api.com/api/latest?access_key=${process.env.API_KEY}&base=XAU&symbols=USD`;

// CONTROLLERS

//Product.collection.drop()

// Index Route
router.get('/', async (req, res)=>{
	try
	{
	const urlAPI = await axios.get(url_api)
	console.log(urlAPI.data.rates)

	const currentRates = urlAPI.data.rates
	/* res.render('index', {
		currentRates
	
	}) */
 
	}catch(err){
		console.error(err)
	}
	

	Metal.find({}, (err, allMetals) =>{
		res.render('index.ejs', {
			metals: allMetals
		})
	})
});


// NEW Route
router.get('/new', (req, res)=>{
    res.render('new.ejs');
});

// SHOW Route
router.get('/:id', (req, res)=>{
    Metal.findById(req.params.id, (err, foundMetal)=>{
        res.render('show.ejs', {
			metal: foundMetal
		});
		
    });
});


  
//res.render('header.ejs', {
//			rates: allrates
/* const renderRate = async (data) => {
	document.querySelectorAll('rates').innerHTML(data)
}    */

router.put('/', async (req, res, next) =>{
	try{
		let response = await axios.get(url_api)
		renderRate()
		console.log(data.rates)
		
	}catch(err){
		console.log(err)
	}
})


// POST Route - "Create"
router.post('/', (req, res)=>{
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

router.delete('/:id', (req, res)=>{
	Metal.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/metals') 
    })
})

// set up EDIT route
router.get('/:id/edit', (req, res) => {
	Metal.findById(req.params.id, (err, foundMetal) => {
	  res.render('edit.ejs', {
		metal: foundMetal 
	  })
  
	})
  })
  
  // set up UPDATE route
  // PUT  -- updates the information on the server
  // sometimes the HTTP method PATCH is used here instead
  router.put('/:id', (req, res) => {
	// first we need to update 'readyToEat'
	
	Metal.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMetal) => {
	  res.redirect(`/metals/${req.params.id}`)
	})
  })









module.exports = router;