import { Meta, StoryObj } from "@storybook/react";
import "../../index.css";
import React, { useEffect } from "react";
import { Application, Sprite } from 'pixi.js';
import Button from "@mui/material/Button";
import AlertDialog from "../../components/Dialog";
import Canva from "../../components/pixi.js";

const meta: Meta<typeof Canva> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/Canva",
  component: Canva,
  render: function Render(args: any) {
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
        <Canva {...args} setDialog={setDialog} />
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const DraggableAndAddComments: Story = {
  args: {
  },
};
