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

export type TProduct = {
    productId: string;
    name: string;
    description: string;
    category: string;
    subCategory: string;
    imageUrls: string[];
    price: number;
    inventory: number;
    ratings: number;
    tags: string;
    StoreStoreId: string;
}

export type TFilters = {
    priceFrom? : string | null;
    priceTo? : string | null;
    order? : string | null;
    orderBy? : string | null;
    category? : string | null;
};