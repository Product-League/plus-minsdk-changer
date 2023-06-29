const fs = require('fs');
const _ = require('lodash');
const xml2js = require('xml2js');


module.exports = function (context) {
  const parseString = xml2js.parseString;
  const builder = new xml2js.Builder();
  const manifestPath = context.opts.projectRoot + '/platforms/android/CordovaLib/AndroidManifest.xml';
  const androidManifest = fs.readFileSync(manifestPath).toString();

  let manifestRoot;

  if (androidManifest && usesSDK.length > 0) {
    parseString(androidManifest, (err, manifest) => {
      if (err) return console.error(err);

      manifestRoot = manifest['manifest'];
      console.log(manifestRoot);
      if (!manifestRoot['uses-sdk']) {
        manifestRoot['uses-sdk'] = [];
      }
        usesSDK.forEach(use => manifestRoot['uses-sdk'].push({'$': {'tools:overrideLibrary': 'com.outsystems.plugins.keystore'}}));

        fs.writeFileSync(manifestPath, builder.buildObject(manifest));
      }
    )}
  }
