const express = require('express');
const mongodb = require('./data/database.js');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught excepion: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if(err) {
        console.log(`server.js line 13: ${err}`)
    } else {
        app.listen(port, () => {console.log(`Database is listening. Node is running on port ${port}`)});
    }
})