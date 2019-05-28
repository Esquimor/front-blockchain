const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/style/variables.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@services": path.resolve(__dirname, "src/services/")
      }
    }
  }
};
