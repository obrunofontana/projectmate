import React from 'react';

import styles from './page.module.scss';

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
}

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};

export default Page;
