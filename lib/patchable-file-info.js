'use strict';

const FileInfo = require('ember-cli/lib/models/file-info');

module.exports = class PatchableFileInfo extends FileInfo {
  constructor(options, replacer) {
    super(options);
    this._replacer = replacer;
  }

  render() {
    return super.render().then(result => {
      return this._replacer(result);
    });
  }
};
