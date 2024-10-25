import styles from "../../page.module.css";
interface demoProps {
  title: string;
  className?:string;
  children: React.ReactNode;
}
export default function DemoLayout({ title,className,children }: demoProps) {
  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoTitle}>{title}</div>
      <div className={styles.demo +" "+ styles[className?className:""]}>{children}</div>
    </div>
  );
}
