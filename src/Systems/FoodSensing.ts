import { Position } from "../Components/Position";
import { ECS, System } from "../ecs";
import { ViewSight } from "../Components/ViewSight";
import { Velocity } from "../Components/Velocity";
import { Food } from "../Entities/Food";
import { Attracted } from "../Components/Attracted";

export class FoodSensing extends System {
  public componentsRequired = new Set([
    Position,
    ViewSight,
    Velocity,
    Attracted,
  ]);

  public update(ecs: ECS) {
    this.entities.forEach((entity) => {
      ecs.entitiesByType.get(Food)?.forEach((food) => {
        const position = entity.get(Position);
        const viewSight = entity.get(ViewSight);
        const velocity = entity.get(Velocity);
        const attracted = entity.get(Attracted);

        const foodPosition = food.get(Position);

        if (!position || !viewSight || !velocity || !foodPosition || !attracted)
          return;

        // if the food is in the view sight

        if (
          // Distance between the ant and the food
          Math.sqrt(
            Math.pow(foodPosition.x - position.x, 2) +
              Math.pow(foodPosition.y - position.y, 2)
          ) <= viewSight.distance &&
          // and the food is in the angle of the view sight

          Math.abs(
            Math.atan2(
              foodPosition.y - position.y,
              foodPosition.x - position.x
            ) - velocity.direction
          ) <=
            viewSight.angle / 2
        ) {
          attracted.target = food.get(Position);
        }
      });
    });
  }
}
