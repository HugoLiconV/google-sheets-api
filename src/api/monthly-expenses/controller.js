const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const { dateFormat } = require("../../config");

dayjs.extend(utc);

async function index(req, res) {
  const { googleDoc } = req;
  const SHEET_ID = 1792356227;
  const sheet = googleDoc.sheetsById[SHEET_ID];
  const rows = await sheet.getRows().catch((e) => {
    return res
      .status(500)
      .json({ error: "Error getting rows", message: e.message });
  });

  const response = rows.map((row) => ({
    name: row.name,
    amount: row.amount ? parseFloat(row.amount) : null,
    date: row.date ? dayjs.utc(row.date, dateFormat) : null,
    paid: row.amount && row.date,
    category: row.category,
  }));
  return res.status(200).json(response);
}

module.exports = {
  index,
};
