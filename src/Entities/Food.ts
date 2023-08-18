import { Attraction } from "../Components/Attraction";
import { Point } from "../Components/Point";
import { Position } from "../Components/Position";
import { Entity } from "../ecs";

export class Food extends Entity {
  constructor(public x: number, public y: number) {
    super();
    this.add(new Position(x, y), new Point("#0f0", 5), new Attraction());
  }
}
