import {
  canPerformActionResolver,
  hasActions,
  hasDeleteAction,
  hasEditAction,
} from "./tableAction";

describe("table actions presence helpers", () => {
  describe("table actions helper", () => {
    it("canPerformActionResolver should return true in case of undefined bassed", () => {
      const result = canPerformActionResolver({}, undefined);
      expect(result).toBe(true);
    });

    it("canPerformActionResolver should return true in case true passed", () => {
      const result = canPerformActionResolver({}, true);
      expect(result).toBe(true);
    });

    it("canPerformActionResolver should return false in case false passed", () => {
      const result = canPerformActionResolver({}, false);
      expect(result).toBe(false);
    });

    it("canPerformActionResolver should call function in case function passed", () => {
      const func = jest.fn();
      canPerformActionResolver({}, func);
      expect(func).toHaveBeenCalled();
    });

    it("canPerformActionResolver should return function result in case function passed", () => {
      const result = canPerformActionResolver(
        { age: 12 },
        (row) => row.age >= 12,
      );
      expect(result).toBe(true);
    });
  });

  describe("hasActions", () => {
    it("returns false when options is undefined", () => {
      expect(hasActions(undefined)).toBe(false);
    });

    it("returns false when actions missing and no extraActions", () => {
      expect(hasActions({})).toBe(false);
    });

    it("returns true when valid delete action exists (boolean canDelete = true)", () => {
      const actions = {
        delete: { canDelete: true, onDelete: jest.fn() },
      };

      expect(hasActions(actions)).toBe(true);
    });

    it("returns true when valid delete action exists (function canDelete)", () => {
      const actions = {
        delete: { canDelete: () => true, onDelete: jest.fn() },
      };

      expect(hasActions(actions)).toBe(true);
    });

    it("returns true when valid edit action exists", () => {
      const actions = {
        edit: { canEdit: true, onEdit: jest.fn() },
      };

      expect(hasActions(actions)).toBe(true);
    });

    it("returns true when extraActions is non-empty", () => {
      const options = {
        extraActions: [{ key: "x", title: "Do X", onClick: jest.fn() }],
      };
      expect(hasActions({}, options)).toBe(true);
    });

    it("returns false when delete is invalid (missing onDelete)", () => {
      const actions = {
        delete: { canDelete: true },
      } as any;

      expect(hasActions(actions)).toBe(false);
    });

    it("returns false when edit is invalid (missing onEdit)", () => {
      const actions = {
        edit: { canEdit: true },
      } as any;

      expect(hasActions(actions)).toBe(false);
    });

    it("returns false when extraActions is empty array", () => {
      const options = { extraActions: [] };
      expect(hasActions({}, options)).toBe(false);
    });

    it("canPerformActionResolver should return true if options has only ViewComp", () => {
      const options = {
        viewComp: {},
      } as any;

      expect(hasActions({}, options)).toBe(true);
    });
  });

  describe("hasDeleteAction", () => {
    const row = { id: 1, age: 12 };

    it("returns false when options is undefined", () => {
      expect(hasDeleteAction(undefined, row)).toBe(false);
    });

    it("returns false when delete action missing", () => {
      expect(hasDeleteAction({}, row)).toBe(false);
    });

    it("returns false when onDelete is not a function", () => {
      const options = {
        actions: {
          delete: { canDelete: true, onDelete: null },
        },
      };
      expect(hasDeleteAction(options as any, row)).toBe(false);
    });

    it("returns true when canDelete = true and onDelete is function", () => {
      const actions = {
        delete: { canDelete: () => true, onDelete: jest.fn() },
      };

      expect(hasDeleteAction(actions, row)).toBe(true);
    });

    it("returns false when canDelete = false", () => {
      const actions = {
        delete: { canDelete: false, onDelete: jest.fn() },
      };

      expect(hasDeleteAction(actions, row)).toBe(false);
    });

    it("returns true when canDelete(row) returns true and calls predicate with row", () => {
      const canDelete = jest.fn(() => false);
      const actions = {
        delete: { canDelete, onDelete: jest.fn() },
      };

      expect(hasDeleteAction(actions, row)).toBe(false);
      expect(canDelete).toHaveBeenCalledWith(row);
    });

    it("should returns true if canDelete is undefined", () => {
      const actions = {
        delete: { onDelete: jest.fn() },
      };

      expect(hasDeleteAction(actions, row)).toBe(true);
    });

    it("should returns what canDelete(row) returns", () => {
      const actions = {
        delete: { canDelete: () => false, onDelete: jest.fn() },
      };

      expect(hasDeleteAction(actions, row)).toBe(false);
    });
  });

  describe("hasEditAction", () => {
    it("returns false when options is undefined", () => {
      expect(hasEditAction(undefined)).toBe(false);
    });

    it("returns false when edit action missing", () => {
      expect(hasEditAction({})).toBe(false);
    });

    it("returns false when onEdit is not a function", () => {
      const options = {
        actions: {
          edit: { canEdit: true, onEdit: null },
        },
      };
      expect(hasEditAction(options as any)).toBe(false);
    });

    it("returns false when canEdit = false", () => {
      const actions = {
        edit: { canEdit: false, onEdit: jest.fn() },
      };

      expect(hasEditAction(actions)).toBe(false);
    });

    it("should return true if canEdit is undefined", () => {
      const actions = {
        edit: { onEdit: jest.fn() },
      };

      expect(hasEditAction(actions)).toBe(true);
    });

    it("should return what canEdit(row) returns", () => {
      const actions = {
        edit: { canEdit: () => false, onEdit: jest.fn() },
      };

      expect(hasEditAction(actions)).toBe(false);
    });
  });
});
