import { tokenize } from "./lexer"
import "./InjectionVisualizer.css"
import { JSXElement } from "solid-js"

export type VulenerableSql = Array<{ type: 'static' | 'dynamic', text: string }>

export function InjectionVisualizer(props: { sql: VulenerableSql }) {
  const children = () => {
    const sqlString = props.sql.map(p => p.text).join('')

    // We tokenize the SQL string and then split each token into its individual characters
    // An enclosing span is added for syntax highlighting
    const characters = tokenize(sqlString)
      .flatMap(token => token.text.split('').map(c => ({ type: token.type, text: c })))
      .map(token => <span class={token.type}>{token.text}</span>)
    
    const children: JSXElement[] = []
    let characterOffset = 0

    // We go through the characters of each part (static/dynamic) of the SQL and enclose them with another span
    // This way, we can visualize the dynamic parts, independent of the actual token at each position
    for (const part of props.sql) {
      const partCharacters = characters
        .slice(characterOffset, characterOffset + part.text.length)
      
      children.push(<span class={part.type}>{...partCharacters}</span>)

      characterOffset += part.text.length
    }

    return children
  }

  

  

      
  // 

  return <div class="sql">{...children()}</div>
}