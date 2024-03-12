/* eslint-disable camelcase */
import {
  Button,
  Col,
  DatePicker,
  Form,
  Grid,
  Input,
  Row,
  Space,
  Card,
  notification,
  Checkbox,
  CheckboxProps
} from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { formItemLayout, styles } from './styles';
import { MESSAGES, PAGE_TITLES } from '../../../utils/constant';
import { createProject, getProjectById, updateProject } from '../../../apis/project.api';
import Loader from '../../common/Loader';
import TextArea from 'antd/es/input/TextArea';

const ProjectForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  const { md } = Grid.useBreakpoint();
  const [loader, setLoader] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const getTalkById = async () => {
    setLoader(true);
    if (id) {
      const response = await getProjectById(id as string);
      
      const data = response?.data;
      data.startDate = data?.startDate ? dayjs(new Date(data?.startDate)): null;
      data.endDate = data?.endDate ? dayjs(new Date(data?.endDate)): null;
      setIsRunning(data.isRunning);
      form.setFieldsValue(data);
    } else {
      form.setFieldsValue([]);
    }
    setLoader(false);
  };

const onChange: CheckboxProps['onChange'] = (e) => {
  setIsRunning(e.target.checked);
};

  useEffect(() => {
    getTalkById();
  }, []);

  const onFinish = async (values: any) => {
    setLoader(true);
    values.startDate =
      values.startDate != undefined
        ? new Date(values.startDate)
        : null;
    values.endDate =
      values.endDate != undefined
        ? new Date(values.endDate)
        : null;
    values.isRunning = isRunning;
    values.id = id;
    if (id) {
      const response = await updateProject(values);
      if(response?.statusCode === 401){
        notification.open({
          message: MESSAGES.LOGIN_ERROR,
        });
        setLoader(false);
      } else {
        if (response.err) {
          notification.open({
            message: response?.err?.message,
          });
          setLoader(false);
        } else {
          navigate('/projects');
        }
      }
    } else {
      const response = await createProject(values);
      if(response?.statusCode === 401){
        notification.open({
          message: MESSAGES.LOGIN_ERROR,
        });
        setLoader(false);
      }else {
        if (response.err) {
          notification.open({
            message: response?.err?.message,
          });
          setLoader(false);
        } else {
          navigate('/projects');
        }
      }
    }
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
        <Card
          title={id ? PAGE_TITLES.EDIT_PROJECT : PAGE_TITLES.ADD_NEW_PROJECT}
          style={md ? styles.card : styles.formPadding}
        >
          <Form
            {...formItemLayout}
            form={form}
            className='project-form'
            name='addUpdateProject'
            onFinish={onFinish}
          >
            <Row gutter={24}>
              <Col span={12} xs={24} sm={12}>
                <Form.Item
                  name='name'
                  label={'Name'}
                  rules={[
                    {
                      required: true,
                      message: 'Name is required!',
                    },
                  ]}
                >
                  <Input placeholder={'Name'} />
                </Form.Item>
              </Col>
              <Col span={12} xs={24} sm={12}>
                <Form.Item
                  name='manager'
                  label={'Manager'}
                  rules={[
                    {
                      required: true,
                      message: 'Manager is required!',
                    },
                  ]}
                >
                  <Input placeholder={'Manager'} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12} xs={24} sm={12}>
                <Form.Item
                  name='startDate'
                  label={'Start Date'}
                  rules={[
                    {
                      required: true,
                      message: 'Start Date is required!',
                    },
                  ]}
                >
                  <DatePicker
                    style={styles.fullWidth}
                  />                
                </Form.Item>
              </Col>
              <Col span={12} xs={24} sm={12}>
                <Form.Item
                  name='endDate'
                  label={'End Date'}
                  rules={[
                    {
                      required: true,
                      message: 'End Date is required!',
                    },
                  ]}
                >
                  <DatePicker
                    style={styles.fullWidth}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} xs={24} sm={24}>
                <Form.Item
                  name='isRunning'
                  label= 'Is Running'
                >
                  <Checkbox checked={isRunning} onChange={onChange}></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} xs={24} sm={24}>
                <Form.Item name="description" label="Project Detail">
                    <TextArea rows={8} />
                </Form.Item>
              </Col>
            </Row>
            <Space direction='horizontal' style={styles.center}>
              <Row gutter={24}>
                <Col>
                  <Form.Item>
                    <Button type='default' htmlType='reset'>
                      Reset
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      {id ? 'Update' : 'Add'}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Space>
          </Form>
          <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
        </Card>
      </div>
    </>
  );
};
export default ProjectForm;
