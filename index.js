const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.send('hello UNO');
})

app.listen(3000, ()=>{
    console.log('server start');
});