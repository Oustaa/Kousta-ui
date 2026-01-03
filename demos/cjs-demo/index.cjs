const { getNestedProperty } = require("@ousta-ui/helpers");

const obj = {
  _id: 123,
  name: "usta ui",
  version: {
    number: 123,
    name: "@latest",
    date: {
      year: 2024,
      month: 11,
      days: [1, 292, 390, 4, 5],
    },
  },
  commande: {
    id: 3,
    ref: "CO2512-003",
    date_commande: "2025-12-23",
    client_id: 3,
    client: {
      id: 3,
      ref: "CU2512-0003",
      base: null,
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
console.log(getNestedProperty(obj, "commande.date_commande"));
