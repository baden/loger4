export default function CreateComponent (name, Component) {
    // console.log("CreateComponent", name, Component, Component.prototype);
    // class ReactiveElement extends HTMLElement {
    // }

    class ReactiveElement extends HTMLElement {
        static observedAttributes = Component.props;
        constructor() {
            super();
            console.log("constructor", this);
            this.attachShadow({ mode: 'open' });
            // const logsize = this.getAttribute("logsize");
            // this.shadowRoot.innerHTML = Component.render.call({logsize});
            this.rendering = false;
        }

        connectedCallback () {
            console.log("connectedCallback", this, this.attributes);
            // Get element's props
            this.props = {}
            Array.from(this.attributes).forEach(
                attr => (this.props[attr.nodeName] = attr.nodeValue)
            );
            console.log("props:", this.props);

            // Attach helper methods to state
            this.state = Object.create({
                _elem: this,
                _find: sel => this.shadowRoot.querySelector(sel),
                _slot: this.shadowRoot.innerHTML
            });
            // Add proxy to state and watch for changes
            this.state = new Proxy(this.state, {
                set: (obj, prop, value) => {
                    const result = Reflect.set(obj, prop, value)
                    //renderElement()
                    this.render();
                    return result;
                }
            });
            console.log("state", this.state);

            // Run component
            if(Component.setup) Component.setup.call(this.state, this.props);
            this.render();
        }

        // Render to body method
        render() {
            console.log("render", this);
            if (this.rendering) return;
            this.rendering = true;
            this.shadowRoot.innerHTML = Component.render.call(this.state, this.props);
            console.log("renderElement", this.innerHTML);
            if(Component.run) Component.run.call(this.state, this.props);
            this.rendering = false;
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            if(oldValue === newValue) return;
            // if(newValue === null) return;
            // if(oldValue === null) return;
            console.log("attributeChangedCallback", name, oldValue, newValue, this);
            if(this.state) this.state[name] = newValue;
            // this.render();
            // const logsize = this.getAttribute("logsize");
            // this.shadowRoot.innerHTML = Component.render({logsize});
        }
   
    }
    
    customElements.define(name, ReactiveElement);
}
