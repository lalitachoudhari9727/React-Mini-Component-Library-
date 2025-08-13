# Mini Component Library

This is small component library with a few basic components.


## Table of Contents

- [Used Technologies](#used-technologies)
- [How to Use the Project](#how-to-use-the-project)
  - [Running the Project Locally](#running-the-project-locally)
  - [Project Structure](#project-structure)
- [Appendix](#appendix)
  - [Optional: EmotionJS Introduction](#optional-emotionjs-introduction)
    - [Styled Component Basics](#styled-component-basics)
    - [Using JavaScript in Your Styles](#using-javascript-in-your-styles)
    - [Passing Typed Props](#passing-typed-props)
    - [Using Selectors and Pseudo-classes](#using-selectors-and-pseudo-classes)
    - [Using Media Queries](#using-media-queries)

## Used Technologies

> Note: The technologies are already set up and ready to use, _you won't need to dive any deeper_.
> This section is just for context.

It uses the following technologies:

- `React` / `TypeScript` - Main technologies that you should already be familiar with.
- `Vite` - Build tool to transpile and bundle our code. It is a modern alternative
  to `CRA` / `react-scripts`. Configuration can be found in the `vite.config.ts` file.\
  [Documentation](https://vite.dev/guide/)
- `Storybook` - Frontend tool for building UI components and pages in isolation.
  It is used to document and test components and will be your main entry point when
  running your code. Configuration can be found in the `.storybook` directory.\
  [Documentation](https://storybook.js.org/docs)
- `EmotionJS` - CSS-in-JS library to style React components within your JavaScript files.
  It provides multiple ways to write CSS, of which we use the `styled components` approach.\
  [Documentation](https://emotion.sh/docs/styled)


Please don't add any npm packages beyond that.

## How to Use the Project

### Running the Project Locally

1. Install the dependencies with `npm i`.
   > Note: If you encounter issues with the dependencies, you might be able to fix
   > them by removing the `package-lock.json` and re-running `npm i`.
2. Run the project with `npm run start`\
   This will start the project on localhost and open your browser with the Storybook UI.
3. In the UI, you can select the component you want to work on from the left-side menu.\
   You can also adjust props and see the changes in real-time by using the inputs in the bottom panel.
   (If it is not visible, check the Storybook options in the top-left corner and activate "Show Addons")

Available scripts:

- `npm run start`: Start the Storybook in development mode to preview your components.
- `npm run ts-check`: Run a TypeScript validation on all files. This will fail initially, due to missing `<Button>` props.
- `npm run bundle`: Transpile the library code for the npm package.
- `npm run format`: Format your code with prettier.

### Project Structure

The following list outlines the project's structure.

- `src/`: The source code of the component library.
  - `src/button/`: This is  `<Button>` component.
  - `src/dialog/`: This is  `<Dialog>` component.
  - `src/icon/`: An `<Icon>` component that should be used for the `<Button>` icon prop.
  - `src/stack/`: A `<Stack>` component that can be used to stack elements vertically or horizontally.
    This is mostly here as demo code. Using it is optional.
  - `src/theme.ts`: Shared `theme` object that should be used to write component styles.
  - `src/global.css`: Styles that are applied globally when using this library.
- `.storybook/`: Configuration for the Storybook.
- `scripts/`: CLI scripts to be used in the project, e.g. to transpile the library.
- `stories/`: Contains the stories and documentation of the components, displayed in the Storybook.

## Appendix


### Optional: EmotionJS Introduction

Since I am using `EmotionJS` for styling,
here's a quick introduction if you're not familiar with it.

> Note: By default, your IDE probably won't recognize the CSS-in-JS syntax demonstrated below.
> There are plugins available for most IDEs to support this. If you want to have IDE support,
> just search for `styled-components` in your IDE's plugin store.

#### Styled Component Basics

With the styled import of `@emotion/styled`, you can create components that render
a styled version of any `HTML` element like this:

```tsx
import styled from "@emotion/styled";

// Create a styled component
const Padding = styled.div`
  padding: 1rem;
`;

// Then use it like a native HTML element
<Padding id="padded-element">Some content</Padding>;
```

> Note: If you're unfamiliar with the syntax, it's called a `tagged template` or `tag function`.
> Don't mind it too much. Think of the div like a function that gets passed the string
> inside the backticks as an argument.

This will create a `div` element with a padding of `1rem`.
You can also use any other HTML element, such as `styled.button`, `styled.input`, `styled.span`, etc.

#### Using JavaScript in Your Styles

Since this is a CSS-in-JS library, you can also pass JavaScript in your styled components,
which can be very useful. For example, you can import our theme object and directly
use it in the `<Padding>` component we just created:

```tsx
import styled from "@emotion/styled";
import { theme } from "./src/theme";

const Padding = styled.div`
  padding: ${theme.space.md};
`;
```

Since this is a template string, everything inside `${...}` is evaluated as JavaScript.
So you can also use ternaries and similar conditions in there:

```tsx
const Padding = styled.div`
  padding: ${smallPadding ? theme.space.sm : theme.space.md};
  margin: ${addMargin && theme.space.md};
`;
```

#### Passing Typed Props

Now for the most interesting part: passing typed props to your styled components.

The styled function can consume a generic type, which will be added to the native
HTML props on the element. To access these new props, we need to use `styled.div`
as a regular function.

See the steps one by one:

```tsx
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "./src/theme";

// Step 1: Add the new prop types

type PaddingValue = "lg" | "md" | "sm";
interface PaddingProps {
  top?: PaddingValue;
  right?: PaddingValue;
  bottom?: PaddingValue;
  left?: PaddingValue;
}

const Padding = styled.div<PaddingProps>`
  /* Some CSS */
`;

// Step 2: Call `styled.div` as a regular function to access the props

const Padding = styled.div<PaddingProps>(
  (props) => css`
    /* Some CSS */
  `,
);

// Step 3: Use the props in the css

const Padding = styled.div<PaddingProps>(
  (props) => css`
    padding-top: ${theme.space[props.top]};
    padding-right: ${theme.space[props.right]};
    padding-bottom: ${theme.space[props.bottom]};
    padding-left: ${theme.space[props.left]};
  `,
);

// Step 4: Use the component with the props
<Padding top="sm" left="lg">
  Some content
</Padding>;
```

#### Using Selectors and Pseudo-classes

Another useful CSS feature for the `<Button>` task is using pseudo-classes like `:hover`.
This works similarly to the `CSS nesting` syntax of vanilla CSS:

```tsx
const Button = styled.button`
  /** Some button styles */

  > span {
    color: red;
  }

  &:hover {
    background-color: ${theme.colors.background.hover};
  }
`;
```

#### Using Media Queries

You can even pass media queries inside styled components:

```tsx
const Component = styled.div`
  max-width: 20rem;

  @media (max-width: 22rem) {
    max-width: calc(100vw - 2rem);
  }
`;
```

This wraps up the introduction. You should now know all the required features to
complete this exercise. If you need more information, check the documentation:
[EmotionJS styled docs](https://emotion.sh/docs/styled)
