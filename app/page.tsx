import NewTableComponent from "./Components/DsTablecomponent/NewTableComponent";

export default function Home() {
  const tempTableData = {
    className: "sample-table",
    id: "table-1",
    columns: [
      {
        columnIndex: 0,
        className: "header-column",
        columnHeader: "ID",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 1,
        className: "header-column",
        columnHeader: "Name",
        isHidden: false,
        sort: "NONE",
        columnContentType: "string",
      },
      {
        columnIndex: 2,
        className: "header-column",
        columnHeader: "Age",
        isHidden: false,
        sort: "DESC",
        columnContentType: "number",
      },
      {
        columnIndex: 3,
        className: "header-column",
        columnHeader: "Date of birth",
        isHidden: false,
        sort: "NONE",
        columnContentType: "date",
      },
    ],
    rows: [
      {
        rowIndex: 0,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: "1",
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "John Doe",
            contentType: "string",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "28",
            contentType: "number",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "2024-12-02",
            contentType: "date",
          },
        ],
      },
      {
        rowIndex: 1,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: "2",
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "Jane Smith",
            contentType: "string",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "34",
            contentType: "number",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "2024-11-02",
            contentType: "date",
          },
        ],
      },
      {
        rowIndex: 2,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: "3",
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "Alice Johnson",
            contentType: "string",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "25",
            contentType: "number",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "2024-10-02",
            contentType: "date",
          },
        ],
      },
    ],
  };

  // let minValue = 0;
  // let maxValue = 0;

  // const getLowestBiggestValue = (columnIndex: number) => {
  //   tempTableData.rows.map((row) =>
  //     row.content.forEach((cell) => {
  //       if (cell.columnIndex == columnIndex) {
  //         minValue = Number(cell.content);
  //       }
  //     })
  //   );

  //   tempTableData.columns.map((col: tcolumn) => {
  //     tempTableData.rows.map((row) => {
  //       row.content.forEach((cell) => {
  //         if (
  //           col.columnIndex == columnIndex &&
  //           col.columnIndex == row.content[0].columnIndex &&
  //           Number(cell.content) < minValue
  //         ) {
  //           minValue = Number(cell.content);
  //         }
  //         if (
  //           col.columnIndex == columnIndex &&
  //           Number(cell.content) > maxValue
  //         ) {
  //           maxValue = Number(cell.content);
  //         }
  //       });
  //     });
  //   });
  // };

  // getLowestBiggestValue(2);
  return (
    <>
      <div className={"table-container"}>
        <NewTableComponent
          className={tempTableData.className}
          id={tempTableData.id}
          columns={tempTableData.columns}
          rows={tempTableData.rows}
        ></NewTableComponent>
      </div>
    </>
  );
}
