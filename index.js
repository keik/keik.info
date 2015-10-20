var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['w'], alias: {w: 'watch'}
})

var Metalsmith = require('metalsmith'),
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
  .use(markdown())
  .use(layouts({
    engine: 'ect'
  }))
  .use(permalinks({
    pattern: ':title',
    relative: false
  }))
  .build(function(err) {
    if (err) throw err;
    console.log('Build succeeded.')
  })
