const express = require('express')
const api_helper = require('./helper')
const app = express()
const port = 5000

app.get('/api/users', (req, res) =>{
    api_helper.call_API('https://jsonplaceholder.typicode.com/users')
    .then(response =>{
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
} )


app.listen(port, () => console.log(`App listening on port ${port}!`))