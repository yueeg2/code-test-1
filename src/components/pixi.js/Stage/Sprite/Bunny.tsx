import React from "react";
import * as PIXI from "pixi.js";
import { useApp, } from "@pixi/react";
import { useDraggable } from "../hooks/drag/useDraggable";
import { useComments } from "../hooks/comments/useComments";
import { CoordinateProps } from "models/position";
import { bunnyPositions } from "constants/imgPosition";

export interface ViewportProps {
  width: number
  height: number
  children?: React.ReactNode
}
export interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application
}

type PixiProps = {
  id: number,
  app: PIXI.Application<PIXI.ICanvas>,
  texture: PIXI.Texture<PIXI.Resource>,
  onPointerEnter: any,
}


export function Bunny({ setDialog }: any) {
  // create a texture from an image path
  const texture: PIXI.Texture = PIXI.Texture.from('https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png');
  // Scale mode for pixelation
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  let dragTarget = null;

  // hooks
  const app = useApp();
  const { onCommentStart } = useComments({ app, dragTarget, setDialogOpen: setDialog, });
  const { onDragStart, onDragEnd } = useDraggable({ app, dragTarget });


  // custom fn 
  function onPointerEnter(this: PIXI.Sprite, e: PIXI.FederatedPointerEvent) {
    dragTarget = this;
    dragTarget.cursor = 'pointer';
    this.on('pointerup', onCommentStart, dragTarget);
    this.on('pointerdown', onDragStart, dragTarget);

  }
  // create bunnys
  for (let i = 0; i < 3; i++) {
    createBunny(
      {
        x: bunnyPositions[i * 2],
        y: bunnyPositions[i * 2 + 1],
      }, {
      id: i + 1,
      app: app,
      texture: texture,
      onPointerEnter: onPointerEnter,
    }
    );
  }
  app.stage.interactive = true;
  app.stage.hitArea = app.screen;

  app.stage.on('pointerup', onCommentStart);
  app.stage.on('pointerup', onDragEnd);
  app.stage.on('pointerupoutside', onDragEnd);

  return (
    <></>
  );
}

function createBunny({ x, y }: CoordinateProps, {
  id,
  app,
  texture,
  onPointerEnter }: PixiProps): void {
  // create our little bunny friend..
  const bunny = new PIXI.Sprite(texture);

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  bunny.interactive = true;
  bunny.name = 'bunny_' + id
  //bunny.cursor = 'pointer';

  // center the bunny's anchor point
  bunny.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  bunny.scale.set(3);
  //commentS.scale.set(0.2);

  // setup events for mouse + touch using
  // the pointer events
  bunny.on('pointerenter', onPointerEnter, bunny);
  bunny.on('pointerleave', () => bunny.off('pointerenter', onPointerEnter), bunny);

  // move the sprite to its designated position
  bunny.x = x;
  bunny.y = y;

  // add it to the stage
  app.stage.addChild(bunny);
};
