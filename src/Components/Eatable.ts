import { Component } from "../ecs";

export class Eatable extends Component {
  constructor(public energy: number) {
    super();
  }
}
