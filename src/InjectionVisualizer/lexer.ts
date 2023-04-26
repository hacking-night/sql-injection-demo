
// source: https://www.regextester.com/?fam=110716
const REGEX = /(\b(?:select|from|where|group|by|order|or|and|not|exists|having|join|left|right|inner)\b)|([A-Za-z][A-Za-z0-9]*)|([0-9]+\.[0-9]*)|([0-9]+)|('[^']*')|(\s+)|(\-\-[^\n\r]*)|([+\-\*/.=\(\)])/gmi;

export type Token = {
  type: 'keyword' | 'identifier' | 'operator' | 'string' | 'integer' | 'decimal' | 'comment' | 'whitespace'
  text: string
}

const TOKEN_TYPES_BY_GROUP_INDEX: Array<Token['type'] | undefined> = [
  undefined, // group index starts at 1
  'keyword',
  'identifier',
  'decimal',
  'integer',
  'string',
  'whitespace',
  'comment',
  'operator'
]

export function tokenize(sql: string) {
  const matches = sql.matchAll(REGEX)
  const tokens: Token[] = []
    
  for (const match of matches) {
    const type = TOKEN_TYPES_BY_GROUP_INDEX[getFirstMatchedGroupIndex(match)]
    if (!type) {
      throw new Error("Unknown group index: " + getFirstMatchedGroupIndex(match))
    }
    tokens.push({ type, text: match[0] })
  }

  return tokens
}

function getFirstMatchedGroupIndex(match: RegExpMatchArray): number {
  for (let i = 1; i < match.length; i++) {
    if (match[i]) {
      return i
    }
  }
  throw new Error("No matching group")
}