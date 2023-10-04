// Status bar component
// Path: components/status_bar.js

class StatusBar extends HTMLElement {
    static observedAttributes = ["logsize"];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attributeChangedCallback", name, oldValue, newValue, this);
        if(oldValue === newValue) return;
        this.shadowRoot.innerHTML = this.render();
    }

    render() {
        const logsize = this.getAttribute("logsize");
        return `
            <style>${CSS}</style>
            <div class="statusbar>
                <div class="horizontal">
                    <div>Строк лога: <span data-name="logsize">${logsize}</span> \u{1f50d}</div>
                </div>
            </div>
        `;
    }

    CSS = `:host {
        display: block;
        //   font-family: monospace;
        //   font-size: 0.8rem;
        //   padding: 0.5rem;
        border-bottom: 1px solid #000;
        }
    `;

}

customElements.define('status-bar', StatusBar);
