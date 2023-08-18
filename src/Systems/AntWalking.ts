import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { ECS, System } from "../ecs";
import P5 from "p5";

export class AntWalking extends System {
  private deflection = 0.25;
  private nextStep(position: Position, velocity: Velocity, p5: P5): void {
    // wonder around

    velocity.direction += p5.random(-this.deflection, this.deflection);

    const newPosX = position.x + velocity.step * Math.cos(velocity.direction);
    const newPosY = position.y + velocity.step * Math.sin(velocity.direction);

    if (
      newPosX < 0 ||
      newPosX > p5.width ||
      newPosY < 0 ||
      newPosY > p5.height
    ) {
      this.nextStep(position, velocity, p5);
      return;
    }

    position.x = newPosX;
    position.y = newPosY;
  }

  public update(ecs: ECS) {
    ecs.componentEntities.get(Velocity)?.forEach((entity) => {
      if (entity.has(Position, Velocity)) {
        const position = entity.get(Position);
        const velocity = entity.get(Velocity);

        if (!position || !velocity) return;
        this.nextStep(position, velocity, ecs.p5);
      }
    });
  }
}
