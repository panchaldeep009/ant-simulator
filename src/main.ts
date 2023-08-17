import "./style.css";
import P5 from "p5";

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(1000, 1000);
    canvas.parent("app");
    p5.background("#333");
  };

  p5.draw = () => {
    p5.background("#333");
  };

  p5.mousePressed = () => {};
};

new P5(sketch);
