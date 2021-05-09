const { GoogleSpreadsheet } = require('google-spreadsheet');
const {
  googleClientEmail,
  googlePrivateKey,
  googleSheetId
} = require('../../config')

async function useGoogleSpreadsheet(req, res, next) {
  const doc = new GoogleSpreadsheet(googleSheetId);
  await doc.useServiceAccountAuth({
    client_email: googleClientEmail,
    private_key: googlePrivateKey,
  });
  await doc.loadInfo();

  req.googleDoc = doc;
  next()
}

module.exports = { useGoogleSpreadsheet }