//Function to obtain the opposite color
export default function invertHexColor(hex: string) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r: any = parseInt(hex.slice(0, 2), 16),
    g: any = parseInt(hex.slice(2, 4), 16),
    b: any = parseInt(hex.slice(4, 6), 16);

  if (r * 0.299 + g * 0.587 + b * 0.114 > 165) {
    return '#232F3E';
  } else {
    return '#FFFFFF';
  }
}
