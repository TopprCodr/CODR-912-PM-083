var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Composite = Matter.Composite,
Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
world = engine.world;

// create renderer
var render = Render.create({
element: document.body,
engine: engine,
options: {
    width: 1300,
    height: 450,
    wireframes: false,
    background: 'rgb(210, 173, 151)'
}
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
options = { 
    isStatic: true
};

// walls 

var bottom_wall = Bodies.rectangle(650, 450, 1300, 30, options);
var right_wall = Bodies.rectangle(1270, 200, 30, 500, options);
var left_wall = Bodies.rectangle(10, 200, 30, 500, options);

Composite.add(world, [bottom_wall,right_wall,left_wall]);

//stack of pencils/erasers

var stack = Composites.stack(400, 20, 18, 8, 0, 0, function(x, y) {
if (Common.random() > 0.35) {
    return Bodies.rectangle(x, y, 20, 20, {
        render: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: 'images/pencil.png',
                xScale: 0.5,
                yScale: 0.5
            }
        }
    });
} else {
    return Bodies.circle(x, y, 20, {
        density: 0.0005,
        frictionAir: 0.06,
        restitution: 0.3,
        friction: 0.01,
        render: {
            sprite: {
                texture: 'images/eraser.png',
                xScale: 0.5,
                yScale: 0.5
            }
        }
    });
}
});
Composite.add(world, stack);

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
