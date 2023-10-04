import CreateComponent from '../libs/component.js';

class Component {
    static props = ["logsize"];
    static setup() {
        console.log("setup", this);
        this.logsize = 100;
    };

    static render() {
        console.log("render", this);
        return `
            <div class="statusbar>
                <div class="horizontal">
                    <div>Строк лога: <span data-name="logsize">${this.logsize}</span> \u{1f50d}</div>
                    <button data-name="mybutton">Click me</button>
                </div>
            </div>
        `;
    };

    static run() {
        console.log("run", this);
        this._find('button').addEventListener("click", () => {
            this.logsize = 2000;
        });
        // this.logsize = 400;
    }

    static CSS = `:host {
        display: block;
        //   font-family: monospace;
        //   font-size: 0.8rem;
        //   padding: 0.5rem;
        border-bottom: 1px solid #000;
        }
    `;
}

// console.log("Component", [Component, new Component()]);

const StatusBar = CreateComponent('status-bar-ref', Component);
// console.log(StatusBar);

