import { Component } from "../ecs";

export class Velocity extends Component {
  constructor(public step: number, public direction: number) {
    super();
  }
}
