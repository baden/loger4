export default function CreateComponent (name, Component) {
    console.log("CreateComponent", name, Component, Component.prototype);
    // class ReactiveElement extends HTMLElement {
    // }

    class ReactiveElement extends HTMLElement {
        static observedAttributes = Component.props;
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            // const logsize = this.getAttribute("logsize");
            // this.shadowRoot.innerHTML = Component.render.call({logsize});
        }

        connectedCallback () {
            console.log("connectedCallback", this);
            // Get element's props
            const props = {}
            Array.from(this.attributes).forEach(
                attr => (props[attr.nodeName] = attr.nodeValue)
            );
            console.log("props", props);

            // Attach helper methods to state
            let state = Object.create({
                _elem: this,
                _find: sel => this.querySelector(sel),
                _slot: this.innerHTML
            });

            // Add proxy to state and watch for changes
            state = new Proxy(state, {
                set: (obj, prop, value) => {
                    const result = Reflect.set(obj, prop, value)
                    renderElement()
                    return result;
                }
            });
            console.log("state", state);

            // Render to body method
            let rendering = false;
            const renderElement = () => {
                if (rendering === false) {
                    rendering = true;
                    this.shadowRoot.innerHTML = Component.render.call(state, props);
                    console.log("renderElement", this.innerHTML);
                    if(Component.run) Component.run.call(state, props);
                    rendering = false;
                }
            };

            // Run component
            if(Component.setup) Component.setup.call(state, props);
            renderElement();
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            console.log("attributeChangedCallback", name, oldValue, newValue, this);
            if(oldValue === newValue) return;
            const logsize = this.getAttribute("logsize");
            this.shadowRoot.innerHTML = Component.render({logsize});
        }
   
    }
    
    customElements.define(name, ReactiveElement);
}
