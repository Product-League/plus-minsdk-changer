const fs = require('fs');
const xml2js = require('xml2js');


module.exports = function (context) {
  const parseString = xml2js.parseString;
  const builder = new xml2js.Builder();
  const manifestPath = context.opts.projectRoot + '/platforms/android/app/src/main/AndroidManifest.xml';
  const androidManifest = fs.readFileSync(manifestPath).toString();
  let manifestRoot;

  if (androidManifest) {
    parseString(androidManifest, (err, manifest) => {
      if (err) return console.error(err);

      if(!manifest.manifest['$']['xmlns:tools']){
        manifest.manifest['$']['xmlns:tools'] = 'http://schemas.android.com/tools';
      }

      manifestRoot = manifest['manifest'];

      if (!manifestRoot['uses-sdk']) {
        manifestRoot['uses-sdk'] = [];
      }

      manifestRoot['uses-sdk'].push({'$': {'tools:overrideLibrary': 'com.outsystems.plugins.keystore'}});
        fs.writeFileSync(manifestPath, builder.buildObject(manifest));
      }
    )}
  }
