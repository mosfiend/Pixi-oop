const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    devtool: 'eval-cheap-source-map',  // MIGHT BITE ME IN THE ASS LATER DOWN THE LINE 
    mode: "development",
    entry: {
    main: path.resolve(__dirname, "src/index.js")
}
    ,
    output : {
      path:  path.resolve(__dirname, "dist"),
      filename: "[name][contenthash].js",
      clean: true,
    //   assetModuleFilename : "[name][ext],"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test:/\.scss$/,
                use:["style-loader","css-loader", "sass-loader"],
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:'asset/resource'
            },
        ]
    },
    
    devServer : {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: __dirname + '/src/assets/images',
                    to: 'assets/images',
                    noErrorOnMissing: true
                }
            ],
        }),
        
        new HtmlWebpackPlugin({title:"webpack app",
filename: "index.html",
template:"src/template.html"})
]
}