import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Row, Space, Table, Typography } from 'antd';
import { ProjectInterface } from '../interfaces';
import Loader from '../../components/common/Loader';
import { getProjects } from '../../apis/project.api';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { EditOutlined } from '@ant-design/icons';


export default function Projects() {
    const [projects, setProjects] = useState<ProjectInterface[]>([]);
    const [loader, setLoader] = useState<boolean>(false);


    const getTalks = async () => {
        setLoader(true);
        const response = await getProjects();
        setProjects(response?.data);
        setLoader(false);
    }

    const renderDate = (date: Date) => {
        return <>{date != undefined ? <p>{dayjs(date).format('DD/MM/YYYY')}</p> : <p>-</p>}</>;
      };

      const renderStatus = (status: boolean) => {
        return <Checkbox checked={status}></Checkbox>;
      };

    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (element: any) => (
                <Space size='middle'>
                  <Link to={`/projects/${element._id}`}>{element?.name}</Link>
                </Space>
              ),
        },
        {
            title: 'Manager',
            dataIndex: 'manager',
            key: 'manager',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: renderDate,
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            render: renderDate,
        },
        {
            title: 'Is Running',
            dataIndex: 'isRunning',
            key: 'isRunning',
            render: renderStatus
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: string, record: ProjectInterface) => (
              <div style={{textAlign: 'center'}}>
                <Link to={`/projects/${record?._id}/update`}><EditOutlined /></Link>
              </div>
            ),
          },
    ];

    useEffect(() => {
        getTalks();
      }, []);

  return (
    <>
        <Row style={{display: 'felx', justifyContent: 'center', marginTop: '20px'}}>
            <Col span={18}>
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px', alignItems: 'center'}}>
                    <Typography.Title level={4}>Projects</Typography.Title>
                    <Link to='/projects/create-project'><Button>Add Project</Button></Link>
                </div>
                <Table dataSource={projects} columns={columns} />
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </>
  );
};