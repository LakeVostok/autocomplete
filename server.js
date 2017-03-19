const express = require ('express');
const server = express();

const PORT = process.env.PORT || 8080;

server.use(express.static('public'));

server.listen(PORT, () => {
    console.log('Server listening port %d', PORT);
});