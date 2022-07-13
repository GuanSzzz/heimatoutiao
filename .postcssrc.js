module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //   rootValue: 37.5,
      rootVakue: (module) => {
        /vant/gi.test(module.file) ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
