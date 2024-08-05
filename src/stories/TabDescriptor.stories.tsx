import type { Meta, StoryObj } from "@storybook/react";
import TabDescriptor from "./TabDescriptor";
import { fn } from "@storybook/test";

// type HeatType = Array<Array<0 | 1 | 2 | 3>>;
// export type HeatProps = { heatvalues: HeatType };

//👇 This default export determines where your story goes in the story list
const meta = {
  component: TabDescriptor,
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //   args: { onClick: fn() },
} satisfies Meta<typeof TabDescriptor>;

export default meta;
type Story = StoryObj<typeof TabDescriptor>;

export const FirstStory: Story = {
  args: {
    tabs: [
      {
        name: "Nicki",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg",
        description:
          "A 28-year-old software engineer who loves AI, hiking, and sci-fi novels. Enjoys traveling and trying new recipes.",
      },
      {
        name: "Jake",
        picture:
          "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
        description:
          "A 35-year-old graphic designer who creates digital art, plays guitar, and practices yoga. Tech and gaming enthusiast.",
      },
      {
        name: "Akame",
        picture:
          "https://static.vecteezy.com/system/resources/thumbnails/022/963/918/small_2x/ai-generative-cute-cat-isolated-on-solid-background-photo.jpg",
        description: "Lorem ipsum dolor amit",
      },
    ],
    //👇 The args you need here will depend on your component
  },
};
