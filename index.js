var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['w'], alias: {w: 'watch'}
})

var Metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    drafts = require('metalsmith-drafts'),
    inplace = require('metalsmith-in-place'),
    layouts = require('metalsmith-layouts'),
    less = require('metalsmith-less'),
    markdown = require('metalsmith-markdown'),
    metallic = require('metalsmith-metallic'),
    permalinks = require('metalsmith-permalinks'),
    watch = require('metalsmith-watch')

Metalsmith('./')
  .use(argv.w ? watch({
    paths: {
      'src/**/*': '**/*',
      'layouts/**/*': '**/*'
    }
  }) : function dummy() {})
  .use(drafts())
  .use(less())
  .use(collections({
    posts: {
      pattern: 'blog/**/*.md',
      sortBy: 'date',
      limit: 3
    }
  }))
  .use(inplace({
    engine: 'ect'
  }))
  .use(metallic())
  .use(markdown())
  .use(permalinks({
    pattern: 'blog/:path',
    date: 'YYYY-MM-DD',
    relative: false
  }))
  .use(layouts({
    engine: 'ect'
  }))
  .build(function(err) {
    if (err) throw err;
    console.log('Build succeeded.')
  })
