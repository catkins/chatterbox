# Chatterbox

### Work in progress

Explorations in making a Slack clone with React + Express + Rethinkdb

### Prerequisites

- NodeJS
- Gulp
- Bower
- Rethinkdb (not yet...)

```bash
git clone git@github.com/catkins/chatterbox.git
cd colour-box
npm install -g gulp bower
npm install
bower install
```

### Building

```bash
gulp build  # output all generated assets to ./public
gulp server # fire up a dev server serving the generated assets
gulp watch  # will watch local sources for changes, compile where necessary and copy to public

gulp        # this will start up dev server with live reload, and compile assets on changes
```
