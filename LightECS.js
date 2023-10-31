class Entity {
    constructor(){}

    addComponent(component) {
        if (this[component.name]) return
            this[component.name] = component;
            delete this[component.name].name
    }

    addComponents(components) {
        if (!Array.isArray(components)) return;

        for (const component of components) {
            this.addComponent(component);
        }
    }

    removeComponent(name){
        if (!this[name]) return
        delete  this[name]
    }

}

class Component {
    constructor(properties){
        for (let [key, value] of Object.entries(properties)) {
            if (typeof value === 'function') { console.log('Error: adding function to properties'); continue } 
            if (typeof value !== 'function') {
                this[key] = value;
            }
        }
    }
}

class System {
    constructor(){}

    addProperty(property){
        if(typeof property === 'function') return console.log('Error: adding function to properties');
        
        Object.assign(this, property)
    }

    addFunction(method) {
        if (typeof method === 'function' && method.name !== '') {
            this[method.name] = method.bind(this);
        }
    }

    addFunctions(methods) {
        if (!Array.isArray(methods)) return;

        for (const method of methods) {
            this.addFunction(method);
        }
    }
}
