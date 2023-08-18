import { Circle } from "../Components/Circle";
import { Position } from "../Components/Position";
import { ECS, System } from "../ecs";

export class CircleRender extends System {
  public componentsRequired = new Set([Position, Circle]);

  public update(ecs: ECS) {
    this.entities?.forEach((entity) => {
      if (entity.has(Position, Circle)) {
        const position = entity.get(Position);
        const point = entity.get(Circle);

        if (!position || !point) return;

        ecs.p5.stroke(point.color);
        ecs.p5.fill(point.color);
        ecs.p5.ellipse(position.x, position.y, point.size);
      }
    });
  }
}
