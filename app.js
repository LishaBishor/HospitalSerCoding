const express=require('express');
const morgan=require('morgan');
const app=new express();
const api=require('./routes/sample');
require('dotenv').config()
app.use(morgan('dev'));
const PORT=process.env.PORT;
app.use(express.json());
//app.use(express.urlencoded({extended:true}))

app.use('/api',api)
   
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
});