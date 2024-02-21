// import { productCategories } from "./data-temp";
import { getCategory } from "./server-functions/dashboard";
import { TCategory } from "./types/types";


const data: TCategory[] = await getCategory();

export const dashboardNavConfig = [
  {
    title: 'account',
    href: '/dashboard/account'
  },
  {
    title: 'site',
    href: '/dashboard/site'
  },
  {
    title: 'stores',
    href: '/dashboard/stores'
  },
  {
    title: 'blog',
    href: '/dashboard/blog'
  },
]

export const siteConfig = {
    name: "Mismatchd",
    description:
      "An ecommerce app with an intergrated CMS dashboard built with React, Express and PostgreSQL.",
    url: "https://skateshop.sadmn.com",
    ogImage: "https://skateshop.sadmn.com/opengraph-image.png",
    // links,
    siteNav: {
        title: "Store-front",
        items: [
            {
                title: "Products",
                href: "/products",
                description: "All the products we have to offer.",
                items: [],
            },
            {
                title: "Build a Board",
                href: "/build-a-board",
                description: "Build your own custom skateboard.",
                items: [],
            },
            {
                title: "Blog",
                href: "/blog",
                description: "Read our latest blog posts.",
                items: [],
            },
            ],
        },
    mainNav: [
      ...data.map((category) => ({
        title: category.title,
        items: [
          {
            title: "All",
            href: `/categories/${(category.title)}`,
            description: `All ${category.title}.`,
            items: [],
          },
          ...category.Subcategories.map((subcategory) => ({
            title: subcategory.title,
            href: `/categories/${(category.title)}`,
            description: subcategory.description,
            items: [],
          })),
        ],
      })),
    ] /* satisfies MainNavItem[], */
    /* footerNav: [
      {
        title: "Credits",
        items: [
          {
            title: "OneStopShop",
            href: "https://onestopshop.jackblatch.com",
            external: true,
          },
          {
            title: "Acme Corp",
            href: "https://acme-corp.jumr.dev",
            external: true,
          },
          {
            title: "craft.mxkaske.dev",
            href: "https://craft.mxkaske.dev",
            external: true,
          },
          {
            title: "Taxonomy",
            href: "https://tx.shadcn.com/",
            external: true,
          },
          {
            title: "shadcn/ui",
            href: "https://ui.shadcn.com",
            external: true,
          },
        ],
      },
      {
        title: "Help",
        items: [
          {
            title: "About",
            href: "/pages/about",
            external: false,
          },
          {
            title: "Contact",
            href: "/pages/Contact",
            external: false,
          },
          {
            title: "Terms",
            href: "/pages/terms",
            external: false,
          },
          {
            title: "Privacy",
            href: "/pages/privacy",
            external: false,
          },
        ],
      },
      {
        title: "Social",
        items: [
          {
            title: "Twitter",
            href: links.twitter,
            external: true,
          },
          {
            title: "GitHub",
            href: links.githubAccount,
            external: true,
          },
          {
            title: "Discord",
            href: links.discord,
            external: true,
          },
          {
            title: "cal.com",
            href: links.calDotCom,
            external: true,
          },
        ],
      },
      {
        title: "Lofi",
        items: [
          {
            title: "beats to study to",
            href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
            external: true,
          },
          {
            title: "beats to chill to",
            href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
            external: true,
          },
          {
            title: "a fresh start",
            href: "https://www.youtube.com/watch?v=rwionZbOryo",
            external: true,
          },
          {
            title: "coffee to go",
            href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
            external: true,
          },
        ],
      },
    ] satisfies FooterItem[], */
  }