import * as React from 'react';
type dialogProp = {
  open?: boolean
  dragTargetName?: string | null
  currentUserId: string
  app? :any
};
export type DialogProps = {
  dialog: dialogProp
  setDialog?: React.Dispatch<React.SetStateAction<dialogProp>>
}

export const DialogContext = React.createContext<DialogProps>({
  setDialog: undefined,
  dialog: {
    open: undefined,
    dragTargetName: undefined,
    currentUserId: ''
  }
});
