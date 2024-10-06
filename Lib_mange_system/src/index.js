const express= require("express")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config();
const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/',async (req,res)=>{
    res.send('hhii')
})

const PORT = process.env.PORT || 7070
app.listen(PORT,()=>
    console.log(`server is running on port ${PORT}`)
)