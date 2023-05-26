import { useCallback, useState } from "react";
import { usePixiTicker } from "react-pixi-fiber";
import { Container, Sprite, useTick, useApp } from "@pixi/react";
const STATIC_PATH = '/my-img';

let i = 0;

const Bunny = () => {
  
  // states
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0);

  // custom ticker
  useTick(delta => {
    i += 0.05 * delta;

    setX(Math.sin(i) * 100);
    setY(Math.sin(i / 1.5) * 100);
    setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
  });

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      anchor={0.5}
      x={x}
      y={y}
      rotation={rotation}
    />
  );
};
// http://pixijs.io/examples/#/basics/basic.js
function RotatingBunny(props: { x: number; y: number; }) {
  const [rotation, setRotation] = useState<number>(0);
  const animate = useCallback((delta: number) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent tranformation
    setRotation((rotation) => rotation + 0.1 * delta);
  }, []);
  //usePixiTicker(animate);

  return <Container x={150} y={150}>
    <Bunny />
  </Container>

}
//<Sprite anchor={[0.5,0.5]} image={`${STATIC_PATH}/img_0.jpg`} {...props} />
export default RotatingBunny;
