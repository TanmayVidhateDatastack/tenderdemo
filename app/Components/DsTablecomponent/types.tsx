// Type definitions
export class tcolumn {
  columnIndex: number = 1;
  className?: string;
  columnHeader: string = "";
  isHidden?: boolean = false;
  sort?: string;
  columnContentType?: string;
}

export class cellData {
  columnIndex: number = 1;
  className?: string;
  content: React.ReactNode | string | number;
  contentType?: string;
}

export class trow {
  rowIndex: number = 1;
  className?: string;
  content?: cellData[];
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const convertToDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
};

export const parseFormattedNumber = (value: string): number => {
  return Number(value.replace(/,/g, "")); // Remove commas and convert to number
};
