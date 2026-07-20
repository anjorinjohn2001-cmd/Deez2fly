export interface Product {
    id: string;

    name: string;

    description: string;

    price: number;

    category: string;

    image: string;

    images?: string[];

    sizes: string[];

    stock: number;

    created_at?: string;
}