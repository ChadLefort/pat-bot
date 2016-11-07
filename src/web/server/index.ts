import './controllers';
import { handlebars } from 'consolidate';
import * as express from 'express';
import { registerControllers } from 'giuseppe';
import * as path from 'path';
import * as serveFavicon from 'serve-favicon';

const app = express();

app.engine('html', handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));
app.use(serveFavicon(path.join(__dirname, '../public/assets/favicon.png')));

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const devServer = require('webpack-dev-middleware');
    const hotServer = require('webpack-hot-middleware');
    const webpackConfig = require('../../../webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(devServer(compiler, {
        publicPath: webpackConfig.output.publicPath || '/public/',
        stats: webpackConfig.devServer.stats,
    }));

    app.use(hotServer(compiler, {
        log: console.log,
    }));
} else {
    app.use('/public', express.static(path.join(__dirname, '../public')));
}

app.use(registerControllers('/api'));
app.set('port', process.env.DEV_PORT || '1337');

const listener = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + listener.address().port);
});
