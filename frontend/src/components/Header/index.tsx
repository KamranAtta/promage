import {  Layout, Typography } from 'antd';
import { ConfigConsumerProps } from 'antd/lib/config-provider';

const { Header } = Layout;

const styles = {
  headerHamburger: (themeConfig: ConfigConsumerProps) => ({
    color: themeConfig?.theme?.token?.colorPrimary,
  }),
  headerDrawer: {
    width: 'auto',
    borderRight: 'none',
  },
  displayFlex: {
    display: 'flex',
  }
};

export default function HeaderComponent() {

  return (
    <Header
      style={styles.displayFlex}
    >
      <div
        className='header-body'
      >
        <a href='/'>
          <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Typography.Title level={1} style={{color: 'white',marginTop:'10px'}}>ProMage</Typography.Title>
          </div>
        </a>
      </div>
    </Header>
  );
}
