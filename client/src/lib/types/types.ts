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

// {
//     "categoryId": "8bef0a05-e2c4-4d8d-86ea-caf7ce692753",
//     "title": "Clothing",
//     "createdAt": "2024-02-18T12:22:46.750Z",
//     "updatedAt": "2024-02-18T12:22:46.750Z",
//     "Subcategories": [
//         {
//             "subcategoryId": "d3b28ceb-5d63-4a86-b40c-6c3a6fa3181e",
//             "title": "T-Shirts",
//             "description": "Cool and comfy tees for effortless style.",
//             "slug": "t-shirts",
//             "createdAt": "2024-02-18T12:34:25.917Z",
//             "updatedAt": "2024-02-18T12:34:25.917Z",
//             "CategoryCategoryId": "8bef0a05-e2c4-4d8d-86ea-caf7ce692753"
//         }