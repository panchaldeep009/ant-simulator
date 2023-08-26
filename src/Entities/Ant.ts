import { Color } from "p5";
import { Circle } from "../Components/Circle";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { ViewSight } from "../Components/ViewSight";
import { Entity } from "../ecs";
import { PheromoneGenerator } from "../Components/PheromoneGenerator";
import { Attracted } from "../Components/Attracted";

export class Ants extends Entity {
  constructor(
    public x: number,
    public y: number,
    direction: number,
    color: Color
  ) {
    super();

    this.add(
      new Position(x, y),
      new Velocity(10, direction),
      new Circle(color, 5),
      new ViewSight(50, 1),
      new PheromoneGenerator(),
      new Attracted()
    );
  }
}
