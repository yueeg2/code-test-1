import type { Meta, StoryObj } from "@storybook/react";
import '../../index.css'
import Comments from "../../components/Comments";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Comments> = {
  title: "Components/Comments",
  component: Comments,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    currentUserId: '2'
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Comments>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const LoggedInAsJack: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    currentUserId: '1'
  },
};
export const LoggedInAsRobert: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    currentUserId: '2'
  },
};
export const NotLogged: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    currentUserId: '13'
  },
};
