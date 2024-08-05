import type { Meta, StoryObj } from "@storybook/react";
import TaskList from "./TaskList";
import { fn } from "@storybook/test";

// type HeatType = Array<Array<0 | 1 | 2 | 3>>;
// export type HeatProps = { heatvalues: HeatType };

//👇 This default export determines where your story goes in the story list
const meta = {
  component: TaskList,
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //   args: { onClick: fn() },
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof TaskList>;

export const FirstStory: Story = {
  args: {
    initial_tasks: [
      { title: "Test", description: "description", id: 1, done: false },
      {
        title: "Sweep the Kitchen",
        description: "Get under the cabinets, do a good job",
        id: 2,
        done: false,
      },
      { title: "Another one!", description: "Do it!", id: 3, done: false },
    ],
    //👇 The args you need here will depend on your component
  },
};
