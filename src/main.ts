import P5 from "p5";
import "./style.css";

import { ECS } from "./ecs";
import { Ants } from "./Entities/Ant";
import { Food } from "./Entities/Food";
import { AntWalking } from "./Systems/AntWalking";
import { PointRender } from "./Systems/PointRender";
import { ViewSightRender } from "./Systems/ViewSightRender";

const sketch = (p5: P5) => {
  const world = new ECS(p5);

  p5.setup = () => {
    const canvas = p5.createCanvas(
      document.body.clientWidth,
      document.body.clientHeight
    );
    canvas.parent("app");
    p5.background("#333");

    for (let i = 0; i < 10; i++) {
      world.addEntity(new Food(p5.random(0, p5.width), p5.random(0, p5.width)));
    }

    // all ants start at the center of the canvas in 5 radius

    for (let i = 0; i < 1000; i++) {
      world.addEntity(
        new Ants(
          p5.random(p5.width / 2 - 5, p5.width / 2 + 5),
          p5.random(p5.height / 2 - 5, p5.height / 2 + 5),
          p5.random(0, 2 * Math.PI)
        )
      );
    }

    world.addSystem(new AntWalking());
    world.addSystem(new PointRender());
    // world.addSystem(new ViewSightRender());
  };

  p5.draw = () => {
    p5.background(30);
    world.update();
    let fps = p5.frameRate();
    p5.fill(255);
    p5.stroke(0);
    p5.text("FPS: " + fps.toFixed(2), 10, p5.height - 10);
  };
};

new P5(sketch);
