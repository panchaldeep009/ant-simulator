import { Attraction } from "../Components/Attraction";
import { Evaporation } from "../Components/Evaporation";
import { ECS, System } from "../ecs";

export class PheromoneEvaporator extends System {
  public componentsRequired = new Set([Attraction, Evaporation]);

  public update(ecs: ECS) {
    this.entities.forEach((entity) => {
      const attraction = entity.get(Attraction);
      const evaporated = entity.get(Evaporation);

      if (!attraction || !evaporated) return;

      attraction.intensity -= evaporated.rate;
      if (attraction.intensity <= 0) {
        ecs.removeEntity(entity);
      }
    });
  }
}
