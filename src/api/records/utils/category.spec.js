const { getSubCategoryNameForTransfer } = require("./category");

describe("getSubCategoryNameForTransfer fn", () => {
  it("should return the subcategory name for a transfer", () => {
    expect(
      getSubCategoryNameForTransfer({
        account: "Cetes",
        type: "from",
      })
    ).toBe("Transferencia <- Cetes");
    expect(
      getSubCategoryNameForTransfer({
        account: "Cetes",
        type: "to",
      })
    ).toBe("Transferencia -> Cetes");
  });
  it("should handle account mismatches", () => {
    expect(
      getSubCategoryNameForTransfer({
        account: "Tarjeta Nu",
        type: "to",
      })
    ).toBe("Transferencia -> Nu Bank");
  });

  it("should throw an error if the type is not 'from' or 'to'", () => {
    expect(() =>
      getSubCategoryNameForTransfer({
        account: "Cetes",
        type: "invalid",
      })
    ).toThrow(new Error('type must be either "from" or "to"'));
  });

  it("should throw an error if the account is not one of the expected values", () => {
    expect(() =>
      getSubCategoryNameForTransfer({
        account: "invalid",
        type: "to",
      })
    ).toThrow(new Error(`Invalid account name: invalid`));
  });
});
