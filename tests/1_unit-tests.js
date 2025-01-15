const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const converter = new ConvertHandler();

suite("Unit Tests", function () {
  test("Should correctly process valid whole number input", () => {
    assert.strictEqual(
      converter.getNum("2kg"),
      2,
      "Successfully reads valid whole number input"
    );
  });

  test("Should correctly process valid decimal input", () => {
    assert.strictEqual(
      converter.getNum("2.5lbs"),
      2.5,
      "Successfully reads valid decimal input"
    );
  });

  test("Should correctly process valid fractional input", () => {
    assert.strictEqual(
      converter.getNum("1/5kg"),
      0.2,
      "Successfully reads valid fractional input"
    );
  });

  test("Should correctly process fractional input with decimal", () => {
    assert.strictEqual(
      converter.getNum("0.2/0.5kg"),
      0.4,
      "Successfully reads valid fractional input with decimal"
    );
  });

  test("Should return error for invalid double fraction input", () => {
    assert.strictEqual(
      converter.getNum("2/2/7kg"),
      "invalid number",
      "Returns error for invalid double fraction input"
    );
  });

  test("Should default to 1 for input with no numeric value", () => {
    assert.strictEqual(
      converter.getNum("lbs"),
      1,
      "Defaults to 1 when numeric input is not provided"
    );
  });

  test("Should correctly identify valid input units", () => {
    assert.strictEqual(converter.getUnit("2gal"), "gal", "Reads 'gal'");
    assert.strictEqual(converter.getUnit("2L"), "L", "Reads 'L'");
    assert.strictEqual(converter.getUnit("2mi"), "mi", "Reads 'mi'");
    assert.strictEqual(converter.getUnit("2km"), "km", "Reads 'km'");
    assert.strictEqual(converter.getUnit("2lbs"), "lbs", "Reads 'lbs'");
    assert.strictEqual(converter.getUnit("2kg"), "kg", "Reads 'kg'");
  });

  test("Should return error for invalid input units", () => {
    assert.strictEqual(
      converter.getUnit("2invalidUnit"),
      "invalid unit",
      "Returns error for invalid unit input"
    );
  });

  test("Should correctly return corresponding units for valid input", () => {
    assert.strictEqual(converter.getReturnUnit("gal"), "L", "Maps 'gal' to 'L'");
    assert.strictEqual(converter.getReturnUnit("L"), "gal", "Maps 'L' to 'gal'");
    assert.strictEqual(converter.getReturnUnit("mi"), "km", "Maps 'mi' to 'km'");
    assert.strictEqual(converter.getReturnUnit("km"), "mi", "Maps 'km' to 'mi'");
    assert.strictEqual(converter.getReturnUnit("lbs"), "kg", "Maps 'lbs' to 'kg'");
    assert.strictEqual(converter.getReturnUnit("kg"), "lbs", "Maps 'kg' to 'lbs'");
  });

  test("Should correctly spell out units for valid input units", () => {
    assert.strictEqual(
      converter.spellOutUnit("GAL"),
      "gal",
      "Returns 'gal' for input 'GAL'"
    );
    assert.strictEqual(
      converter.spellOutUnit("l"),
      "L",
      "Returns 'L' for input 'l'"
    );
    assert.strictEqual(
      converter.spellOutUnit("MI"),
      "mi",
      "Returns 'mi' for input 'MI'"
    );
    assert.strictEqual(
      converter.spellOutUnit("KM"),
      "km",
      "Returns 'km' for input 'KM'"
    );
    assert.strictEqual(
      converter.spellOutUnit("LBS"),
      "lbs",
      "Returns 'lbs' for input 'LBS'"
    );
    assert.strictEqual(
      converter.spellOutUnit("KG"),
      "kg",
      "Returns 'kg' for input 'KG'"
    );
  });

  test("Should convert gal to L", () => {
    assert.strictEqual(
      converter.convert(2, "gal"),
      7.57082,
      "Converts 2gal to 7.57082L"
    );
  });

  test("Should convert L to gal", () => {
    assert.strictEqual(
      converter.convert(2, "L"),
      0.52834,
      "Converts 2L to 0.52834gal"
    );
  });

  test("Should convert mi to km", () => {
    assert.strictEqual(
      converter.convert(2, "mi"),
      3.21868,
      "Converts 2mi to 3.21868km"
    );
  });

  test("Should convert km to mi", () => {
    assert.strictEqual(
      converter.convert(2, "km"),
      1.24275,
      "Converts 2km to 1.24275mi"
    );
  });

  test("Should convert lbs to kg", () => {
    assert.strictEqual(
      converter.convert(2, "lbs"),
      0.90718,
      "Converts 2lbs to 0.90718kg"
    );
  });

  test("Should convert kg to lbs", () => {
    assert.strictEqual(
      converter.convert(2, "kg"),
      4.40925,
      "Converts 2kg to 4.40925lbs"
    );
  });
});