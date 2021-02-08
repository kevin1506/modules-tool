const path = require("path");
const tsImportPluginFactory = require("ts-import-plugin");
const basename = path.basename;
const join = path.join;
const merge = require("webpack-merge");
const camel2Dash = require("camel-2-dash");

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "element-ui",
                libraryDirectory: "lib",
                camel2DashComponentName: true,
                style: path =>
                  join(
                    "element-ui",
                    "lib",
                    "theme-chalk",
                    `${camel2Dash(basename(path, ".js"))}.css`
                  )
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      })
    // packages文件夹添加到webpack编译
    // config.module
    //   .rule('js')
    //   .include
    //   // .add('packages')
    //   .add(path.resolve('packages'))
    //   .end()
    //   .use('babel')
    //   .loader('babel-loader')
    //   .tap(options => {
    //     // 修改它的选项...
    //     return options
    //   })
    // config.plugin('html').tap(args => {
    //   args[0].title = '模块编辑器'
    //   return args
    // })
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config.performance = {// 打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  }
};