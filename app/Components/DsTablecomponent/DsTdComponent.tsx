export interface tdprops {
  className: string;
  children?: React.ReactNode;
  content?: string | React.ReactNode;
}

const TdComponent: React.FC<tdprops> = ({ className, children, content }) => {
  return (
    <>
      <td className={className}>
        {children != null && content != null && (
          <span className="text-content">{content}</span>
        )}
        {children || content}
      </td>
    </>
  );
};

export default TdComponent;
