'use strict';

module.exports = {
  'package.json': function(content) {
    let pkg = JSON.parse(content);

    delete pkg.devDependencies['ember-resolver']
    pkg.devDependencies['ember-strict-resolver'] = '0.0.3'

    return JSON.stringify(pkg, null, 2);
  }
};

