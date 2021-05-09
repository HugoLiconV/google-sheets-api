async function index (req, res) {
  const { googleDoc } = req;
  const ACCOUNTS_SHEET_ID = '1502419302';
  const sheet = googleDoc.sheetsById[ACCOUNTS_SHEET_ID]
  console.log(`🚀 sheet ${sheet.title} loaded!`);
  const rows = await sheet.getRows()
  const response = rows
    .map(row => {
      const { account, current_balance, expenses } = row;
      const parsedBalance = parseFloat(current_balance);
      const parsedExpenses = parseFloat(expenses);
      return { account, balance: parsedBalance, expenses: parsedExpenses }
    })
  return res.status(200).json(response)
}

module.exports = {
  index
}