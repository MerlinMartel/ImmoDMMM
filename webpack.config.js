module.exports = {
    context: __dirname + "/depenseListAngularWebpack",
    entry : __dirname + "/depenseListAngularWebpack/entry.ts",
    output:{
        path:  __dirname + '/depenseListAngularWebpack/build/',
        filename: 'bundle.js'
    },
    devtool:"source-map",
    module:{
        loaders:[
            {test : /\.ts$/, loader: 'ts'}
        ]
    },
    resolve: {
        extensions: ['', 'webpack.js', 'web.js', '.ts', '.js']
    }
};