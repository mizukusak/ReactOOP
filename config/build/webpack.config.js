import webpack from "webpack";
import cssnano from "cssnano";
import HappyPack from "happypack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import AddAssetHtmlPlugin from "add-asset-html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import config from "../../config";
import _debug from "debug";

const path = require('path');
const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const {__DEV__, __PROD__, __TEST__} = config.globals

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  debug: true,
  devtool: config.compiler_devtool,
  target: 'web',
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.ts', '.styl', '.jsx', '.tsx', '.json']
  },
  module: {}
}

if (__DEV__) {
  webpackConfig.tslint = {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  }
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATHS = [
  paths.client('main.js')
]

webpackConfig.entry = {
  app: __DEV__
    ? APP_ENTRY_PATHS.concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
    : APP_ENTRY_PATHS,
}

// ------------------------------------
// Bundle Output
// ------------------------------------
if (__DEV__) {
  webpackConfig.output = {
    filename: `[name].bundle.js`,
    path: paths.dist(),
    library: 'vendor_library',
    publicPath: config.compiler_public_path
  }
} else {
  webpackConfig.output = {
    filename: `[name].[${config.compiler_hash_type}].js`,
    path: paths.dist(),
    library: 'vendor_library',
    publicPath: config.compiler_public_path
  }
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  // Reference library
  new webpack.DllReferencePlugin({
    context: config.utils_paths.base(),
    // manifestファイルをロードして渡す
    manifest: require(path.join(paths.dist(), 'vendor-manifest.json'))
  }),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    cache: true,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    vendorFileName: 'vendor.dll.js',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  }),
  new AddAssetHtmlPlugin({
    filepath: path.join(paths.dist(), 'vendor.dll.js'),
    includeSourcemap: __DEV__
  }),
  new HappyPack({ id: "js", threads: 4,}),
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

webpackConfig.node = {
  fs: "empty",
  child_process: "empty",
}

// Don't split bundles during testing, since we only want import one bundle
// if (!__TEST__) {
//   webpackConfig.plugins.push(
//     new webpack.optimize.CommonsChunkPlugin({
//       name: ['vendor'].reverse()
//     })
//   )
// }

// ------------------------------------
// Pre-Loaders
// ------------------------------------
/*
[ NOTE ]
We no longer use eslint-loader due to it severely impacting build
times for larger projects. `npm run lint` still exists to aid in
deploy processes (such as with CI), and it's recommended that you
use a linting plugin for your IDE in place of this loader.

If you do wish to continue using the loader, you can uncomment
the code below and run `npm i --save-dev eslint-loader`. This code
will be removed in a future release.

webpackConfig.module.preLoaders = [{
  test: /\.(js|jsx)$/,
  loader: 'eslint',
  exclude: /node_modules/
}]

webpackConfig.eslint = {
  configFile: paths.base('.eslintrc'),
  emitWarning: __DEV__
}
*/

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON

webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime'],
      presets: ['es2015', 'react', 'stage-0']
    },
    happy: { id: 'js' },
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.(ts|tsx)$/,
    loaders: ['awesome-typescript-loader'],
    exclude: [/\.(spec|e2e)\.ts$/]
  },
]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
]

// If config has CSS modules enabled, treat this project's styles as CSS modules.
if (config.compiler_css_modules) {
  PATHS_TO_TREAT_AS_CSS_MODULES.push(
    paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&') // eslint-disable-line
  )
}

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)

// Loaders for styles that need to be treated as CSS modules.
if (isUsingCSSModules) {
  const cssModulesLoader = [
    BASE_CSS_LOADER,
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')

  webpackConfig.module.loaders.push(
    {
      test: /\.scss$/,
      include: cssModulesRegex,
      loaders: [
        'style',
        cssModulesLoader,
        'postcss',
        'sass?sourceMap'
      ]
    },
    {
      test: /\.css$/,
      include: cssModulesRegex,
      loaders: [
        'style',
        cssModulesLoader,
        'postcss'
      ]
    }
  )
}

// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false
webpackConfig.module.loaders.push(
  {
    test: /\.styl$/,
    exclude: excludeCSSModules,
    loaders: [
      'style',
      BASE_CSS_LOADER,
      'postcss',
      'stylus?sourceMap'
    ]
  },
  {
    test: /\.scss$/,
    exclude: excludeCSSModules,
    loaders: [
      'style',
      BASE_CSS_LOADER,
      'postcss',
      'sass?sourceMap'
    ]
  },
  {
    test: /\.css$/,
    exclude: excludeCSSModules,
    loaders: [
      'style',
      BASE_CSS_LOADER,
      'postcss'
    ]
  }
)

// ------------------------------------
// Style Configuration
// ------------------------------------
webpackConfig.sassLoader = {
  includePaths: paths.client('styles')
}

webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const [first, ...rest] = loader.loaders
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    Reflect.deleteProperty(loader, 'loaders')
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  )
}

export default webpackConfig
