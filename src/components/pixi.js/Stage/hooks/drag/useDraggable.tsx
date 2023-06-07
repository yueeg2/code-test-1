import * as React from "react";

import * as PIXI from "pixi.js";

type props = {
  app: PIXI.Application<PIXI.ICanvas>,
  dragTarget: dargTargetProps,
}

export type dargTargetProps = {
  parent: {
    toLocal: (arg0: any, arg1: null, arg2: any) => void;
  };
  position: any;
  alpha: number;
  [key: string]: any;
} | null


export function useDraggable({
  app,
  dragTarget,
}: props) {


  function onDragMove(this:any, event: PIXI.FederatedPointerEvent) {

    if (dragTarget) {
      dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
    if(!event.altKey){
      //console.log('onComment...')
      onDragEnd(event)
      return;
    }

  }


  function onDragStart(this: any, event: PIXI.FederatedPointerEvent) {

    /** disable drag when altKey unclicked  */
    if(!event.altKey){
      onDragEnd(this)
      return;
    }

    this.alpha = 0.5;
    dragTarget = this;

    app.stage.on('pointermove', onDragMove);
  }

  function onDragEnd(this: any, event: PIXI.FederatedPointerEvent) {
    if (dragTarget) {
      app.stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
      event.stopPropagation();

    }
  }


  return { onDragStart, onDragEnd }
}