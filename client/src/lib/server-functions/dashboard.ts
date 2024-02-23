import { toast } from "sonner";
import { serverUrl } from "../utils";
import { TFilters } from "../types/types";


export const getCategory = async () => {
    try {
        const response = await fetch(`${serverUrl}/site/category`)
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const createCategory = async (title: string) => {
    try {
        const response = await fetch(`${serverUrl}/site/category/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        })
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const createSubcategory = async ({ title, description, categoryId }: { title: string, description: string, categoryId: string }) => {
    try {
        const response = await fetch(`${serverUrl}/site/category/sub/create/${categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const getStores = async () => {
    try {
        const response = await fetch(`${serverUrl}/store`)
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const getSingleStore = async (storeId: string) => {
    try {
        const response = await fetch(`${serverUrl}/store/${storeId}`)
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const createStore = async ({ name, userId }: { name: string, userId: string }) => {
    try {
        const response = await fetch(`${serverUrl}/store/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, userId })
        })
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
}

export const createProduct = async ({ formData, storeId }: { formData: FormData, storeId: string }) => {
    try {
        const response = await fetch(`${serverUrl}/store/products/create/${storeId}`, {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const updateProduct = async ({ formData, storeId }: { formData: FormData, storeId: string }) => {
    try {
        const response = await fetch(`${serverUrl}/store/products/update/${storeId}`, {
            method: 'PATCH',
            body: formData
        })
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const getProducts = async () => {
    try {
        const response = await fetch(`${serverUrl}/store/products`)
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
}

export const getFilteredProducts = async (filters: TFilters) => {
    try {
        const response = await fetch(`${serverUrl}/store/products/filtered`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
}

export const getStoreProducts = async (storeId: string) => {
    try {
        const response = await fetch(`${serverUrl}/store/${storeId}/products`)
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
}

export const getSingleProduct = async (productId: string) => {
    try {
        const response = await fetch(`${serverUrl}/store/products/${productId}`)
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const deleteProduct = async (productId: string) => {
    try {
        const response = await fetch(`${serverUrl}/store/products/${productId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const deleteCategory = async (categoryId: string) => {
    try {
        const response = await fetch(`${serverUrl}/site/category/${categoryId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const deleteSubcategory = async (subcategoryId: string) => {
    try {
        const response = await fetch(`${serverUrl}/site/category/sub/${subcategoryId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};