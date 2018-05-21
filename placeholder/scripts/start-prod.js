const path = require('path');
const express = require('express');
const app = express();

app.use( express.static( `${__dirname}/../build` ) );

const apiProxy = require('../config/apiProxy');

app.use("/api/*", apiProxy);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(3000, () => console.log('Frontend server listening on port 3000!'));
