export interface thprops {
  className: string;
  children?: React.ReactNode;
  content?: string;
  columnHeader?: string;
  columnIndex: number;
}

const ThComponent: React.FC<thprops> = ({
  className,
  children,
  content,
  columnHeader,
  columnIndex,
}) => {
  return (
    <>
      <th
        className={`ds_tableHeader d-flex ${className}`}
        data-column-name={columnHeader}
        data-column-index={columnIndex}
      >
        {children != null && content != null && (
          <span className="text-content">{content}</span>
        )}
        {children || content}
      </th>
    </>
  );
};

export default ThComponent;
