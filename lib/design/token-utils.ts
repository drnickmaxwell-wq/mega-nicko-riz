// lib/design/token-utils.ts
type Dict = Record<string, any>;

export function tokenColor(path: string, tokens: Dict) {
  // e.g. "primary.pink" -> tokens.colors.primary.pink
  const parts = path.split(".");
  let ref: any = tokens.colors;
  for (const p of parts) ref = ref?.[p];
  return typeof ref === "string" ? ref : undefined;
}

export function tokenGradient(path: string, tokens: Dict) {
  // e.g. "gradients.pinkToTurquoise" or "colors.gradients.pinkToTurquoise"
  const name = path.split(".").slice(-1)[0];
  const g = tokens.colors?.gradients?.[name];
  return typeof g === "string" ? g : undefined;
}

export function read(path: string, root: Dict) {
  // generic reader "backgrounds.light" -> tokens.colors.backgrounds.light
  const parts = path.split(".");
  let ref: any = root;
  for (const p of parts) ref = ref?.[p];
  return ref;
}
