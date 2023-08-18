import P5 from "p5";

export abstract class Component {
  protected readonly __component = Component.name;
}

export type ComponentConstructor<T extends Component = Component> = new (
  ...args: any[]
) => T;

export class Entity extends Map<ComponentConstructor, Component> {
  public readonly name = Entity.name;

  public add(...components: Component[]): void {
    components.forEach((component) => {
      this.set(component.constructor as ComponentConstructor, component);
    });
  }

  public override delete(
    ...componentConstructors: ComponentConstructor[]
  ): boolean {
    componentConstructors.forEach((componentConstructor) => {
      super.delete(componentConstructor);
    });

    return true;
  }

  public override has(
    ...componentConstructors: ComponentConstructor[]
  ): boolean {
    return componentConstructors.every((componentConstructor) => {
      return super.has(componentConstructor);
    });
  }

  public override get<C extends Component>(
    componentConstructor: ComponentConstructor<C>
  ): C | undefined {
    return super.get(componentConstructor) as C;
  }
}

export abstract class System {
  public readonly name = System.name;

  public readonly entities = new Set<Entity>();

  public abstract componentsRequired: Set<ComponentConstructor>;

  public abstract update(ecs: ECS): void;
}

export class ECS {
  constructor(public readonly p5: P5) {}
  readonly entities = new Set<Entity>();
  readonly systems = new Set<System>();

  public addEntity(entity: Entity) {
    this.entities.add(entity);
    this.checkEntity(entity);
    return this;
  }

  public removeEntity(entity: Entity) {
    this.entities.delete(entity);
    this.systems.forEach((system) => {
      if (system.entities.has(entity)) {
        system.entities.delete(entity);
      }
    });
    return this;
  }

  public addSystem(system: System) {
    this.systems.add(system);
    this.entities.forEach((entity) => {
      this.checkEntitySystem(entity, system);
    });
    return this;
  }

  public update() {
    this.systems.forEach((system) => {
      system.update(this);
    });
  }

  private checkEntity(entity: Entity): void {
    for (const system of this.systems) {
      this.checkEntitySystem(entity, system);
    }
  }

  private checkEntitySystem(entity: Entity, system: System): void {
    const need = system.componentsRequired;
    if (entity.has(...need)) {
      system.entities.add(entity);
    } else {
      system.entities.delete(entity);
    }
  }
}
