/**
 * Get the subcategory name based on the account name.
 * @param {Object} params
 * @param {'Cetes'|'Mis Metas'|'Nómina'|'Efectivo'|'Tarjeta Nu'|'Banamex Oro'|'Banamex Costco'|'Banorte Oro'|'Banorte Débito'|'HSBC 2Now'} params.account - account name
 * @param {'from'|'to'} params.type - type of transfer
 * @returns {string}
 *
 * @throws {Error} if the type is not 'from' or 'to'
 *
 */
function getSubCategoryNameForTransfer({ account, type }) {
  if (type !== "from" && type !== "to") {
    throw new Error('type must be either "from" or "to"');
  }
  const mismatchSubcategoryName = {
    "Tarjeta Nu": "Nu Bank",
  };
  const mismatchName = mismatchSubcategoryName[account];
  const name = mismatchName || account;
  const arrow = type === "from" ? "<-" : "->";
  return `Transferencia ${arrow} ${name}`;
}

module.exports = {
  getSubCategoryNameForTransfer,
};
