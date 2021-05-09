const { GoogleSpreadsheet } = require('google-spreadsheet');
const {
  googleClientEmail,
  googlePrivateKey,
  googleSheetId
} = require('../../config')

let loaded = false;
let doc;
async function useGoogleSpreadsheet(req, res, next) {
  if (!loaded) {
    loaded = true;
    doc = new GoogleSpreadsheet(googleSheetId);
    await doc.useServiceAccountAuth({
      client_email: googleClientEmail,
      private_key: googlePrivateKey,
    });
    await doc.loadInfo();
  }
  req.googleDoc = doc;
  next()
}

module.exports = { useGoogleSpreadsheet }