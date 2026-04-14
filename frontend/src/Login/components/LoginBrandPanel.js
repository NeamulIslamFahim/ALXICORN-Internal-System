import Image from "next/image";
import styles from "../styles/login.module.css";

export default function LoginBrandPanel({ logo }) {
  return (
    <div className={styles.authBrandPanel}>
      <Image src={logo} alt="ALXICORN" className={styles.logoImage} priority />
    </div>
  );
}
