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
