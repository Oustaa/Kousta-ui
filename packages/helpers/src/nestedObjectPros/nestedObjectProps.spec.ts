import { getNestedProperty, updateNestedProperties } from "./index";

const obj = {
  _id: 234,
  first_name: "Oussama",
  last_name: "Tailba",
  name: "Kousta ui",
  versions: {
    number: 123,
    name: "@latest",
    date: {
      year: 2024,
      month: 11,
      days: [1, 2, 3, 4, 5],
    },
  },
};

describe("nestedObjectPros tests", () => {
  describe("getNestedProperty tests", () => {
    it("should return the correct value (Level 1)", () => {
      const value = getNestedProperty(obj, "name");

      expect(value).toBe("Kousta ui");
    });

    it("should concat _ and - ", () => {
      const value = getNestedProperty(obj, "first_name last_name");

      expect(value).toBe("Oussama Tailba");
    });

    it("should concat _ and -  2", () => {
      const value = getNestedProperty(obj, "first_name");

      expect(value).toBe("Oussama");
    });

    it("should concat _ and -  3", () => {
      const value = getNestedProperty(obj, "name _id");

      expect(value).toBe("Kousta ui 234");
    });

    it("should return the correct value (Level 2)", () => {
      const versionNumber = getNestedProperty(obj, "versions.number");
      expect(versionNumber).toBe(123);

      const versionName = getNestedProperty(obj, "versions.name");
      expect(versionName).toBe("@latest");
    });

    it("should return the correct value (Level 3)", () => {
      const level3year = getNestedProperty(obj, "versions.date.year");
      expect(level3year).toBe(2024);

      const level3Days = getNestedProperty(obj, "versions.date.days");
      expect(level3Days).toHaveLength(5);
    });
    it("should return the value with skiping special characters", () => {
      const specialSkipping = getNestedProperty(obj, "(name) (versions.name)");
      expect(specialSkipping).toBe("(Kousta ui) (@latest)");
    });
  });

  describe("updateNestedProperties tests", () => {
    it("should update a props (Level 1)", () => {
      const objUbdated = updateNestedProperties(obj, "name", "@kousta-ui");

      const objName = getNestedProperty(objUbdated, "name");

      expect(objName).toBe("@kousta-ui");
    });

    it("should update a props (Level 2)", () => {
      const objUbdated = updateNestedProperties(obj, "versions.name", "@LTS");

      const objName = getNestedProperty(objUbdated, "versions.name");

      expect(objName).toBe("@LTS");
    });

    it("should not update the original object", () => {
      updateNestedProperties(obj, "name", "@kousta-ui");

      const objName = getNestedProperty(obj, "name");

      expect(objName).toBe("Kousta ui");
    });
  });
});
