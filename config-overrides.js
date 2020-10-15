const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = {
  stats: {
    warningFilter: false,
    warnings: false
  },
  plugins: [],
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true // change importing css to less
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#e62d39',
        '@link-color': '#e62d39',
        '@success-color': '#a0b149',
        '@warning-color': '#f5ad48',
        '@error-color': '#e62d39',
        // '@font-family': 'Circe Regular, Circe Light',
        // '@font-size': '14px',
        '@heading-color': '#000000',
        '@text-color': '#000000',
        '@text-color-secondary': '#918273',
        '@disabled-color': 'rgba(0, 0, 0, 0.25)',
        '@border-radius': '2px',
        '@border-color': '#d9d9d9' //,
        // '@box-shadow': '0 2px 8px rgba(0, 0, 0, 0.15)'
      }
    })
  )
};
