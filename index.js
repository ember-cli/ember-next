'use strict';

const App = require('ember-cli/blueprints/app/index');
const FileInfo = require('ember-cli/lib/models/file-info');
const path = require('path');
const walkSync = require('walk-sync');
const fs = require('fs');

const patchers = require('./lib/patchers');
const PatchableFileInfo =require('./lib/patchable-file-info');

function unique(a) {
  return a.reduce((p, c) => {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
}

module.exports = Object.assign({}, App, {
  description: 'the future of ember',
  init() {
    this._super.apply(this, arguments);
    this.super = this.lookupBlueprint('app');
  },

  filesPath() {
    throw new TypeError('filesPath not implmented');
  },

  files() {
    let originalFiles = this.super.files();
    let newFiles = walkSync(this.path + '/files');

    return unique(originalFiles.concat(newFiles));
  },

  buildFileInfo(intoDir, templateVariables, file) {
    let mappedPath = this.mapFile(file, templateVariables);

    if (file in patchers) {
      return new PatchableFileInfo({
        action: 'write',
        outputBasePath: path.normalize(intoDir),
        outputPath: path.join(intoDir, mappedPath),
        displayPath: path.normalize(mappedPath),
        inputPath: this.srcPath(file),
        templateVariables,
        ui: this.ui,
      }, patchers[file])
    } else {
      return new FileInfo({
        action: 'write',
        outputBasePath: path.normalize(intoDir),
        outputPath: path.join(intoDir, mappedPath),
        displayPath: path.normalize(mappedPath),
        inputPath: this.srcPath(file),
        templateVariables,
        ui: this.ui,
      });
    }
  },

  srcPath(file) {
    let path = this.path + '/files/' + file;
    let superPath = this.super.path + '/files/' + file;

    return fs.existsSync(path) ? path : superPath;
  }
});
