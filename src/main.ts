import P5 from "p5";
import "./style.css";

import { ECS } from "./ecs";
import { Ants } from "./Entities/Ant";
import { Food } from "./Entities/Food";
import { AntWondering } from "./Systems/AntWondering";
import { CircleRender } from "./Systems/CircleRender";
import { PheromoneEvaporator } from "./Systems/PheromoneEvaporation";
import { PheromoneDropping } from "./Systems/PheromoneDropping";
import { ViewSightRender } from "./Systems/ViewSightRender";
import { PointRender } from "./Systems/PointRender";
import { Walking } from "./Systems/Walking";
import { FoodSensing } from "./Systems/FoodSensing";

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
      world.addEntity(
        new Food(
          p5.random(0, p5.width),
          p5.random(0, p5.width),
          p5.color(0, 255, 0)
        )
      );
    }

    // all ants start at the center of the canvas in 5 radius

    for (let i = 0; i < 100; i++) {
      world.addEntity(
        new Ants(
          p5.random(p5.width / 2 - 5, p5.width / 2 + 5),
          p5.random(p5.height / 2 - 5, p5.height / 2 + 5),
          p5.random(0, 2 * Math.PI),
          p5.color(255, 0, 0)
        )
      );
    }

    world.addSystem(new PheromoneEvaporator());
    world.addSystem(new PheromoneDropping());
    world.addSystem(new FoodSensing());
    world.addSystem(new AntWondering());
    world.addSystem(new PointRender());
    world.addSystem(new CircleRender());
    world.addSystem(new Walking());
    world.addSystem(new ViewSightRender());
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
