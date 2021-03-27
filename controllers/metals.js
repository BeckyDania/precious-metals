

const express = require('express');
const router = express.Router();
const axios = require('axios')

//req.app.locals.price

//Require Models
const Metal = require('../models/metals.js');

// CONTROLLERS

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


router.get('/seed', (req, res)=>{
    Metal.create([
        {
            name:'Pure Gold',
            form: "bar",
			weight: 1,
            quantity: 4,
			description: "Magnificent",
            image: "https://catalog.usmint.gov/on/demandware.static/-/Sites-usm-master-catalog-us/default/dwfb9d8f79/images/hi-res/coins/Gold-Coins/17xa-COTY.jpg"
        },
        {
            name:'Solid Gold',
			form: "coin",
			weight: 1,
            description:"Rare Find",
            quantity: 5,
            image: "https://catalog.usmint.gov/on/demandware.static/-/Sites-usm-master-catalog-us/default/dwfb9d8f79/images/hi-res/coins/Gold-Coins/17xa-COTY.jpg"
        },
        {
            name:'Minted Beauty',
            description:"Collectible",
			weight: 1,
            quantity: 25,
			description: "Collectible Item",
            image: "https://catalog.usmint.gov/on/demandware.static/-/Sites-usm-master-catalog-us/default/dwfb9d8f79/images/hi-res/coins/Gold-Coins/17xa-COTY.jpg"
        },
		{
            name:'Gold brick',
			form: "bar",
			weight: 1,
            description:"Get it while it lasts",
            quantity: 5,
            image: "https://catalog.usmint.gov/on/demandware.static/-/Sites-usm-master-catalog-us/default/dwfb9d8f79/images/hi-res/coins/Gold-Coins/17xa-COTY.jpg"
        },




    ], (err, data)=>{
        res.redirect('/metals')
    })
})



//Metal.collection.drop()







// SHOW Route
router.get('/:id', (req, res)=>{
    Metal.findById(req.params.id, (err, foundMetal)=>{
		console.log(foundMetal)

        res.render('show.ejs', {
			metal: foundMetal
		});
		
    });
});



// POST Route - "Create"
router.post('/', (req, res)=>{
	req.app.locals.price
	
	const test = Number(req.app.locals.price.toFixed(2))
	console.log(test)
	console.log(typeof test)
	let x = (test + 150)
	req.body.price = x

	Metal.create(req.body, (err, createdMetal) => { 

		if(err){
			console.log(err);
			res.send(err)

		} else {
	
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

  router.put('/:id', (req, res) => {

	req.app.locals.price
   
	const test = Number(req.app.locals.price.toFixed(2))
	console.log(test)
	console.log(typeof test)
	//req.body.price = test
	let x = (test + 150)
	req.body.price = x


	Metal.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMetal) => {
	  res.redirect(`/metals/${req.params.id}`)
	})
  })



module.exports = router;