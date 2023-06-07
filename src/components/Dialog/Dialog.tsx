import * as React from 'react';
import * as PIXI from "pixi.js";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Comments from '../Comments';
import { DialogProps } from 'Contexts';


export default function AlertDialog({ dialog, setDialog }: DialogProps) {

  const handleClose = () => {
    setDialog && setDialog({ ...dialog, open: false});
  };

  const handleResolve = () => {
    if (dialog.currentUserId === '') {
      return;
    }

    const thebunny = dialog.app.stage.children
      .flatMap((sprite: PIXI.Sprite) => sprite.children || [])
      .find((child: PIXI.Sprite) => child && child.name === dialog.dragTargetName ? child : null);

    const thecomment = dialog.app.stage.children
      .flatMap((sprite: PIXI.Sprite) => sprite.children || [])
      .find((child: PIXI.Sprite) => child && child.name === dialog.dragTargetName);

    if (thebunny) {
      // handle comment on bunny
      thecomment.destroy({ children: true });
    } else {
      // handle comment on canva
      const thecomment = dialog.app.stage.children
        .find((child: PIXI.Sprite) => child && child.name === dialog.dragTargetName);
      thecomment.destroy({ children: true });
    }
    setDialog && setDialog({ ...dialog, open: false });
  }


  return (
    <div>
      <Dialog
        open={dialog.open ? dialog.open : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ display: 'flex', justifyContent: 'flex' }}>
          <DialogTitle id="alert-dialog-title" sx={{ paddingBlock: 2, lineHeight: 1 }}>
            <h4 className="comments-title">Leave some comments below!</h4>
            <span style={{ fontSize: '13px', margin: 0, color: 'red' }}>
              {dialog.dragTargetName
                ? !dialog.dragTargetName.includes('comment_')
                  ? `new a comment: ${dialog.dragTargetName}`
                  : `edit comment: ${dialog.dragTargetName}`
                : ''}
            </span>
          </DialogTitle>

          {dialog.dragTargetName
            && dialog.dragTargetName.includes('comment_')
            ? <Button onClick={handleResolve} style={{
              position: 'relative',
              top: '-15px',
              right: ' 0',
              color: 'red'
            }}>
              Resolve
            </Button>
            : null}
        </div>

        <DialogContent sx={{ paddingBlock: 0 }}>
          <Comments currentUserId={dialog.currentUserId} />
        </DialogContent>

      </Dialog>
    </div>
  );
}