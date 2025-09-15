import React from "react";
import type { Product } from "../../types/types";

const rows = [
    { id: 1, name: "Сировина та основні матеріали", key: "materials" },
    { id: 2, name: "Допоміжні матеріали", key: "addMaterials" },
    { id: 3, name: "Зворотні відходи (-)", key: "waste" },
    { id: 4, name: "Основна з/п виробничих робітників", key: "mainSalary" },
    { id: 5, name: "Додаткова з/п виробничих робітників", key: "addSalary" },
    { id: 6, name: "Нараховано ЄСВ", key: 'tax' },
    { id: 7, name: "Витрати на підготовку та освоєння виробництва", key: "prepCosts" },
    { id: 8, name: "Загальновиробничі витрати", key: "genCosts" },
    { id: 9, name: "Адміністративні витрати", key: 'adminCosts' },
];

type CalcTableProps = {
    products: Product[];
}

export default function CalcTable({ products }: CalcTableProps) {
    return (
        <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead>
                <tr>
                    <th rowSpan={2} className="border px-2 py-1">№</th>
                    <th rowSpan={2} className="border px-2 py-1">Перелік статей витрат</th>
                    <th colSpan={products.length * 2} className="border px-2 py-1">Вид продукції</th>
                </tr>
                <tr>
                    {products.map((p, idx) => (
                        <th key={idx} colSpan={2} className="border px-2 py-1">{p.name}</th>
                    ))}
                </tr>
                <tr>
                    <th colSpan={2}></th>
                    {products.map((_, idx) => (
                        <React.Fragment key={idx}>
                            <th className="border px-2 py-1">На одиницю</th>
                            <th className="border px-2 py-1">На випуск</th>
                        </React.Fragment>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                        <td className="border px-2 py-1">{row.id}</td>
                        <td className="border px-2 py-1">{row.name}</td>
                        {products.map((p, idx) => {
                            const perUnit = (row.key ? (p as never)[row.key] : 0);
                            const total = perUnit * p.quantity;
                            return (
                                <React.Fragment key={idx}>
                                    <td className="border px-2 py-1">{perUnit}</td>
                                    <td className="border px-2 py-1">{total}</td>
                                </React.Fragment>
                            );
                        })}
                    </tr>
                ))}

                <tr className="font-bold">
                    <td colSpan={2} className="border px-2 py-1">Виробнича собівартість</td>
                    {products.map((p, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <td className="border px-2 py-1">{p.unitCosts}</td>
                                <td className="border px-2 py-1">{p.totalCosts}</td>
                            </React.Fragment>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
}
