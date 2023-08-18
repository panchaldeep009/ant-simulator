import { Component } from "../ecs";

export class Point extends Component {
  constructor(public color: string, public size: number) {
    super();
  }
}
