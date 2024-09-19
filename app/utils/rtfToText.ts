export function rtfToText(rtf: string) {
  // Regular expression to match RTF control words, groups, hex codes, and text.
  const rtfRegex =
    /\\([a-z]+)(-?\d+)?[ ]?|\\'([0-9a-fA-F]{2})|[{}]|([^\\{}]+)/g;
  let match;
  let output = [];
  let stack = [];
  let unicodeSkip = 1; // Default Unicode character count to skip

  while ((match = rtfRegex.exec(rtf)) !== null) {
    if (match[0] === "{") {
      // Push current output length to stack to manage groups
      stack.push(output.length);
    } else if (match[0] === "}") {
      // On closing brace, reset the output to the state before the last group
      stack.pop();
    } else if (match[0][0] === "\\") {
      if (match[1] === "par" || match[1] === "line") {
        // Handle paragraph and line breaks
        output.push("\n");
      } else if (match[1] === "tab") {
        // Handle tab characters
        output.push("\t");
      } else if (match[1] === "uc") {
        // Handle the 'uc' keyword that defines how many characters to skip after Unicode characters
        unicodeSkip = parseInt(match[2]) || 1;
      } else if (match[1] === "'") {
        // Handle hex encoded characters
        output.push(String.fromCharCode(parseInt(match[3], 16)));
      } else if (match[1] === "u") {
        // Handle Unicode characters like \u1234?
        let unicodeChar = String.fromCharCode(parseInt(match[2]));
        output.push(unicodeChar);

        // Skip the next `unicodeSkip` characters
        rtfRegex.lastIndex += unicodeSkip;
      } else {
        // Handle other control words (skip them)
      }
    } else {
      // Regular text
      output.push(match[0]);
    }
  }
  return output.join("");
}
