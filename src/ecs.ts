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
  protected readonly __system = System.name;

  public abstract update(ecs: ECS): void;
}

export class ECS {
  constructor(public readonly p5: P5) {}
  readonly entities = new Set<Entity>();
  readonly systems = new Set<System>();
  readonly componentEntities = new Map<ComponentConstructor, Set<Entity>>();

  public addEntity(entity: Entity) {
    this.entities.add(entity);
    entity.forEach((component) => {
      const componentEntities = this.componentEntities.get(
        component.constructor as ComponentConstructor
      );
      if (componentEntities) {
        componentEntities.add(entity);
      } else {
        this.componentEntities.set(
          component.constructor as ComponentConstructor,
          new Set([entity])
        );
      }
    });
    return this;
  }

  public addSystem(system: System) {
    this.systems.add(system);
    return this;
  }

  public update() {
    this.systems.forEach((system) => {
      system.update(this);
    });
  }
}
