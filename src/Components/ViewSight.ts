import { Component } from "../ecs";

export class ViewSight extends Component {
  constructor(public distance: number, public angle: number) {
    super();
  }
}
