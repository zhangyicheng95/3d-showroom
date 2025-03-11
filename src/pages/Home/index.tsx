import React, { Fragment } from 'react';
import HomeHeader from '../Header';
import styles from './index.less';
import HomeBody from '../HomeBody';
import { useReloadAfterStationary } from '@/hooks/useReloadAfterStationary';

const HomePage: React.FC<any> = () => {

  // 一个小时无操作，自动reload清理缓存
  // useReloadAfterStationary({ wait: 1000 * 60 * 30, interval: 1000 * 60 }, () => {
  //   window.location.reload();
  // });

  return (
    <div className={`flex-box-column ${styles.homePage}`}>
      {
        // !!localStorage.getItem('user-logined') ?
        <Fragment>
          <HomeHeader />
          <HomeBody />
        </Fragment>
        // : null
      }
    </div>
  );
};

export default HomePage;
