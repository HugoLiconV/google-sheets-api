const dayjs = require("dayjs");

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
  console.log(
    "🚀 ~ file: controller.js ~ line 14 ~ create ~ req.body",
    req.body
  );
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
  const date = dayjs(formatedDate, "YYYY-MM-DD");
  if (!date.isValid()) {
    return res.status(400).json({ error: `formatedDate is not a valid date` });
  }

  const RECORDS_SHEET_ID = "1295926321";
  const sheet = googleDoc.sheetsById[RECORDS_SHEET_ID];
  const response = await sheet
    .addRow({
      record,
      amount,
      category,
      subcategory,
      label,
      account,
      formated_date: `=FECHA(${date.format("YYYY,M,D")})`,
      date: date.format("YYYY-MM-DD"),
    })
    .catch((e) => {
      console.log("🚀 ~ file: controller.js ~ line 52 ~ create ~ e", e);
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

module.exports = {
  create,
};
