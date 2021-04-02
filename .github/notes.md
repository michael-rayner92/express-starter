### Workflow Pipeline
> Notes to help with later flow planning and development

#### Jobs
**Install**
  - clean install - ```npm ci```
  - security audit - ```npm audit```

**Lint**
  - linter - ```eslint``` / ```stylelint```
  - formatter ```prettier```

**Test**
  - test suite - ```jest``` / ```mocha``` / ```chai```
  - code coverage = ```nyc``` / ```codecov``` / ```coveralls```

**Build**
  - transpile - ```babel``` / ```typescript``` / ```flow```
  - pre-process (compile, auto-prefix, etc.) - ```sass``` / ```less``` / ```postcss```
  - uglify (minify, mingle, optimize, etc.) - ```uglify-js``` / ```terser```
  - bundle (concat, tree-shake, etc.) - ```webpack``` / ```rollup``` / ```parcel```
  - compress (gzip, etc.)
  - other
    - copy / delete / move files
    - check bundle size
    - strip unused code (ts/flow/proptypes)

**Push**
  - release - ```github``` / ```bitbucket``` / ```gitlab```
  - publish - ```npm``` / other registry

**Deploy**
  - host - ```heroku``` / ```surge``` / ```github-pages```/ etc.


### Task Execution
  - CLI (```npm``` / ```yarn```)
  - task runner
    - ```grunt```, ```gulp```, ```brunch```