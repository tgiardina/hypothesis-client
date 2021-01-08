const defaultColor = "yellow";
const colorMap = {
  "essential": "yellow",
  "policy makers": "green",
  "experts": "purple",
  "comparisons": "red",
}

/**
* Returns the colors associated with the given tags.
*
* @param {string[]} tags
*   A list of tags.
* @return {string[]}
*/
export function translateTags(tags) {
  const colorizedTags = Object.keys(colorMap);
  let colors = [];
  for(const tag of colorizedTags) {
    if(tags.includes(tag)) {
      colors.push(colorMap[tag]);
    }
  }
  if(!colors.length) colors.push(defaultColor);
  return colors;
}
