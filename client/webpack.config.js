var webpack =  require("webpack")
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname,'dist/assets/'),
        filename: "bundle.js",
        publicPath: "assets/"
    },

    devServer: {
        inline: false,
        contentBase: path.join(__dirname, "dist"),
        compress: true,
	disableHostCheck: true
    },
      
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader','autoprefixer-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','autoprefixer-loader','sass-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                           name: '[path][name].[ext]'
                        }
                    },
                ],
            },
        ]
    },

    plugins:[
        new webpack.ProvidePlugin({   
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
    ]


}
