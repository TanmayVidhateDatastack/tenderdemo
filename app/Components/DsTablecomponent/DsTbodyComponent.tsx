export interface tbodyprops {
  className: string;
  children?: React.ReactNode;
}

const TbodyComponent: React.FC<tbodyprops> = ({ className, children }) => {
  return (
    <>
      <tbody className={className}>{children}</tbody>
    </>
  );
};

export default TbodyComponent;
