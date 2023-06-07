import React from "react";
import * as PIXI from "pixi.js";
import { CoordinateProps } from "models/position";

type props = {
  id?: number,
  dragTarget: PIXI.Sprite | null,
  app: any,
  setDialogOpen?: any,
}
function createComment({ x, y }: CoordinateProps, { id, app, dragTarget, scale, onCommentOpen }: any) {
  // create comment
  const texture = PIXI.Texture.from('/icons/icons8-comment.svg');
  const comment = new PIXI.Sprite(texture);

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  comment.interactive = true;
  comment.name = 'comment_' + (dragTarget.name ? `${dragTarget.name}_sprite` : 'container') + '_' + id

  // make it a bit bigger, so it's easier to grab
  comment.scale.set(scale);

  // setup events for mouse + touch using
  // the pointer events
  comment.on('pointerenter', () => comment.cursor = 'text', comment);
  comment.on('pointerup', (e) => { onCommentOpen(comment); e.stopPropagation(); }, comment);


  // move the sprite to its designated position
  comment.x = x;
  comment.y = y;

  // add it to the stage
  dragTarget.addChild(comment);
}

export function useComments({
  app,
  dragTarget,
  setDialogOpen
}: props) {
  const RefId = React.useRef({ container: 0, sprite: 0 })

  function onCommentStart(this: PIXI.Sprite, event: PIXI.FederatedPointerEvent) {
    dragTarget = this;
    const position = event.screen;


    if (event.altKey ) {
      console.log('onDrag...')
      return;
    }

    
    if (dragTarget.position._x) {
      const [x, y] = [(position.x - dragTarget.position._x - 12) / 3, (position.y - dragTarget.position._y - 10) / 3];

      // pin a icon that be indicated as comment
      // move the sprite to its designated position
      createComment({ x, y }, { id: RefId.current.sprite, app, dragTarget, scale: 0.2, onCommentOpen })
      event.stopPropagation();
      onCommentOpen(dragTarget);
      RefId.current.sprite++

    } else {
      const [x, y] = [(position.x - 12), (position.y - 10)];
      createComment({ x, y }, { id: RefId.current.container, app, dragTarget, scale: 0.6, onCommentOpen });
      onCommentOpen(dragTarget);
      RefId.current.container++
    }

  }
  function onCommentOpen(dragTarget: any) {
    // open the dialog that have comments
    setTimeout(() => {
      setDialogOpen && setDialogOpen({
        open: true,
        app: app,
        dragTargetName: dragTarget.name ? dragTarget.name : 'container',
        currentUserId: '2'
      });
      onCommentEnd(dragTarget);

    }, 200)
  };

  function onCommentEnd(dragTarget: any) {
    dragTarget = null;
  }
  return { onCommentStart, onCommentOpen }
}