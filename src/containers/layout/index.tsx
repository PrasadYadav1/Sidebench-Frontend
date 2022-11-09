import { Outlet } from 'react-router-dom';
import Header from '../../components/header';
import styles from './styles';

const Layout = () => {
  return (
    <div style={styles.layout_conatiner}>
      <Header />
      <div style={styles.layout_main}>
        <div style={styles.left_pannel}>
          <>left pannel</>
        </div>
        <div style={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
