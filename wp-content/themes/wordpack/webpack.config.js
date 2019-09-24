module.exports = {
  browsersync: {
    proxy: "http://wordpack-url.localhost",
    port: 3000
  },
  fs: {
    jsFilename: "bundle",
    cssFilename: "style"
  },
  wordpress: {
    themeName: "wordpack",
    stagingPrefix: "wordpack"
  }
}
