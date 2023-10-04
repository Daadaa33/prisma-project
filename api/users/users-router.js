const router = require("express").Router();
const { restricted, checkRoleType } = require("../auth/middleware.js");
const prisma = require( "../lib/index.js");
const bcrypt = require("bcrypt")
const  Jwt  = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY

router.get('/', async (req,res) => {
  try{
  const users = await prisma.user.create({
    data
  })
  res.status(201).json(users)

  }catch(err){
    res.status(500).json({
      message : "somthing wrong",
      error : err.message
    })
  }
})

// singup or registor
router.post('/singup', async (req,res) => {
  const {name,email, password} = req.body
  try{
    const existingUser = await prisma.user.findUnique({
      where :{
        email : email
      },
    })
    if(existingUser){
      return res.status(409).json({message : "user already exists"})
    } 
    const haspassword = await bcrypt.hash(password, 10)

    // add prisma
    const newuser = await prisma.user.create({
      data: {
        name : name,
        email : email,
        password : haspassword
      }
    })
    return res.status(201).json({
      message: 'Successfully created',
      user: newuser
    })
  }catch(error){
    res.status(500).json({ message: "khadal ayaa jiro", error: error.message });
  }
})
  



  // login form
router.post('/login', async(req, res) => {
  const {email, password} = req.body

  try{
  const existingUser = await prisma.user.findUnique({
    where : {
      email : email
    }
  })

  if(!existingUser){
    res.status(404).json({message: "user not found"}) 

  }
  const ispasswordCorrect = await bcrypt.compare(password , existingUser.password)
  if(!ispasswordCorrect){
    return res.status(401).json({message: "ivaild credentials from login"})
  }


  //create a token
  const token = Jwt.sign(
    {id : existingUser.id , email : existingUser.email},
    SECRET_KEY ,
    {expiresIn :"1h"}
    )
   res.status(200).json({
    message : "user togged in successfully",
    token : token
   })
  }catch(error){
    res.status(500).json({message : "somthing went wrong", error : error.message})
  }
})
  
 



module.exports = router;
