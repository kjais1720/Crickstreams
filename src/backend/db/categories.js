import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "International",
    linkPath:"/explore/International",
    categoryBanner:"/assets/category-banner-1.jpg"
  },
  {
    _id: uuid(),
    categoryName: "IPL",
    linkPath:"/explore/IPL",
    categoryBanner:"/assets/category-banner-2.jpg"
  },
  {
    _id: uuid(),
    categoryName: "Vintage",
    linkPath:"/explore/Vintage",
    categoryBanner:"/assets/category-banner-3.webp"
  },
  {
    _id: uuid(),
    categoryName: "All",
    linkPath:"/explore",
    categoryBanner:"/assets/category-banner-3.webp"
  },
];
