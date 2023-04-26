import { Alert, Table } from "solid-bootstrap";
import { For, Show } from "solid-js";
import initSqlJs from "sql.js";

const INIT_SQL = `
CREATE TABLE users (id int, name char, password char);
INSERT INTO users VALUES (1, 'erik', '123');
INSERT INTO users VALUES (2, 'admin', 'admin');
INSERT INTO users VALUES (3, 'justus', '111');
INSERT INTO users VALUES (4, 'peter', '222');
INSERT INTO users VALUES (5, 'bob', '333');
`;

const SQL = await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});

const db = new SQL.Database();
db.run(INIT_SQL);

export function DatabaseResult(props: { query: string }) {
  const execResult: () => { results: initSqlJs.QueryExecResult[], err?: unknown } = () => {
    try {
      return {results: db.exec(props.query)}
    } catch (err) {
      return {results: [], err}
    }
  }

  const user = () => execResult().results[0]?.values[0][1]

  return (
    <Show when={!execResult().err} fallback={<Alert variant="danger">{"" + execResult().err}</Alert>}>
      <Show when={user()} fallback={<Alert variant="warning">Invalid credentials</Alert>}>
        <Alert variant="success">Signed in as <b>{"" + user()}</b>.</Alert>
      </Show>
      <For each={execResult().results}>
        {(result) => (
          <Table striped bordered>
            <thead>
              <tr>
                <For each={result.columns}>{(column) => <th>{column}</th>}</For>
              </tr>
            </thead>
            <tbody>
              <For each={result.values}>
                {(row) => (
                  <tr>
                    <For each={row}>{(value) => <td>{"" + value}</td>}</For>
                  </tr>
                )}
              </For>
            </tbody>
          </Table>
        )}
      </For>
    </Show>
  );
}
