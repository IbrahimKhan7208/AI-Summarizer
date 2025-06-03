require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const aiRoutes = require('./routes/ai.route') 
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send("Hello")
})

app.use('/ai', aiRoutes)

app.listen(port, ()=>{
    console.log(`Server Running On ${port}`)
})