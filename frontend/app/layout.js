import "../src/userManagement/styles.css";

export const metadata = {
  title: "ALXICORN Internal System Dashboard",
  description: "Internal System dashboard powered by ALXICORN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
