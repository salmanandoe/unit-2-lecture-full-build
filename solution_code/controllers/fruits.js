const express = require('express');
const router = express.Router();
const startFruits = require('../db/fruitSeedData.js')
const Fruit = require('../models/fruit.js')

// Post
router.post('/', async (req, res) => {
	console.log(req.body)
	req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
	const fruit = await Fruit.create(req.body);
	res.redirect('/fruits');
});


// New Route
router.get('/new', (req, res) => {
    res.render("fruits/new.ejs")
});


// Index... show all fruits
router.get('/', async (req, res) => {
	// async tells js wait for this to complete
	// Fruit.find() is a Promise
	// Promise is resolved or rejected
	const fruits = await Fruit.find({});
	// await then runs the next line of code
	// res.send(fruits);
	res.render("fruits/index.ejs", {fruits});
});

// Seed
router.get('/seed', async (req, res) => {
	await Fruit.deleteMany({});
	await Fruit.create(startFruits);
	res.redirect('/fruits');
});

// Show
router.get('/:id', async (req, res) => {
	const fruit = await Fruit.findById(req.params.id);
	// res.send(fruit);
	res.render("fruits/show.ejs", {fruit})
});

// Delete
router.delete('/:id', async (req, res) => {
	const fruit = await Fruit.findByIdAndDelete(req.params.id);
	// res.send({ success: true, fruit });
	res.redirect('/fruits');
});

// Update
router.put('/:id', async (req, res) => {
	const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send(fruit);
});

module.exports = router;
