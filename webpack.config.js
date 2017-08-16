var webpack = require('webpack');
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true})

module.exports = {
    entry:{fast:'./src/js/pageTurning.js'},
    output:{
        filename: 'index.js',
        path:__dirname + '/out',
        publicPath:'http://localhost:8080/out/'
    },
    module:{
        rules:[
            {test: /.js$/, use:'babel-loader' },
            {test: /.css$/, use:['style-loader','css-loader']},
            {test: /.(png|jpg|gif|svg)$/, use: ['url-loader?limit=8192&name=/[name].[ext]']},
            {test: /.less$/, use:['style-loader','css-loader','less-loader']}
        ]
    },
    plugins: [uglifyPlugin,providePlugin]

}