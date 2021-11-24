module.exports = {
    devServer: {
        proxy: {
            '/vue-test': {
                target:'http://localhost:8080',
                changeOrigin: true
            },


        }
    }
}