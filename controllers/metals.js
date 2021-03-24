

const express = require('express');
const router = express.Router();
const axios = require('axios')

//req.app.locals.price

//Require Models
const Metal = require('../models/metals.js');

// CONTROLLERS

//Metal.collection.drop()

// Index Route
router.get('/', (req, res)=>{

//	req.app.locals.price
//	const test = Number(req.app.locals.price.toFixed(2))
//	console.log(test)
//	console.log(typeof test)

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
		console.log(foundMetal)

        res.render('show.ejs', {

			metal: foundMetal
		});
		
    });
});


//{$set: {price: req.app.locals.price} },
// POST Route - "Create"
router.post('/', (req, res)=>{
	req.app.locals.price
	//{$set: {price: req.app.locals.price} },
	//{$set: {price: test} },
   
	const test = Number(req.app.locals.price.toFixed(2))
	console.log(test)
	console.log(typeof test)
	req.body.price = test


	Metal.create(req.body, (err, createdMetal) => { 
		


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
	req.app.locals.price
	//{$set: {price: req.app.locals.price} },
	//{$set: {price: test} },
   
	const test = Number(req.app.locals.price.toFixed(2))
	console.log(test)
	console.log(typeof test)
	req.body.price = test

	Metal.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMetal) => {
	  res.redirect(`/metals/${req.params.id}`)
	})
  })









module.exports = router;