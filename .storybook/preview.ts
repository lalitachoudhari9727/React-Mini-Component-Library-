import type { Preview } from "@storybook/react";

const preview: Preview = {
  tags: ["autodocs"],
  
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" },
    controls: { expanded: true, sort: "requiredFirst" },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Your Tasks", "Other Components"],
      },
    },
  },
};
export default preview;
