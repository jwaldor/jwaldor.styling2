import type { Meta, StoryObj } from "@storybook/react";
import Post from "./Post";

const meta = {
  component: Post,
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //   args: { onClick: fn() },
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof Post>;

export const FirstStory: Story = {
  args: {
    name: "Helena",
    icon: "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-99573-1490908.jpg&fm=jpg",
    group: "Group name",
    time: 3,
    description: "Post description",
    likes: 21,
    comments: 4,
    //👇 The args you need here will depend on your component
  },
};
