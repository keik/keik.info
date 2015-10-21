var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['w'], alias: {w: 'watch'}
})

var Metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    drafts = require('metalsmith-drafts'),
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
  .use(metallic())
  .use(collections({
    posts: {
      pattern: 'blog/**/*.md',
      sortBy: 'date'
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: 'blog/:date/:title',
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
