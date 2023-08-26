import { Component } from "../ecs";
import { Position } from "./Position";

export class Attracted extends Component {
  constructor(public target?: Position | undefined) {
    super();
  }
}
