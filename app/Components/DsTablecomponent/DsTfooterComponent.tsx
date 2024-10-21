export interface tfooterprops {
  className: string;
  children?: React.ReactNode;
}

const TfooterComponent: React.FC<tfooterprops> = ({ className, children }) => {
  return (
    <>
      <tbody className={className}>{children}</tbody>
    </>
  );
};

export default TfooterComponent;
