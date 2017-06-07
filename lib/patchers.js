'use strict';

module.exports = {
  'package.json': function(content) {
    let pkg = JSON.parse(content);

    delete pkg.devDependencies['ember-resolver'];
    delete pkg.devDependencies['ember-ajax'];

    pkg.devDependencies['ember-strict-resolver'] = '^0.0.3';
    pkg.devDependencies['ember-native-dom-helpers'] = '^0.4.1';
    pkg.devDependencies['ember-native-dom-event-dispatcher'] = '^0.6.1';
    pkg.devDependencies['ember-fetch'] = '^2.1.0';

    return JSON.stringify(pkg, null, 2);
  }
};

