const express = require('express')
const router = express.Router()

const FlatsController = require('./../controllers/flats.controllers')

router.get('/flats/read/count', FlatsController.getFlatsCountFromDB)
router.get('/flats/read/:limit/:offset', FlatsController.getFlatsFromDB)
router.get('/flats/:lang/count', FlatsController.getFlatsForSaleCount)
router.get('/flats/:lang/:count', FlatsController.getFlatsForSale)

router.post('/flats', FlatsController.postFlatsToDB)
router.post('/flats/write', FlatsController.postFlatsFromApiToDB)

router.delete('/flats/delete', FlatsController.deleteFlatsFromDB)

module.exports = router