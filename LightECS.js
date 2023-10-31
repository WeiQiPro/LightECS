class Entity {
    constructor(){
        this.id = randomID()
        this.tag = []
    }

    addTag(tag) {
        this.tags.push(tag);
    }

    hasTag(tag) {
        return this.tags.includes(tag);
    }

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
    constructor(properties) {
        if (!properties.name) {
            throw new Error("Component must have a name property.");
        }
        
        for (let [key, value] of Object.entries(properties)) {
            if (typeof value === 'function') {
                console.error('Error: adding function to properties');
                continue;
            } 
            this[key] = value;
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

function randomID() {

    function getRandomChar() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    function getSegment() {
        return Array.from({ length: 5 }, getRandomChar).join('');
    }

    return Array.from({ length: 5 }, getSegment).join('-');
}
