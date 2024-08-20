//@ts-check
/**
 * Contains loaders
 */
const DefaultOats_iLoadersConfig = {

    module: {

        rules: [

            {
                test: /\.(html|sv.hbs|p.hbs)$/,
                use: [
                        {
                            loader: "html-loader",
                            options: {
                                minimize: false
                            }
                        }
                ]
            },
            {
                test: /\.(hbs)$/,
                exclude: /\.(sv.hbs|p.hbs)/,
                use: [
                    {
                        loader: "handlebars-loader",
                        options: {
                            inlineRequires: "./assets"
                        }
                    }
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [

                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}

module.exports = DefaultOats_iLoadersConfig;