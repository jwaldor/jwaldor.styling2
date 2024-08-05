import type { Meta, StoryObj } from "@storybook/react";
import MessageThread from "./MessageThread";
import { fn } from "@storybook/test";

// type HeatType = Array<Array<0 | 1 | 2 | 3>>;
// export type HeatProps = { heatvalues: HeatType };

//👇 This default export determines where your story goes in the story list
const meta = {
  component: MessageThread,
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //   args: { onClick: fn() },
} satisfies Meta<typeof MessageThread>;

export default meta;
type Story = StoryObj<typeof MessageThread>;

const icon0 = "c3fa630880a17b97a1f864fb528f0aa2.png";
const icon1 = "b0fbdd8e320622de39475b562ddad56d.png";

export const FirstStory: Story = {
  args: {
    conversation: [
      {
        text: "I just completed my first 10k run this morning, and I feel amazing! It was a bit of a struggle towards the end, but pushing through the last kilometer was so rewarding. Now, I'm enjoying a big breakfast to refuel. If anyone wants to join me for a run next week, let me know!",
        isCurrentUser: false,
        icon: icon1,
        id: 0,
        userName: "Jill",
      },
      {
        text: "I'm planning a weekend getaway to the mountains and can't wait to disconnect from the hustle and bustle of city life. I've booked a cozy cabin with a fireplace, and I'm looking forward to some hiking, stargazing, and simply enjoying the peace and quiet.",
        isCurrentUser: false,
        icon: icon1,
        id: 1,
        userName: "Jill",
      },
      {
        text: "I've decided to take up a new hobby and start learning how to play the piano. It's something I've always wanted to do, and I finally signed up for lessons. The first few sessions have been challenging, but I love the feeling of progress with each practice.",
        isCurrentUser: true,
        icon: icon0,
        id: 2,
        userName: "Alice",
      },
      {
        text: "I just completed my first 10k run this morning, and I feel amazing! It was a bit of a struggle towards the end, but pushing through the last kilometer was so rewarding. Now, I'm enjoying a big breakfast to refuel. If anyone wants to join me for a run next week, let me know!",
        isCurrentUser: false,
        icon: icon1,
        id: 3,
        userName: "Jill",
      },
    ],
    //👇 The args you need here will depend on your component
  },
};
