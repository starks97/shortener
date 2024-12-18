/**
 * Retrieves the hex code of a color from a predefined color map.
 *
 * The function takes a string representing a color name (e.g., "red", "blue", "green")
 * and returns its corresponding hex value if found. If the color isn't present in the
 * `colorToHex` map, it will return `undefined`.
 *
 * @param color - A string representing the color name to lookup.
 *
 * @returns The hex color code as a string if found, otherwise `undefined`.
 *
 * @example
 * ```typescript
 * const hex = getHexColor("red");
 * console.log(hex); // "#FF0000"
 * ```
 */

const colorToHex: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
};

export default function getHexColor(color: string) {
  try {
    return colorToHex[color.toLowerCase()];
  } catch (e) {
    console.log(e);
  }
}
