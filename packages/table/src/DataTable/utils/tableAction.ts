import { CanPerformAction, TActions, TOptions } from "../_props";

export function hasActions(
  actions?: TActions<unknown>,
  options?: TOptions<unknown>,
): boolean {
  return !!(
    ((actions || options?.extraActions) &&
      // has delete action
      ((actions?.delete &&
        actions.delete.canDelete &&
        typeof actions.delete.onDelete === "function") ||
        // has edit action
        (actions?.edit &&
          actions.edit.canEdit &&
          typeof actions.edit.onEdit === "function") ||
        // has extra actions
        (options &&
          options.extraActions &&
          options.extraActions?.length > 0))) ||
    options?.viewComp
  );
}

export function hasBulkActions(options?: TOptions<unknown>): boolean {
  return !!(options && options.bulkActions && options?.bulkActions?.length > 0);
}

export function hasDeleteAction(
  actions?: TActions<unknown>,
  row?: unknown,
): boolean {
  if (
    actions &&
    actions.delete &&
    typeof actions.delete.onDelete === "function" &&
    (actions.delete.canDelete === undefined ||
      (typeof actions.delete.canDelete === "function" &&
        actions.delete.canDelete?.(row)) ||
      (typeof actions.delete.canDelete === "boolean" &&
        actions.delete.canDelete))
  )
    return true;
  return false;
}

export function hasEditAction(
  actions: TActions<unknown> | undefined,
  row?: unknown,
): boolean {
  if (
    actions &&
    actions.edit &&
    typeof actions.edit.onEdit === "function" &&
    (typeof actions?.edit?.canEdit === "undefined" ||
      (typeof actions.edit.canEdit === "function" &&
        actions.edit.canEdit(row)) ||
      (typeof actions.edit.canEdit === "boolean" && actions.edit.canEdit))
  )
    return true;
  return false;
}

export function canPerformActionResolver<T>(
  row: T,
  actionPerms?: CanPerformAction<T>,
) {
  return (
    actionPerms === undefined ||
    (typeof actionPerms === "boolean" && actionPerms === true) ||
    (typeof actionPerms === "function" && actionPerms(row))
  );
}
