import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import './components/status_bar.js'
import './components/status_bar_ref.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))


// Create web component namen LogLine
class LogLine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: monospace;
          font-size: 0.8rem;
          padding: 0.5rem;
          border-bottom: 1px solid #ccc;
        }
      </style>
      <slot></slot>
    `;
  }
}

// Register web component
customElements.define('log-line', LogLine);

document.querySelector('#app').innerHTML = `
  <log-line>Log line 1 \u{2573}</log-line>
  <status-bar id="statusbar" logsize="100"></status-bar>
  <button id="counter" type="button">Set to 200</button>
  <status-bar-ref id="statusbar2" logsize="100"></status-bar-ref>
  <button id="counter2" type="button">Set to 300</button>
`;

const button = document.querySelector('#counter');
button.addEventListener('click', () => {
  const statusbar = document.querySelector('#statusbar');
  statusbar.setAttribute('logsize', 200);
});

document.querySelector('#counter2').addEventListener('click', () => {
  const statusbar = document.querySelector('#statusbar2');
  statusbar.setAttribute('logsize', 300);
});