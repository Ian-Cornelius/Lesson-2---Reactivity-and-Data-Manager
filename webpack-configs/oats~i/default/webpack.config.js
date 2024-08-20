//@ts-check
const DefaultOats_iConfig = {

    optimization: {

        splitChunks: {
            
            minSize: 0, //Minimum size, in bytes, for a chunk to be generated.
            minSizeReduction: 1, //Minimum size reduction to the main chunk (bundle), in bytes, needed for a chunk to be generated.
            minChunks: 2,
            cacheGroups: {
                
                commons: {
                    
                    chunks: "async", //Allow chunks to be shared between sync and async
                }
            }
        }
    }
}

module.exports = DefaultOats_iConfig;