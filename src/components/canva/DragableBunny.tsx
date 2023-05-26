import { useCallback, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, useTick, useApp, PixiComponent } from "@pixi/react";
import { useDraggable } from "./useDraggable";
const STATIC_PATH = '/my-img';

type CoordinateProps = { x: number, y: number };
type PixiProps = {
  app: PIXI.Application<PIXI.ICanvas>,
  texture: PIXI.Texture<PIXI.Resource>,
  onDragStart: any
}

function createBunny({ x, y }: CoordinateProps, { app, texture, onDragStart }: PixiProps) {
  // create our little bunny friend..
  const bunny = new PIXI.Sprite(texture);

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  bunny.interactive = true;

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  bunny.cursor = 'pointer';

  // center the bunny's anchor point
  bunny.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  bunny.scale.set(3);

  // setup events for mouse + touch using
  // the pointer events
  bunny.on('pointerdown', onDragStart, bunny);

  // move the sprite to its designated position
  bunny.x = x;
  bunny.y = y;

  // add it to the stage
  app.stage.addChild(bunny);
}

const Bunny = () => {
  const app = useApp();
  // create a texture from an image path
  const texture = PIXI.Texture.from('https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png');
  // Scale mode for pixelation
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  let dragTarget = null;

  // hooks
  const { onDragStart, onDragEnd} = useDraggable({app, dragTarget});

  for (let i = 0; i < 10; i++) {
    createBunny(
      {
        x: Math.floor(Math.random() * app.screen.width),
        y: Math.floor(Math.random() * app.screen.height),
      }, {
      app: app,
      texture: texture,
      onDragStart: onDragStart
    }
    );
  }

  app.stage.interactive = true;
  app.stage.hitArea = app.screen;
  app.stage.on('pointerup', onDragEnd);
  app.stage.on('pointerupoutside', onDragEnd);
  
  return (
    <></>
  );
};
// http://pixijs.io/examples/#/basics/basic.js
function DragableBunny() {
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
export default DragableBunny;
