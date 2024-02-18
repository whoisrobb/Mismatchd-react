export type LayoutProps = {
    children: React.ReactNode;
}

export type TCategory = {
    categoryId: string;
    title: string;
    Subcategories: TSubcategory[] | [];
}

export type TSubcategory = {
    subcategoryId: string;
    title: string;
    description: string;
    slug: string;
    CategoryCategoryId: string;
}

export type TStore = {
    storeId: string;
    name: string;
    userId: string;
    // description: string;
}