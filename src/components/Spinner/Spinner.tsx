import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
      <p>Cargando...</p>
    </div>
  );
};

export default Spinner;