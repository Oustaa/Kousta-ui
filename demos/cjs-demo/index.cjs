const { getNestedProperty } = require("@kousta-ui/helpers");

const obj = {
  _id: 123,
  name: "Kousta ui",
  version: {
    number: 123,
    name: "@latest",
    date: {
      year: 2024,
      month: 11,
      days: [1, 292, 390, 4, 5],
    },
  },
};

console.log(getNestedProperty(obj, "(name) (version.name)"));
console.log(getNestedProperty(obj, "version.date.year | name"));
console.log(getNestedProperty(obj, "name _id"));
console.log(getNestedProperty(obj, "version.date.days.9"));
console.log(getNestedProperty(obj, "version.date.days.1"));
console.log(
  getNestedProperty(obj, "(version.date.days.1) (version.date.days.2)"),
);
