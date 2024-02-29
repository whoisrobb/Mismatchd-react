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
                title: "Blog",
                href: "/blog",
                description: "Read our latest blog posts.",
                items: [],
            },
            {
                title: "Contact me",
                href: "mailto:developedbyrobbie@gmail.com",
                description: "Reach out to me.",
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
            href: `/products?category=${(category.title)}`,
            description: `All ${category.title}.`,
            items: [],
          },
          ...category.Subcategories.map((subcategory) => ({
            title: subcategory.title,
            href: `/products?subCategory=${(subcategory.title)}`,
            description: subcategory.description,
            items: [],
          })),
        ],
      })),
    ]
  }