import { Component } from "../ecs";
import { Color } from "p5";

export class Circle extends Component {
  constructor(public color: Color, public size: number) {
    super();
  }
}
