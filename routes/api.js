"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const converter = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    if (!input) {
      return res.send("invalid input");
    }

    const initialNumber = converter.getNum(input);
    const initialUnit = converter.getUnit(input);

    if (initialNumber === "invalid number" && initialUnit === "invalid unit") {
      return res.send("invalid number and unit");
    }
    if (initialNumber === "invalid number") {
      return res.send("invalid number");
    }
    if (initialUnit === "invalid unit") {
      return res.send("invalid unit");
    }

    const convertedUnit = converter.getReturnUnit(initialUnit);
    const convertedNumber = converter.convert(initialNumber, initialUnit);
    const resultString = converter.getString(
      initialNumber,
      initialUnit,
      convertedNumber,
      convertedUnit
    );

    res.json({
      initNum: initialNumber,
      initUnit: initialUnit,
      returnNum: convertedNumber,
      returnUnit: convertedUnit,
      string: resultString,
    });
  });
};
