import type { Meta, StoryObj } from "@storybook/react";
import HeatGrid from "./HeatGrid";
import { fn } from "@storybook/test";

// type HeatType = Array<Array<0 | 1 | 2 | 3>>;
// export type HeatProps = { heatvalues: HeatType };

//👇 This default export determines where your story goes in the story list
const meta = {
  component: HeatGrid,
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //   args: { onClick: fn() },
} satisfies Meta<typeof HeatGrid>;

export default meta;
type Story = StoryObj<typeof HeatGrid>;

export const FirstStory: Story = {
  args: {
    heatvalues: [
      [0, 1, 2, 3, 0],
      [2, 2, 2, 0, 1],
      [3, 1, 2, 0, 1],
      [1, 2, 2, 2, 0],
      [2, 0, 1, 0, 1],
      [0, 3, 1, 1, 1],
      [3, 3, 1, 3, 2],
    ],
    //👇 The args you need here will depend on your component
  },
};
