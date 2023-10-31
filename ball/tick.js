import LightECS from './LightECS.js';
const { Component, instantiateLightECS } = LightECS;

const ECS = window.ECS = instantiateLightECS();
const Colors = [
    [255, 0, 0],     // Red
    [0, 255, 0],     // Green
    [0, 0, 255],     // Blue
    [255, 255, 0],   // Yellow
    [0, 255, 255],   // Cyan
    [255, 0, 255],   // Magenta
    [128, 0, 0],     // Dark Red
    [0, 128, 0],     // Dark Green
    [0, 0, 128],     // Dark Blue
    [128, 128, 0],   // Olive
    [128, 0, 128],   // Purple
    [0, 128, 128],   // Teal
    [192, 192, 192], // Silver
    [128, 128, 128], // Gray
    [255, 165, 0],   // Orange
    [255, 192, 203], // Pink
    [75, 0, 130],    // Indigo
    [127, 255, 212], // Aquamarine
    [210, 105, 30],  // Chocolate
    [255, 99, 71],   // Tomato
    [70, 130, 180],  // Steel Blue
    [240, 230, 140], // Khaki
    [173, 255, 47],  // GreenYellow
    [219, 112, 147]  // PaleVioletRed
];

ECS.Graphic2d.canvas.style.borderStyle = "solid"
ECS.Graphic2d.canvas.style.borderWidth = "thin"

ECS.System = ECS.newSystem();

const PositionComponent = (x, y, z = 0) => {
    return new Component({
        name: 'position',
        x: x,
        y: y,
        z: z
    })
}
const VelocityComponent = (x, y, z = 0) => {
    return new Component({
        name: 'velocity',
        x: x,
        y: y,
        z: z
    })
}
const DimensionComponent = (properties) => {
    return new Component({
        name: 'dimensions',
        ...properties || {}
    })
}
const ColorComponent = (properties) => {
    return new Component({
        name: 'color',
        ...properties || {}
    })
}

for(let i = 0; i < 100; i++) {
    const Ball = ECS.newEntity();
    const color = Colors[Math.floor(Math.random() * Colors.length)];

    Ball.addComponent(PositionComponent(Math.floor(Math.random() * 1260 + 10), Math.floor(Math.random() * 700 + 10)));
    Ball.addComponent(VelocityComponent(Math.random() * 4 - 2, Math.random() * 4 - 2));
    Ball.addComponent(DimensionComponent({ radius: Math.random () * 6 + 2 }));
    Ball.addComponent(ColorComponent({r: color[0], g: color[1], b: color[2]}));

    ECS.Entities.push(Ball);
}

setInterval(() => {
    for(let i = 0; i < 100; i++) {
        const Ball = ECS.newEntity();
        const color = Colors[Math.floor(Math.random() * Colors.length)];

        Ball.addComponent(PositionComponent(Math.floor(Math.random() * 1260 + 10), Math.floor(Math.random() * 700 + 10)));
        Ball.addComponent(VelocityComponent(Math.random() * 4 - 2, Math.random() * 4 - 2));
        Ball.addComponent(DimensionComponent({ radius: Math.random () * 6 + 2 }));
        Ball.addComponent(ColorComponent({r: color[0], g: color[1], b: color[2]}));

        ECS.Entities.push(Ball);
    }
}, 5000);



ECS.System.addFunctions([
    function updateBallPosition(entity) {
        entity.position.x += entity.velocity.x;
        entity.position.y += entity.velocity.y;
    },

    function handleBallCollisions(entity) {
        if (entity.position.x - entity.dimensions.radius < 0 ||
            entity.position.x + entity.dimensions.radius > ECS.Graphic2d.canvas.width) {
            entity.velocity.x = -entity.velocity.x;
        }

        if (entity.position.y - entity.dimensions.radius < 0 ||
            entity.position.y + entity.dimensions.radius > ECS.Graphic2d.canvas.height) {
            entity.velocity.y = -entity.velocity.y;
        }
    },

    function handleBallToBallCollisions(entity1, entity2) {
        const dx = entity2.position.x - entity1.position.x;
        const dy = entity2.position.y - entity1.position.y;
    
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < entity1.dimensions.radius + entity2.dimensions.radius) {
            // The balls are colliding
            
            // Reverse velocities of both balls
            entity1.velocity.x = -entity1.velocity.x;
            entity1.velocity.y = -entity1.velocity.y;
    
            entity2.velocity.x = -entity2.velocity.x;
            entity2.velocity.y = -entity2.velocity.y;
    
            // Correct overlapping (prevents balls from getting stuck to each other)
            const overlap = (entity1.dimensions.radius + entity2.dimensions.radius) - distance;
            const angle = Math.atan2(dy, dx);
    
            const correctionX = (overlap / 2) * Math.cos(angle);
            const correctionY = (overlap / 2) * Math.sin(angle);
    
            entity1.position.x -= correctionX;
            entity1.position.y -= correctionY;
    
            entity2.position.x += correctionX;
            entity2.position.y += correctionY;
        }
    },

    function renderBall(entity) {
        let color = 'rgb(' + entity.color.r + ',' + entity.color.g + ',' + entity.color.b + ')';

        ECS.Graphic2d.circle(entity.position.x, entity.position.y, entity.dimensions.radius, color, 'black', 2);
    }

])

function tick() {
    ECS.deltaTime.update();
    ECS.Graphic2d.clearCanvas();

    ECS.Graphic2d.text('Light ECS', 640, 360, '100px Verdana', 'rgba(0, 0, 0, 0.2)', 'center');

    ECS.Entities.forEach(Ball => {

        ECS.System.updateBallPosition(Ball);
        ECS.System.handleBallCollisions(Ball);
        ECS.System.renderBall(Ball);
        ECS.Entities.forEach(Ball2 => {
            if(Ball != Ball2) {
                ECS.System.handleBallToBallCollisions(Ball, Ball2);
            }

        })
    })

    ECS.Graphic2d.text(`FPS: ${ECS.deltaTime.getFPS()}`, 10, 20, '20px Verdana', 'black', 'left');
    ECS.Graphic2d.text(`Entities: ${ECS.Entities.length}`, 10, 40, '20px Verdana', 'black', 'left');

    requestAnimationFrame(tick);
}

tick();
