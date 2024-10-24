import styles from "../../page.module.css";
interface demoProps {
  title: string;
  children: React.ReactNode;
}
export default function DemoLayout({ title,children }: demoProps) {
  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoTitle}>{title}</div>
      <div className={styles.demo}>{children}</div>
    </div>
  );
}
