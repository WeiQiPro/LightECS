class Entity {
    constructor(){
        this.id = ULECSID()
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

function ULECSID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    function generateRandomChars(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function convertToBase62(num) {
        let result = '';
        while (num) {
            result = chars[num % 62] + result;
            num = Math.floor(num / 62);
        }
        return result || '0';  // Handle the case when num is 0
    }

    // Get last 5 digits of Date.now() in base 62
    const firstUniqueString = convertToBase62(Date.now() % 100000);
    const secondUniqueString = generateRandomChars(20);  // 20 chars for the rest of the ID

    return firstUniqueString + "-" + secondUniqueString.match(/.{5}/g).join('-')
}
