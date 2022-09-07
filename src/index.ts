const findNearestTag = (str: string): string => {
    let nearestTag = '';
    let nearestTagIndex = -1;
  
    const arrayOfTags = ['</h1>', '</h2>', '</h3>', '</h4>', '</h5>', '</p>', '</div>', '</span>'];
    arrayOfTags.forEach((tag) => {
      const indexOfTag = str.indexOf(tag);
  
      if (indexOfTag === -1) return;
  
      if (nearestTagIndex === -1) {
        nearestTag = tag;
        nearestTagIndex = indexOfTag;
        return;
      }
      if (indexOfTag < nearestTagIndex) {
        nearestTag = tag;
        nearestTagIndex = indexOfTag;
        return;
      }
    });
  
    return nearestTag;
  };
  
  const getTextAndTag = (str: string): TextBlock => {
    let text = '';
  
    const findOpenCarat = str.indexOf('<');
    const findCloseCarat = str.indexOf('>');
  
    const type: TextBlock['type'] = str.slice(findOpenCarat + 1, findCloseCarat);
  
    const closingTagIndex = str.indexOf(`</${type}>`);
    const openTagIndex = str.indexOf(`<${type}>`);
  
    text = str.slice(openTagIndex + type.length + 2, closingTagIndex);
  
    return {
      text,
      type,
    };
  };
  
  interface TextBlock {
    text: string | Array<TextBlock>;
    type: string;
  }
  
  const htmlStringToArray = (str: string): Array<TextBlock> => {
    if (str === null || str === undefined) return [];
    const parseString = (str: string, arr: Array<string> = []): Array<TextBlock> => {
      const nearestTag = findNearestTag(str);
  
      const endIndex = str.indexOf(nearestTag) + nearestTag.length;
  
      const currentString = str.substring(0, endIndex);
  
      arr.push(currentString);
  
      const newStr = str.slice(endIndex);
  
      if (newStr.length === 0) {
        return arr.map((item) => {
          return getTextAndTag(item);
        });
      } else {
        return parseString(newStr, arr);
      }
    };
  
    const initial = getTextAndTag(str);
  
    if (
      typeof initial.text === 'string' &&
      (initial.text.indexOf('<p>') === 0 || initial.text.indexOf('<span>') === 0)
    ) {
      return htmlStringToArray(initial.text);
    } else {
      return parseString(str);
    }
  };
  
  export default htmlStringToArray;
  