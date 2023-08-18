import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { System } from "../ecs";

export class Walking extends System {
  public componentsRequired = new Set([Position, Velocity]);

  static nextPosition(position: Position, velocity: Velocity) {
    return {
      x: position.x + velocity.step * Math.cos(velocity.direction),
      y: position.y + velocity.step * Math.sin(velocity.direction),
    };
  }

  public update() {
    this.entities.forEach((entity) => {
      const position = entity.get(Position);
      const velocity = entity.get(Velocity);

      if (!position || !velocity) return;

      const newPosition = Walking.nextPosition(position, velocity);

      position.x = newPosition.x;
      position.y = newPosition.y;
    });
  }
}
