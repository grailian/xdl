var instapromise = require('instapromise');
var jsonFile = require('@exponent/json-file');
var mkdirp = require('mkdirp');
var path = require('path');

// TODO: Make this more configurable
function userSettingsFile() {
  return path.join(dotExponentHomeDirectory(), 'exponent.json');
}

function userSettingsJsonFile() {
  return new jsonFile(userSettingsFile(), {cantReadFileDefault:{}});
}

function recentExpsJsonFile() {
  return new jsonFile(path.join(dotExponentHomeDirectory(), 'xde-recent-exps.json'));
}

var mkdirped = false;
function dotExponentHomeDirectory() {
  if (!process.env.HOME) {
    throw new Error("Can't determine your home directory; make sure your $HOME environment variable is set.");
  }
  var dirPath = path.join(process.env.HOME, '.exponent');
  if (!mkdirped) {
    mkdirp.sync(dirPath);
    mkdirped = true;
  }
  return dirPath;
}

module.exports = userSettingsJsonFile();

Object.assign(module.exports, {
  dotExponentHomeDirectory,
  recentExpsJsonFile,
  userSettingsFile,
  userSettingsJsonFile,
});
