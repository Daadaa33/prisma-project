const express = require('express')
const prisma = require("../lib/index")



const router = express.Router()

router.post('/', async(req, res) => {
    
    try{
        const restaurant = await prisma.restaurant.create({
            data : req.body
        });
    if(restaurant){
        res.status(201).json(restaurant)
    }else{
        res.status(404).json({message : "restaurant not found"})
    }

    }catch(error){
        res.status(500).json({message : "faild to add restaurant" , error : error.message})
    }
})


module.exports = router