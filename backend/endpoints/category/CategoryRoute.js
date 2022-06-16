var express = require('express')
var router = express.Router()
var AuthenticationService = require('../authentication/AuthenticationService')
var CategoryService = require('./CategoryService')


router.get('/', AuthenticationService.isAuthenticated, function (req, res) {
  CategoryService.getAllCategories(req.userMail, (err, result) => {
    if (err) {
      res.status(400).json({ Error: err })
    } else {
      res.status(200).json(result)
    }
  })
})

router.get('/getAll/:categoryID', AuthenticationService.isAuthenticated, function (req, res) {
  let urlID = req.url.split('/')[2];
  CategoryService.getAllChildrenOf(urlID, (err, result) => {
    if (err) {
      res.status(400).json({ Error: err })
    }
    else {
      res.status(201).json(result)
    }
  })
})


router.post('/create', AuthenticationService.isAuthenticated, function (req, res) {
  CategoryService.createCategory(req, (err, category) => {
    if (err) {
      res.status(400).json({ Error: err })
    }
    else {
      res.status(201).json(category)
    }
  })
})

router.put('/update/:categoryID', AuthenticationService.isAuthenticated, function (req, res) {
  let urlID = req.url.split('/')[2];
  CategoryService.updateCategory(urlID, req.body, (err, category) => {
    if (err) {
      res.status(400).json({ Error: err })
    }
    else {
      res.status(200).json(category)
    }
  })
})

router.delete('/delete/:categoryID', AuthenticationService.isAuthenticated, function (req, res) {
  let urlID = req.url.split('/')[2];
  CategoryService.deleteCategory(urlID, (err) => {
    if (err) {
      res.status(400).json({ Error: err })
    }
    else {
      res.status(204).send();
    }
  })
})

module.exports = router;