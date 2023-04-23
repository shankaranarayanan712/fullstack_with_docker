const { body, check } = require("express-validator");

export const validateBody: any = [
  body("foo").isString().trim().escape(),
  body("bar").optional().isString().trim().escape(),
  check("baz.*.lang").optional().isString().trim().escape()
];

