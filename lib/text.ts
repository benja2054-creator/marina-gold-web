/** "a, b y c" — lista en español */
export function joinList(items: string[], and = "y"): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`;
}
