import { Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/Header';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import LandingPage from './views/Landing';
import { styles } from './styles';
import ProjectForm from './components/Form/Project';
import ProjectDetail from './views/ProjectDetail';
import TaskForm from './components/Form/Task';

const Router = () => {
  return (
    <Layout>
      <Header style={styles.header}>
        <HeaderComponent></HeaderComponent>
      </Header>
      <Content style={{background: 'white'}}>
        <Routes>
          <Route
            path='/'
            element={
              <LandingPage />
            }
          />
          <Route
            path='/projects'
            element={
              <LandingPage />
            }
          />
          <Route
            path='/projects/:id'
            element={
              <ProjectDetail />
            }
          />
          <Route
            path='/projects/:projectId/create-task'
            element={
              <TaskForm />
            }
          />
          <Route
            path='/projects/create-project'
            element={
              <ProjectForm />
            }
          />
          <Route
            path='/projects/:id/update'
            element={
              <ProjectForm />
            }
          />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Router;
