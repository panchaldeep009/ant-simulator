import { Component } from "../ecs";

export class Attraction extends Component {
  constructor(public intensity: number) {
    super();
  }
}
