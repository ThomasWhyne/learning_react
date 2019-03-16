const path=require("path");

const HWP=require("html-webpack-plugin");

module.exports={
    entry:"./main.js",
    output:{
        path:path.join(__dirname,"/bundle"),
        filename:"index_bundle.js"
    },
    devServer:{
        inline:true,
        port:8000
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {//es6预设
                    presets: ["es2015", "react"],
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    plugins:[
        new HWP({
            template:"./index.html"
        })
    ]
}