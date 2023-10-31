# LightECS

A lightweight, modular ECS (Entity-Component-System) engine in JavaScript.

**Why LightECS?**  
Unlike many ECS frameworks, LightECS offers a blend of simplicity and modularity without over-complicating the architecture. This allows developers to swiftly integrate it into their projects while retaining the flexibility to extend as needed.

## Installation:

- Clone the GitHub repository:
```bash
git clone https://github.com/WeiQiPro/LightECS
```
- OR download the main file directly

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

## Entities:
### Functionality:
  - addComponent adds a singular component.
  - addComponents will take an array of components.
  - removeComponent takes in a name and removes it from the entity.
  - addTag to give entity a tag
  - hasTag to see entity's tags
  - Entity has an unique ID of 23 random characters

```js
const Player = new Entity();

Player.addComponent(HealthComponent(100));
Player.addComponent(EnergyShieldComponent(10, 25, 'Energy', true));
Player.removeComponent('Health');
```

## Systems:
### Functionality:
  - addProperty is meant to allow the developer to create a property with needed.
  - addFunction adds a singular function that can implement "this." within itself.
  - addFunctions takes and array of functions and adds them to the class.


```js
const DamageSystem = new System();

DamageSystem.addFunction(function successfulHit(attacker, defender) {
    if(attacker.attack && defender.health) {
        defender.health.current -= attacker.attack.value; 
    }
});

const EntityManager = new System();

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
## Development:
- [ ] Add example games
- [ ] Create ability class
- [ ] Create animation class
- [ ] Create world class


## Contribution:
If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
