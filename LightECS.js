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

class Graphic2d {
    static DEFAULT_WIDTH = 1280;
    static DEFAULT_HEIGHT = 720;

    constructor(config = {}) {
        this.canvas = this.createCanvas(config.width, config.height);
        this.context = this.canvas.getContext('2d');
    }

    addFunction(method) {
        if (typeof method === 'function' && method.name !== '') {
            this[method.name] = method.bind(this);
        }
    }

    addProperty(property){
        if(typeof property === 'function') return console.log('Error: adding function to properties');
        
        Object.assign(this, property)
    }

    createCanvas(width = Graphic2d.DEFAULT_WIDTH, height = Graphic2d.DEFAULT_HEIGHT) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas); // Optionally attach it to the body or any other container
        return canvas;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    arc(x, y, radius, startAngle, endAngle, fillColor = null, strokeColor = 'black', strokeWidth = 1) {
        this.context.beginPath();
        this.context.arc(x, y, radius, startAngle, endAngle);
        this.context.closePath();
    
        if (fillColor) {
            this.context.fillStyle = fillColor;
            this.context.fill();
        }
        if (strokeColor) {
            this.context.strokeStyle = strokeColor;
            this.context.lineWidth = strokeWidth;
            this.context.stroke();
        }
    }
  
    circle(x, y, radius, fillColor = null, strokeColor = 'black', strokeWidth = 1) {
        this.arc(x, y, radius, 0, 2 * Math.PI, fillColor, strokeColor, strokeWidth);
    }

    ellipse(x, y, radiusX, radiusY, rotation = 0, startAngle = 0, endAngle = 2 * Math.PI, fillColor = null, strokeColor = 'black', strokeWidth = 1) {
        this.context.beginPath();
        this.context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
        this.context.closePath();
    
        if (fillColor) {
            this.context.fillStyle = fillColor;
            this.context.fill();
        }
        if (strokeColor) {
            this.context.strokeStyle = strokeColor;
            this.context.lineWidth = strokeWidth;
            this.context.stroke();
        }
    }
    
    image(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    line(x1, y1, x2, y2, color = 'black', strokeWidth = 1) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.strokeStyle = color;
        this.context.lineWidth = strokeWidth;
        this.context.stroke();
    }
    
    point(x, y, color = 'black') {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
    }
    
    quad(x1, y1, x2, y2, x3, y3, x4, y4, fillColor = null, strokeColor = 'black', strokeWidth = 1) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.lineTo(x4, y4);
        this.context.closePath();
        
        if (fillColor) {
            this.context.fillStyle = fillColor;
            this.context.fill();
        }
        if (strokeColor) {
            this.context.strokeStyle = strokeColor;
            this.context.lineWidth = strokeWidth;
            this.context.stroke();
        }
    }

    rect(x, y, width, height, fillColor = null, strokeColor = 'black', strokeWidth = 1) {
        if (fillColor) {
            this.context.fillStyle = fillColor;
            this.context.fillRect(x, y, width, height);
        }
        if (strokeColor) {
            this.context.strokeStyle = strokeColor;
            this.context.lineWidth = strokeWidth;
            this.context.strokeRect(x, y, width, height);
        }
    }

    square(x, y, sideLength, fillColor = null, strokeColor = 'black', strokeWidth = 1) {
        this.rect(x, y, sideLength, sideLength, fillColor, strokeColor, strokeWidth);
    }

    triangle(x1, y1, x2, y2, x3, y3, fillColor = null, strokeColor = 'black', strokeWidth = 1) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.closePath();
    
        if (fillColor) {
            this.context.fillStyle = fillColor;
            this.context.fill();
        }
        if (strokeColor) {
            this.context.strokeStyle = strokeColor;
            this.context.lineWidth = strokeWidth;
            this.context.stroke();
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

module.export = { Entity, Component, System, ULECSID }
