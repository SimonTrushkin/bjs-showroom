const path                          = require('path');
const CopyPlugin                    = require('copy-webpack-plugin');          // копирование файлов (не созданных билдом)
const HtmlWebPackPlugin             = require('html-webpack-plugin');          // помощь в генерации HTML
const HtmlWebpackHarddiskPlugin     = require('html-webpack-harddisk-plugin');
const ForkTsCheckerWebpackPlugin    = require('fork-ts-checker-webpack-plugin'); // TypeScript parralell types checking

const commonPlugins = [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackHarddiskPlugin(),
    new HtmlWebPackPlugin({
        template:'./src/routes/test-space/index.html',
        filename:'test-space/index.html',
        publicPath:'/',
        minify:true,
        alwaysWriteToDisk: true,
        chunks:['test-space'],
        inject:true,
        scriptLoading:'defer'
    })
]

const prodPlugins = [
    new CopyPlugin({
        patterns: [
            { from:"./src/assets",        to:"assets", force:true},
            // { from:"./src/routes/anatomyAtlas/main.css",        to:"anatomyAtlas", force:true}
        ],
    }),
];
const devPlugins = [];
const config = {
    entry: {
        "test-space":{
            import   :'./src/routes/test-space/index.ts',
            filename :'test-space/js/index.js'
        }
    },
    output: {   // выход
        path: path.resolve(__dirname, './' + (process.env.BUILD_TSCONFIG || 'dist')),
        filename:'[name].js',
    },
    module: {
        rules: [
            {
                test: [/\.tsx?$/], // прочие расширения, обрабатываемые ts-лоадером
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true  // disable type checker - we will use it in fork plugin
                }
            }
        ]
    },
    context:__dirname,   // for ts-parallels plugin
    devServer:{
        contentBase: path.resolve(__dirname, './' + (process.env.BUILD_TSCONFIG || 'dist')),
        publicPath:'/',
        compress:true,  // gzip компрессия
        host: '0.0.0.0',
        public: 'dev.project.ru:8083',
        port:8083,
        disableHostCheck: false,
        clientLogLevel:'debug',
        headers:{
            "Access-Control-Allow-Origin": "*"
        },
        // lazy: true,
        filename: '[name].js',
        liveReload:true,
        hot:true,
    },
    resolve:{
        extensions: [ '.ts', '.js', '.tsx', '.jsx'],
        alias: {
            "@classes": path.resolve(__dirname, "src/classes"),
            "@routes": path.resolve(__dirname, "src/routes")
        }
    }
}

module.exports = (env,argv)=>{
    config.devtool = false;
    if (!!env && env['WEBPACK_SERVE']){
        console.log('DEV MODE');
        config.mode     = 'development'
        config.devtool  = 'eval-source-map';
        config.plugins  = commonPlugins.concat(devPlugins);
    }else{
        console.log('PROD MODE');
        config.mode = 'production';
        config.plugins = commonPlugins.concat(prodPlugins);
    }
    config.watchOptions = {
        aggregateTimeout: 10000,
        ignored: ['node_modules/**'],
        poll: 1000
    };
    return config;
}
