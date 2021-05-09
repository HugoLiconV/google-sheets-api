const dayjs = require("dayjs");

async function index(req, res) {
  const { googleDoc } = req;
  const DASHBOARD_SHEET_ID = '43352440'
  const sheet = googleDoc.sheetsById[DASHBOARD_SHEET_ID]
  const rows = await sheet.getRows()
  const response = rows
    .map(row => {
      const currentMonth = dayjs().format('MMMM').toLocaleLowerCase(); /*? */
      const { data: property } = row;
      const value = row[currentMonth];
      return [property, value]
    })
    .map(row => {
      const [property, value] = row;
      const parsedValue = parseFloat(value);
      return [property, parsedValue]
    })
    .reduce((response, row) => {
      const [property, value] = row;
      response[property] = value
      return response
    }, {})
  return res.status(200).json(response)
}

module.exports = {
  index
}