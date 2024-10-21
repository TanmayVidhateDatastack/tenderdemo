// components/TableComponents/TableBody.tsx
import React from "react";
import { tcolumn, trow } from "./types";

export interface TableBodyProps {
  className: string;
  rows: trow[];
  newRows: trow[];
  columns: tcolumn[];
}

const TableBody: React.FC<TableBodyProps> = ({
  className,
  rows,
  newRows,
  columns,
}) => {
  return (
    <>
      <tbody
        className={`h-parent overflow-auto divide-y divide-gray-200 ${className}`}
      >
        {newRows.map((newRow) => {
          const row = rows.find((x) => x.rowIndex === newRow.rowIndex);
          return (
            <tr
              key={newRow.rowIndex}
              className={
                row?.className ? `${row.className} align-top` : "align-top"
              }
            >
              {columns.map((col) => {
                const cell = row?.content?.find(
                  (data) => data.columnIndex === col.columnIndex
                );

                if (!col.isHidden && cell) {
                  const cellClassName = col.className
                    ? `${cell.className ? cell.className : ""} py-2 ${
                        col.className
                      }`
                    : `${cell.className ? cell.className : "py-2"}`;

                  return (
                    <td key={col.columnIndex} className={cellClassName}>
                      {cell.content}
                    </td>
                  );
                }

                return null; // Return null when no cell or column to display
              })}
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default TableBody;
