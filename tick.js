import LightECS from './LightECS.js';
const { Entity, Component, System, Animation, DeltaTime, ULECSID, instantiateLightECS, SpriteComponent  } = LightECS;

const ECS = instantiateLightECS();

function tick() {
    ECS.deltaTime.update();
    ECS.Graphic2d.clearCanvas();
    ECS.Graphic2d.text(`FPS: ${ECS.deltaTime.getFPS()}`, 100, 20, '20px Verdana', 'black', 'center');
    ECS.Graphic2d.text('Light ECS', 640, 360, '100px Verdana', 'rgba(0, 0, 0, 0.2)', 'center');

    requestAnimationFrame(tick);
}

tick();
