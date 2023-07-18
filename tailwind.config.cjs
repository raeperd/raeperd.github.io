function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Remove the following screen breakpoint or add other breakpoints
    // if one breakpoint is not enough for you
    screens: {
      sm: "640px",
    },

    // Uncomment the following extend
    // if existing Tailwind color palette will be used

    // extend: {
    textColor: {
      skin: {
        base: withOpacity("--color-text-base"),
        accent: withOpacity("--color-accent"),
        inverted: withOpacity("--color-fill"),

        rosewater: withOpacity("--color-rosewater"),
        flamingo: withOpacity("--color-flamingo"),
        pink: withOpacity("--color-pink"),
        mauve: withOpacity("--color-mauve"),
        red: withOpacity("--color-red"),
        maroon: withOpacity("--color-maroon"),
        peach: withOpacity("--color-peach"),
        yellow: withOpacity("--color-yellow"),
        green: withOpacity("--color-green"),
        teal: withOpacity("--color-teal"),
        sky: withOpacity("--color-sky"),
        sapphire: withOpacity("--color-sapphire"),
        blue: withOpacity("--color-blue"),
        lavender: withOpacity("--color-lavender"),
        text: withOpacity("--color-text"),
        subtext1: withOpacity("--color-subtext1"),
        subtext0: withOpacity("--color-subtext0"),
        overlay2: withOpacity("--color-overlay2"),
        overlay1: withOpacity("--color-overlay1"),
        overlay0: withOpacity("--color-overlay0"),
        surface2: withOpacity("--color-surface2"),
        surface1: withOpacity("--color-surface1"),
        surface0: withOpacity("--color-surface0"),
        mantle: withOpacity("--color-mantle"),
        crust: withOpacity("--color-crust"),
      },
    },
    backgroundColor: {
      skin: {
        fill: withOpacity("--color-fill"),
        accent: withOpacity("--color-accent"),
        inverted: withOpacity("--color-text-base"),
        card: withOpacity("--color-card"),
        "card-muted": withOpacity("--color-card-muted"),
      },
    },
    outlineColor: {
      skin: {
        fill: withOpacity("--color-accent"),
      },
    },
    borderColor: {
      skin: {
        line: withOpacity("--color-border"),
        fill: withOpacity("--color-text-base"),
        accent: withOpacity("--color-accent"),
      },
    },
    fill: {
      skin: {
        base: withOpacity("--color-text-base"),
        accent: withOpacity("--color-accent"),
      },
      transparent: "transparent",
    },
    fontFamily: {
      mono: ["IBM Plex Mono", "monospace"],
    },
    // },
  },
  plugins: [require("@tailwindcss/typography")],
};
