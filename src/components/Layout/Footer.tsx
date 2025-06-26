import styles from '../../styles/sections/Layout.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>© {new Date().getFullYear()} Интернет-магазин. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;