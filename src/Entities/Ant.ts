import { Point } from "../Components/Point";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { ViewSight } from "../Components/ViewSight";
import { Entity } from "../ecs";

export class Ants extends Entity {
  constructor(
    public x: number,
    public y: number,
    direction: number,
    color = "#fff"
  ) {
    super();
    this.add(
      new Position(x, y),
      new Velocity(2, direction),
      new Point(color, 5),
      new ViewSight(20, 0.6)
    );
  }
}
