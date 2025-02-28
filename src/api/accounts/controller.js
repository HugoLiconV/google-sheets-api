async function index(req, res) {
  const { googleDoc } = req;
  const ACCOUNTS_SHEET_ID = "1502419302";
  const sheet = googleDoc.sheetsById[ACCOUNTS_SHEET_ID];
  const rows = await sheet.getRows();
  const response = rows
    .map((row) => {
      const { account, current_balance, expenses } = row;
      const parsedBalance = parseFloat(current_balance);
      const parsedExpenses = parseFloat(expenses);
      return {
        name: account,
        balance: parsedBalance,
        expenses: parsedExpenses,
      };
    })
    .sort((a, b) => b.name - a.name);
  return res.status(200).json(response);
}

module.exports = {
  index,
};
