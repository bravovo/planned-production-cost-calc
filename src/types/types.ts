export interface Product {
    name: string;
    materials: number;
    addMaterials: number;
    waste: number;
    mainSalary: number;
    addSalary: number;
    genCosts: number;
    quantity: number;
    tax: number;
    prepCosts: number;
    adminCosts: number;
    unitCosts: number;
    totalCosts: number;
}

export type Row = { id: number; name: string; key: string };
