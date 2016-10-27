import './controllers/commands';
import './controllers/index';

import { handlebars } from 'consolidate';
import * as express from 'express';
import { registerControllers } from 'giuseppe';
import * as path from 'path';

const app = express();

app.engine('html', handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const devServer = require('webpack-dev-middleware');
    const hotServer = require('webpack-hot-middleware');
    const webpackConfig = require('../../../webpack/webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(devServer(compiler, {
        publicPath: webpackConfig.output.publicPath || '/public/',
        stats: webpackConfig.devServer.stats,
    }));

    app.use(hotServer(compiler, {
        log: console.log,
    }));
} else {
    app.use('/public', express.static(path.join(__dirname, '../../lib/public')));
}

app.use(registerControllers('/api'));
app.set('port', '1337' || process.env.PORT);

const listener = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + listener.address().port);
});
