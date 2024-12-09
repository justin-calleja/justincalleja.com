import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://justincalleja.com/", // replace this with your deployed domain
  author: "Justin Calleja",
  profile: "https://justincalleja.com/",
  desc: "My personal site using the astro-paper theme",
  title: "Justin Calleja",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  editPost: {
    url: "https://github.com/justin-calleja/justincalleja.com/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/justin-calleja/justincalleja.com",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/justin-calleja-b2833429/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
];
