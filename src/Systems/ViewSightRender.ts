import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { ViewSight } from "../Components/ViewSight";
import { ECS, System } from "../ecs";

export class ViewSightRender extends System {
  public update(ecs: ECS) {
    ecs.componentEntities.get(ViewSight)?.forEach((entity) => {
      if (entity.has(Position, Velocity, ViewSight)) {
        const position = entity.get(Position);
        const velocity = entity.get(Velocity);
        const viewSight = entity.get(ViewSight);

        if (!position || !velocity || !viewSight) return;

        // yellow view sight triangle
        ecs.p5.stroke("#ff0");
        ecs.p5.fill("#ff0");
        ecs.p5.triangle(
          position.x,
          position.y,
          position.x +
            viewSight.distance * Math.cos(velocity.direction + viewSight.angle),
          position.y +
            viewSight.distance * Math.sin(velocity.direction + viewSight.angle),
          position.x +
            viewSight.distance * Math.cos(velocity.direction - viewSight.angle),
          position.y +
            viewSight.distance * Math.sin(velocity.direction - viewSight.angle)
        );
      }
    });
  }
}
