import { Position } from "../Components/Position";
import { PheromoneGenerator } from "../Components/PheromoneGenerator";
import { Pheromone } from "../Entities/Pheromone";
import { ECS, System } from "../ecs";
import { ViewSight } from "../Components/ViewSight";
import { Velocity } from "../Components/Velocity";

export class FoodSensing extends System {
  public componentsRequired = new Set([Position, ViewSight, Velocity]);

  public update(ecs: ECS) {
    this.entities.forEach((entity) => {
      const position = entity.get(Position);
      const pheromone = entity.get(PheromoneGenerator);

      if (!position || !pheromone) return;

      if (pheromone.isReady) {
        ecs.addEntity(
          new Pheromone(position.x, position.y, ecs.p5.color(0, 0, 255, 255))
        );
      }
    });
  }
}
