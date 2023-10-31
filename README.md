# LightECS

A lightweight, modular ECS (Entity-Component-System) engine.

**Why LightECS?**  
Unlike many ECS frameworks, LightECS offers a blend of simplicity and modularity without over-complicating the architecture. This allows developers to swiftly integrate it into their projects while retaining the flexibility to extend as needed.

## Installation:

- Clone the GitHub repository:
```bash
git clone https://github.com/WeiQiPro/LightECS
```
- OR download the main file directly
---

## Quick Setup
### Returns
  An object containing:

  - Entity: The Entity class.
  - Component: The Component class.
  - System: The System class.
  - Graphic2d: The Canvas class.
  - Animation: The Animation Class.
  - newEntity: A default entity instance with added components.
  - newSystem: A default system instance with added functions.
  - newGraphic2d: An instance of the Canvas, set up with provided or default configurations.
  - addComponentsToEntity(entity, comps): A utility function to add multiple components to a given entity.
  - addFunctionsToSystem(system, funcs): A utility function to add multiple functions to a given system.
  - addSpriteComponent(entity, sprite properties): A utility function to add sprite to an entity.

```js
import { instantiateLightECS } from 'LightECS';

const ECS = instantiateLightECS();

// Create custom entities and components
const healthComponent = new ECS.Component({ name: 'health', health: 100 });
const playerEntity = new ECS.Entity();
playerEntity.addComponent(healthComponent);

// Or use instances directly
ECS.entityInstance.addComponents([healthComponent]);
```
---


## Usage:

## Components:
- Components is strictly data driven object. You shouldn't push functions through, a console dialog will return that you tried.

```js
const HealthComponent = (int) => {
    return new Component({
        name: 'health',
        max: int,
        current: int
    });
};

const EnergyShieldComponent = (int, defense, type, reflect = false) => {
    return new Component({
        name: 'EnergyShield',
        durability: int,
        defense: defense,
        type: type,
        ...(reflect ? { reflect: true } : {})
    });
};
```
---

## Entities:
### Functionality:
  - addComponent adds a singular component.
  - addComponents will take an array of components.
  - removeComponent takes in a name and removes it from the entity.
  - addTag to give entity a tag
  - hasTag to see entity's tags
  - Entity has an unique ID of 23 random characters

```js
const Player = new Entity;

Player.addComponent(HealthComponent(100));
Player.addComponent(EnergyShieldComponent(10, 25, 'Energy', true));
Player.removeComponent('Health');
```
---

## Systems:
### Functionality:
  - addProperty is meant to allow the developer to create a property with needed.
  - addFunction adds a singular function that can implement "this." within itself.
  - addFunctions takes and array of functions and adds them to the class.


```js
const DamageSystem = new System;

DamageSystem.addFunction(function successfulHit(attacker, defender) {
    if(attacker.attack && defender.health) {
        defender.health.current -= attacker.attack.value; 
    }
});

const EntityManager = new System;

EntityManager.addProperty({ entities: [] });
EntityManager.addFunction(function createEntity() {
    const entity = new Entity();
    this.entities.push(entity);
    return entity;
});

EntityManager.addFunction(function getEntitiesWithComponent(componentName) {
    return this.entities.filter(entity => entity[componentName]);
});
```
---
## Graphic2d:
### Functionality:
### General

- **addFunction(method)**: Add a function as a method to the Canvas instance
- **addProperty(property)**: Add properties to the Canvas instance
- **createCanvas([width], [height])**: Create an HTML canvas element
- **clearCanvas()**: Clear the canvas

### Drawing
Brackets are optional but also have a default value of `strokeColor = "black"` and `strokeWidth = 1`
- **arc(x, y, radius, startAngle, endAngle, [fillColor], [strokeColor], [strokeWidth])**: Draw an arc
- **circle(x, y, radius, [fillColor], [strokeColor], [strokeWidth])**: Draw a circle
- **ellipse(x, y, radiusX, radiusY, [rotation], [startAngle], [endAngle], [fillColor], [strokeColor], [strokeWidth])**: Draw an ellipse
- **image(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)**: Draw an image on the canvas
- **line(x1, y1, x2, y2, [color], [strokeWidth])**: Draw a line
- **point(x, y, [color])**: Draw a single point
- **quad(x1, y1, x2, y2, x3, y3, x4, y4, [fillColor], [strokeColor], [strokeWidth])**: Draw a quadrilateral
- **rect(x, y, width, height, [fillColor], [strokeColor], [strokeWidth])**: Draw a rectangle
- **square(x, y, sideLength, [fillColor], [strokeColor], [strokeWidth])**: Draw a square
- **triangle(x1, y1, x2, y2, x3, y3, [fillColor], [strokeColor], [strokeWidth])**: Draw a triangle

---

## Development:
- [ ] Add example games
- [ ] Create ability class
- [ ] Create animation class
- [ ] Create world class


## Contribution:
If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
