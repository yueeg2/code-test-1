import * as PIXI from "pixi.js";

type props = {
  app: PIXI.Application<PIXI.ICanvas>,
  dragTarget: dargTargetProps
}

type dargTargetProps = {
  parent: {
    toLocal: (arg0: any, arg1: null, arg2: any) => void;
  };
  position: any;
  alpha: number;
} | null

export function useDraggable({ app, dragTarget }: props) {


  function onDragMove(event: any) {
    //console.log(dragTarget, event, event.parent)
    if (dragTarget) {
      dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
  }

  function onDragStart(this:any) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    // this.data = event.data;
    //console.log(this.alpha)
    this.alpha = 0.5;
    dragTarget = this;
 
    
    // event.data.alpha = 0.5;
    // dragTarget = event.data

    app.stage.on('pointermove', onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }


  return { onDragStart, onDragEnd }
}