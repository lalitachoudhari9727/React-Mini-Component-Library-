import { action } from "@storybook/addon-actions";

export const clickAction = (
  component: string,
  name: string,
  alert = `${component}.${name} fired!`,
) => {
  const storybookAction = action(name);
  return (args?: unknown) => {
    storybookAction(args);
    window.alert(alert);
  };
};
