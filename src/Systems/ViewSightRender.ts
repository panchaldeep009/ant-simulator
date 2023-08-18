import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { ViewSight } from "../Components/ViewSight";
import { ECS, System } from "../ecs";

export class ViewSightRender extends System {
  public componentsRequired = new Set([Position, Velocity, ViewSight]);

  public update(ecs: ECS) {
    this.entities.forEach((entity) => {
      if (entity.has(Position, Velocity, ViewSight)) {
        const position = entity.get(Position);
        const velocity = entity.get(Velocity);
        const viewSight = entity.get(ViewSight);

        if (!position || !velocity || !viewSight) return;

        // yellow view sight cone
        ecs.p5.stroke(255, 255, 0, 50);
        ecs.p5.fill(255, 255, 0, 50);
        ecs.p5.arc(
          position.x,
          position.y,
          viewSight.distance * 2,
          viewSight.distance * 2,
          velocity.direction - viewSight.angle,
          velocity.direction + viewSight.angle
        );
      }
    });
  }
}
