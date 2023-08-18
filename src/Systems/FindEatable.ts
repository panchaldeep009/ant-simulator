import { ECS, System } from "../ecs";

export class FindEatable extends System {
  public update(ecs: ECS): void {
    const eatableEntities = ecs.componentEntities.get(Eatable);
    ecs.componentEntities.get(Eatable)?.forEach((entity) => {
      if (entity.has(Position, Eatable)) {
        const position = entity.get(Position);
        const eatable = entity.get(Eatable);

        if (!position || !eatable) return;

        ecs.p5.stroke(eatable.color);
        ecs.p5.fill(eatable.color);
        ecs.p5.ellipse(position.x, position.y, eatable.size);
      }
    });
  }
}
