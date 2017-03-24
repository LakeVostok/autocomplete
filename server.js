const express = require ('express');
const path = require ('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const server = express();

if(process.env.NODE_ENV == 'development') {
    
    const webpack = require('webpack');
    const config = require(path.join(__dirname, '/webpack.config'));
    const compiler = webpack(config);

    server
        .use(require('webpack-dev-middleware')(compiler, {
            publicPath: config.output.publicPath
        }))
        .use(require('webpack-hot-middleware')(compiler));
    
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: true
        }));
}

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/index.html'));
})

server.use('/dist', express.static(__dirname + '/dist'));

server.use('/static', express.static(__dirname + '/static'));

server.listen(PORT, () => {
    console.log('Server listening port %d', PORT);
});
