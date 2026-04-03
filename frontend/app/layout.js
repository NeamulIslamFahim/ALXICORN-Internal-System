import styles from "./layout.module.css";

export const metadata = {
  title: "ALXICORN Internal System Dashboard",
  description: "Internal System dashboard powered by ALXICORN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={styles.body} suppressHydrationWarning>{children}</body>
    </html>
  );
}
