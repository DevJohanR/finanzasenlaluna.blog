const { Router } = require('express')

const router = Router()

router.get('/', (req,res,next) =>{
    res.json("THIS IS THE POST ROUTE")
})

module.exports = router