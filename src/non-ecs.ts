import "./style.css";
import P5 from "p5";

const sketch = (p5: P5) => {
  class Vector {
    constructor(public x: number, public y: number) {}
  }

  class Food extends Vector {
    draw() {
      p5.stroke(0, 255, 0);
      p5.ellipse(this.x, this.y, 5, 5);
    }
  }

  class Ant extends Vector {
    private step = 10;
    private viewPort = 50;
    private deflection = 0.4;
    private foodEaten = 1;

    constructor(public x: number, public y: number, private direction: number) {
      super(x, y);
    }

    draw() {
      p5.stroke(255, 255 - this.foodEaten * 4, 255 - this.foodEaten * 4);
      p5.fill(255, 255 - this.foodEaten * 4, 255 - this.foodEaten * 4);
      p5.ellipse(this.x, this.y, 5);

      const x2 = this.x + this.viewPort * Math.cos(this.direction - 0.7);
      const y2 = this.y + this.viewPort * Math.sin(this.direction - 0.7);
      const x3 = this.x + this.viewPort * Math.cos(this.direction + 0.7);
      const y3 = this.y + this.viewPort * Math.sin(this.direction + 0.7);

      // draw view port
      p5.stroke(255, 0, 0);
      p5.line(this.x, this.y, x2, y2);
      p5.line(this.x, this.y, x3, y3);
    }

    nextStep(foods: Food[]) {
      const { width, height } = p5;

      this.x += this.step * Math.cos(this.direction);
      this.y += this.step * Math.sin(this.direction);

      let directionToFood: number | null = null;

      foods.forEach((food) => {
        // if ant is near food, eat it
        if (Math.abs(food.x - this.x) < 5 && Math.abs(food.y - this.y) < 5) {
          foods.splice(foods.indexOf(food), 1);
          this.foodEaten++;
          return;
        }

        if (
          food.x > this.x - this.viewPort &&
          food.x < this.x + this.viewPort &&
          food.y > this.y - this.viewPort &&
          food.y < this.y + this.viewPort
        ) {
          const angle = Math.atan2(food.y - this.y, food.x - this.x);
          if (directionToFood === null) {
            directionToFood = angle;
          }
        }
      });

      if (directionToFood !== null) {
        this.direction = directionToFood;
        return;
      }

      this.direction += p5.random(-this.deflection, this.deflection);

      if (this.x < 0) {
        this.x = 0;
        this.direction = p5.random(0, Math.PI);
      }
      if (this.x > width) {
        this.x = width;
        this.direction = p5.random(Math.PI, 2 * Math.PI);
      }
      if (this.y < 0) {
        this.y = 0;
        this.direction = p5.random(Math.PI / 2, (3 * Math.PI) / 2);
      }
      if (this.y > height) {
        this.y = height;
        this.direction = p5.random((3 * Math.PI) / 2, (5 * Math.PI) / 2);
      }
    }

    move(foods: Food[]) {
      this.nextStep(foods);
      this.draw();
    }
  }

  const ants: Ant[] = [];
  const foods: Food[] = [];

  p5.setup = () => {
    const canvas = p5.createCanvas(1000, 1000);
    canvas.parent("app");
    p5.background("#333");

    for (let i = 0; i < 10; i++) {
      foods.push(new Food(p5.random(0, 1000), p5.random(0, 1000)));
    }

    for (let i = 0; i < 10; i++) {
      ants.push(new Ant(500, 500, p5.random(0, 2 * Math.PI)));
    }
  };

  p5.draw = () => {
    p5.background(30, 30, 30);
    foods.forEach((food) => {
      food.draw();
    });
    ants.forEach((ant) => {
      ant.move(foods);
    });
  };

  p5.mousePressed = () => {
    if (p5.keyIsDown(p5.SHIFT)) {
      for (let i = 0; i < 10; i++) {
        foods.push(new Food(p5.random(0, 1000), p5.random(0, 1000)));
      }
    } else {
      ants.push(new Ant(p5.mouseX, p5.mouseY, p5.random(0, 2 * Math.PI)));
    }
  };
};

new P5(sketch);
