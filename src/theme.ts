export const theme = {
  fontSize: {
    /** 0.75rem = 12px */
    sm: "0.75rem",
    /** 1rem = 16px */
    md: "1rem",
  },
  fontWeight: {
   regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  space: {
    /** 0.0625rem = 1px */
    px: "0.0625rem",
    /** 0.125rem = 2px */
    xxs: "0.125rem",
    /** 0.25rem = 4px */
    xs: "0.25rem",
    /** 0.5rem = 8px */
    sm: "0.5rem",
    /** 1rem = 16px */
    md: "1rem",
    /** 2rem = 32px */
    lg: "2rem",
    /** 3rem = 48px */
    xl: "3rem",
    /** 5rem = 80px */
    xxl: "5rem",
  },

  radius: {
    /** 0.25rem = 4px */
    md: "0.25rem",
    /** 0.5rem = 8px */
    lg: "0.5rem",
  },

  size: {
    dialogWidth: "480px",
    dialogMaxHeight: "90vh",
  },

  color: {
    active: "#00A6F4",
    text: {
      default: "#52525C",
      inverted: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      backdrop: "rgb(0 0 0 / 0.5)",
      hover: "#E4E4E7",
      press: "#9F9FA9",
      focus: "#D4D4D8",
      
      keyButton: "#52525C",
      keyButtonHover: "#3F3F46",
      keyButtonPress: "#27272A",
      keyButtonFocus: "#3F3F46",
    },
    stroke: {
      default: "#D4D4D8",
      focus: "#00A6F4",
      ghostButton: "#52525C",
    },
  },

  shadow: {
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
} as const;
