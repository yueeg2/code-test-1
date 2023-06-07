import { Meta, StoryObj } from "@storybook/react";
import "../../index.css";
import React, { useEffect } from "react";
import { Application, Sprite } from 'pixi.js';
import Button from "@mui/material/Button";
import AlertDialog from "../../components/Dialog";

const meta: Meta<typeof AlertDialog> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/Dialog",
  component: AlertDialog,
  render: function Render(args: any) {
    const app = new Application();
    const [dialog, setDialog] = React.useState<any>({
      ...args.dialog
    });
    useEffect(() => {
      dialog.open && setDialog({
        ...dialog,
        open: true,
      });
    }, [dialog.open])

    return (
      <>
        <AlertDialog {...args} setDialog={setDialog} dialog={dialog} />
        {/* <Button
          onClick={() => {
            setDialog && setDialog({
              ...dialog,
              open: !dialog.open,
              app: app
            });
          }}>
          Open Dialog
        </Button> */}
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const OpenWithNewTarget: Story = {
  args: {

    dialog: {
      open: true,
      dragTargetName: "target_name",
      currentUserId: '',
    },

  },
};
export const OpenWithEditTarget: Story = {
  args: {

    dialog: {
      open: true,
      dragTargetName: "comment_target_name",
      currentUserId: '',

    },

  },
};
export const Close: Story = {
  args: {
    dialog: {
      open: false,
      dragTargetName: undefined,
      currentUserId: ''
    },
  },
};
