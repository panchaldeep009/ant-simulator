import { Color } from "p5";
import { Attraction } from "../Components/Attraction";
import { Eatable } from "../Components/Eatable";
import { Circle } from "../Components/Circle";
import { Position } from "../Components/Position";
import { Entity } from "../ecs";

export class Food extends Entity {
  constructor(public x: number, public y: number, color: Color) {
    super();
    this.add(
      new Position(x, y),
      new Circle(color, 5),
      new Attraction(1),
      new Eatable(1)
    );
  }
}
