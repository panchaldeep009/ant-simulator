import { Color } from "p5";
import { Attraction } from "../Components/Attraction";
import { Position } from "../Components/Position";
import { Entity } from "../ecs";
import { Evaporation } from "../Components/Evaporation";
// import { Point } from "../Components/Point";

export class Pheromone extends Entity {
  constructor(public x: number, public y: number, _color: Color) {
    super();
    this.add(
      new Position(x, y),
      // new Point(_color),
      new Attraction(1),
      new Evaporation(0.01)
    );
  }
}
