import { toast } from "sonner";
import { serverUrl } from "../utils";


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