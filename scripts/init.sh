#!/bin/sh

# default
NODE_ENV=development 
source ~/.zshrc

if [[ -n $1 ]]; then
    NDOE_ENV=$1

fi
echo ${NODE_ENV}
nvm use
# Install Global Utilities
npm install gatsby-cli @sanity/cli netlify-cli -g

npm i

node ./scripts/init-sanity.js
node ./scripts/init-gatsby.js ${NODE_ENV} true

netlify init

node ./scripts/init-netlify.js ${NODE_ENV} 