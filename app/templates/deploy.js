// dependencies
const spsave = require('spsave').spsave

// load env.js configuration file
const env = require('./env.js')

// configuration options
const config = {
  siteUrl: env.site,
  checkin: false,
  checkinType: 2,
  checkinMessage: 'Automatic deployment via SPBones'
}

// file options
const files = {
  glob: 'dist/_catalogs/**/*.*',
  base: '_catalogs',
  folder: ''
}

// credentials for SP connection
const credentials = {
  username:env.username,
  password:env.password
}

// deploy
spsave(config, credentials, files).then(function(){
  console.log('Deploy to SharePoint complete')
}).catch(function(err){
  console.log(`Error while deploying to SharePoint: ${err}`)
})