import { Point } from "../Components/Point";
import { Position } from "../Components/Position";
import { ECS, System } from "../ecs";

export class PointRender extends System {
  public update(ecs: ECS) {
    ecs.componentEntities.get(Point)?.forEach((entity) => {
      if (entity.has(Position, Point)) {
        const position = entity.get(Position);
        const point = entity.get(Point);

        if (!position || !point) return;

        ecs.p5.stroke(point.color);
        ecs.p5.fill(point.color);
        ecs.p5.ellipse(position.x, position.y, point.size);
      }
    });
  }
}
