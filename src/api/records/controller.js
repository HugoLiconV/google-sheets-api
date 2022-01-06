const dayjs = require("dayjs");
const RECORDS_SHEET_ID = "1295926321";
var utc = require("dayjs/plugin/utc");
const { dateFormat } = require("../../config");
dayjs.extend(utc);

async function create(req, res) {
  const { googleDoc, body } = req;
  const {
    record,
    amount,
    category,
    subcategory,
    label,
    account,
    formatedDate,
  } = req.body;

  const requiredProperties = [
    "record",
    "amount",
    "category",
    "subcategory",
    "account",
    "formatedDate",
  ];
  /* :: FIELD VALIDATIONS */
  requiredProperties.forEach((property) => {
    const value = body[property];
    if (!value) {
      return res.status(400).json({ error: `${property} is required` });
    }
  });
  if (isNaN(amount)) {
    return res.status(400).json({ error: `amount is not a number` });
  }
  const date = dayjs(formatedDate, dateFormat);

  if (!date.isValid()) {
    return res.status(400).json({ error: `formatedDate is not a valid date` });
  }

  const sheet = googleDoc.sheetsById[RECORDS_SHEET_ID];
  const row = {
    record,
    amount,
    category,
    subcategory,
    label,
    account,
    formated_date: `=FECHA(${date.format("YYYY,M,D")})`,
    date: date.format(dateFormat),
  };
  const response = await sheet.addRow(row).catch((e) => {
    return res
      .status(500)
      .json({ error: "Error creating row", message: e.message });
  });

  return res.status(201).json({
    record: response.record,
    amount: response.amount,
    category: response.category,
    subcategory: response.subcategory,
    label: response.label,
    account: response.account,
    formatedDate: response.formated_date,
    date: response.date,
  });
}

async function index(req, res) {
  const { googleDoc } = req;
  const query = req.query;
  const limit = parseInt(query.limit, 10) || 10;
  const page = parseInt(query.page, 10) || 1;

  const sheet = googleDoc.sheetsById[RECORDS_SHEET_ID];

  const rows = await sheet.getRows().catch((e) => {
    return res
      .status(500)
      .json({ error: "Error getting rows", message: e.message });
  });

  const fullResponse = rows.map((row) => ({
    name: row.record,
    amount: row.amount,
    category: row.category,
    subcategory: row.subcategory,
    label: row.label,
    account: row.account,
    date: dayjs.utc(row.date, dateFormat),
  }));
  const rowsLength = fullResponse.length;
  const numberOfPages = Math.ceil(rowsLength / limit);
  if (page > numberOfPages) {
    return res.status(200).json({
      count: rowsLength,
      data: [],
    });
  }
  const offset = page * limit;
  const from = rowsLength - offset;
  const to = from + limit;
  const response = fullResponse.slice(from > 0 ? from : 0, to);
  return res.status(200).json({
    count: rowsLength,
    data: response,
  });
}

module.exports = {
  create,
  index,
};
