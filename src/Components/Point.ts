import { Component } from "../ecs";
import { Color } from "p5";

export class Point extends Component {
  constructor(public color: Color) {
    super();
  }
}
