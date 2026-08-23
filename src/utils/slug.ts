export function stripExt(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

export function slugify(fileName: string) {
  return stripExt(fileName)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

export function titleize(fileName: string) {
  return stripExt(fileName).replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}
