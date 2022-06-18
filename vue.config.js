module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  devServer: { 
    allowedHosts: 'all',
    proxy: { 
      '/api': { 
        target: 'https://schedulemanager-back.herokuapp.com/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  outputDir: '../schedulemanager/public',
};
