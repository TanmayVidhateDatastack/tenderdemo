export interface theaderprops {
  className: string;
  children?: React.ReactNode;
}

const TheaderComponent: React.FC<theaderprops> = ({ className, children }) => {
  return (
    <>
      <thead className={`py-2 ${className}`}>{children}</thead>
    </>
  );
};

export default TheaderComponent;
