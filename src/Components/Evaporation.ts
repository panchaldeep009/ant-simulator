import { Component } from "../ecs";

export class Evaporation extends Component {
  constructor(public rate: number) {
    super();
  }
}
