export function getBase(relativePath = "") {
  const base = new URL("..", import.meta.url);
  return new URL(
    relativePath.startsWith("/") ? `.${relativePath}` : relativePath,
    base,
  ).pathname;
}
