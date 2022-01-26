const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

async function index(req, res) {
  const { googleDoc } = req;
  const SHEET_ID = 2114383562;
  const sheet = googleDoc.sheetsById[SHEET_ID];
  const rows = await sheet.getRows().catch((e) => {
    return res
      .status(500)
      .json({ error: "Error getting rows", message: e.message });
  });

  const response = rows.map((row) => ({
    dailyBudget: row.daily_budget ? parseFloat(row.daily_expenses) : null,
    dailyExpenses: row.daily_expenses ? parseFloat(row.daily_expenses) : null,
    remaining: row.remaining ? parseFloat(row.remaining) : null,
  }));
  return res.status(200).json(response);
}

module.exports = {
  index,
};
