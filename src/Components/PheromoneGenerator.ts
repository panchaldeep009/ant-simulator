import { Component } from "../ecs";

export class PheromoneGenerator extends Component {
  generatingStep = 5;
  constructor() {
    super();
  }

  get isGenerating() {
    return this.generatingStep < 5;
  }

  get isReady() {
    if (this.generatingStep === 5) {
      this.generatingStep = 0;
      return true;
    }
    this.generatingStep++;
    return false;
  }
}
