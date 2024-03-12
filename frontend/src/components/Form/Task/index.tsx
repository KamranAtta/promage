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
  } from 'antd';
  import { useState } from 'react';
  import dayjs from 'dayjs';
  import { useNavigate, useParams } from 'react-router-dom';
  import weekday from 'dayjs/plugin/weekday';
  import localeData from 'dayjs/plugin/localeData';
  import { PAGE_TITLES } from '../../../utils/constant';
  import { createTask } from '../../../apis/project.api';
  import Loader from '../../common/Loader';
import { formItemLayout, styles } from '../Project/styles';
  
  const TaskForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { projectId } = useParams();
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    const { md } = Grid.useBreakpoint();
    const [loader, setLoader] = useState<boolean>(false);
  
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
        values.projectId = projectId;
        const response = await createTask(values);
        if (response.err) {
            notification.open({
              message: response?.err?.message,
            });
            setLoader(false);
          } else {
            navigate('/projects');
          }
    };
  
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
          <Card
            title={ PAGE_TITLES.ADD_NEW_TASK}
            style={md ? styles.card : styles.formPadding}
          >
            <Form
              {...formItemLayout}
              form={form}
              className='task-form'
              name='addUpdateTask'
              onFinish={onFinish}
            >
              <Row gutter={24}>
                <Col span={24} xs={24} sm={24}>
                  <Form.Item
                    name='description'
                    label={'Description'}
                    rules={[
                      {
                        required: true,
                        message: 'Description is required!',
                      },
                    ]}
                  >
                    <Input placeholder={'Description'} />
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
                        {'Add'}
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
  export default TaskForm;
  