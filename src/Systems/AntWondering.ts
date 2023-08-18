import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { ECS, System } from "../ecs";
import { Walking } from "./Walking";

export class AntWondering extends System {
  public componentsRequired = new Set([Position, Velocity]);
  private deflection = 0.25;

  public update(ecs: ECS) {
    this.entities.forEach((entity) => {
      const position = entity.get(Position);
      const velocity = entity.get(Velocity);

      if (!position || !velocity) return;

      velocity.direction += ecs.p5.random(-this.deflection, this.deflection);
      while (true) {
        const newPos = Walking.nextPosition(position, velocity);
        if (
          newPos.x < 0 ||
          newPos.x > ecs.p5.width ||
          newPos.y < 0 ||
          newPos.y > ecs.p5.height
        ) {
          velocity.direction += ecs.p5.random(
            -this.deflection,
            this.deflection
          );
        } else {
          break;
        }
      }
    });
  }
}
