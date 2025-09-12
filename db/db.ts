import { openDB } from "idb";
import type { Product } from "../src/types/types";

async function initDB() {
    return await openDB("plannedProdCostDB", 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("products")) {
                db.createObjectStore("products", {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        },
    });
}

async function addProduct(product: Product) {
    const db = await initDB();
    return await db.add("products", product);
}

async function getAllProducts() {
    const db = await initDB();
    return await db.getAll("products");
}

export { initDB, addProduct, getAllProducts };
