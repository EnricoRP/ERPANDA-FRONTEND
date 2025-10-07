import { adminSideBarLinks } from "@/constants";

export const getBreadcrumbs = (pathname: string) => {
  for (const link of adminSideBarLinks) {
    if (link.route === pathname) return [{ text: link.text, href: link.route }];

    if (link.children) {
      const child = link.children.find((c) => c.route === pathname);
      if (child) {
        return [
          { text: link.text, href: link.route }, // Parent
          { text: child.text, href: child.route }, // Child
        ];
      }
    }
  }

  return [];
};
