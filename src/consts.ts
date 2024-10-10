import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "raeperd.github.io",
  EMAIL: "raeperd@raeperd.dev",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 1,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Welcome to my personal website!",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "github",
    HREF: "https://github.com/raeperd",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/raeperd",
  },
  {
    NAME: "brunch",
    HREF: "https://brunch.co.kr/@raeperd",
  },
];
