export function isNodeAChild(
  parent: Node | null | undefined,
  target: Node | null | undefined,
): boolean {
  if (!parent || !target) return false;
  if (parent === target) return true;

  const children = parent.childNodes;

  if (children.length === 0) return false;

  for (let index = 0; index < children.length; index++) {
    const result = isNodeAChild(children[index], target);
    if (result) return true;
  }

  return false;
}
