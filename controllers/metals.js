const express = require('express');
const router = express.Router();

//Require Yarn Models
const Metal = require('../models/metals.js');

// CONTROLLERS

//Product.collection.drop()

// Index Route
router.get('/', (req, res)=>{
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