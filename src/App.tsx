import { Accordion, Alert } from "solid-bootstrap";
import { Component, createEffect, createSignal, ErrorBoundary } from "solid-js";
import Highlight from "solid-highlight";
import "highlight.js/styles/default.css";
import {
  InjectionVisualizer,
  VulenerableSql,
} from "./InjectionVisualizer/InjectionVisualizer";
import { DatabaseResult } from "./DatabaseResult/DatabaseResult";

const code = `username = getRequestString("username")
password = getRequestString("password")

sql = "SELECT * FROM users WHERE name = '" + username + "' AND password = '" + password + "'"
`;

const App: Component = () => {
  const [username, setUsername] = createSignal("erik");
  const [password, setPassword] = createSignal("123");

  const sql: () => VulenerableSql = () => [
    { type: "static", text: "SELECT * FROM users WHERE name = '" },
    { type: "dynamic", text: username() },
    { type: "static", text: "' AND password = '" },
    { type: "dynamic", text: password() },
    { type: "static", text: "'" },
  ];

  const sqlString = () =>
    sql()
      .map((p) => p.text)
      .join("");

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
      }}
      class="mt-5 mb-5"
    >
      <div style={{ width: "300px" }}>
        <form>
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
          <input type="text" style="display:none" />
          <input type="password" style="display:none" />

          <div class="form-floating mb-1">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              value={username()}
              onInput={(e) => setUsername(e.currentTarget.value)}
              autocomplete="nope"
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              autocomplete="new-password"
            />
            <label for="floatingPassword">Password</label>
          </div>
        </form>
      </div>
      <Accordion style={{ width: "1200px" }} class="mt-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Code</Accordion.Header>
          <Accordion.Body>
            <Highlight autoDetect={true} class="fs-5">
              {code}
            </Highlight>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion style={{ width: "1200px" }} class="mt-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>SQL</Accordion.Header>
          <Accordion.Body>
            <InjectionVisualizer sql={sql()} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion style={{ width: "1200px" }} class="mt-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Result</Accordion.Header>
          <Accordion.Body>
            <DatabaseResult query={sqlString()} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default App;
