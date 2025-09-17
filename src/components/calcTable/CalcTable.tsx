import React, { useRef } from "react";
import type { Product, Row } from "../../types/types";
import { useDownloadExcel } from "react-export-table-to-excel";

type CalcTableProps = {
    rows: Row[];
    products: Product[];
}

export default function CalcTable({ products, rows }: CalcTableProps) {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'calc',
        sheet: 'Calc'
    })

    return (
        <>
            <table ref={tableRef} className="w-full border-collapse border border-gray-400 text-sm">
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
            <button onClick={onDownload}>Експортувати таблицю у Excel</button>
        </>
    );
}
