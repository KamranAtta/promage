import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table, Typography } from 'antd';
import { ProjectInterface } from '../interfaces';
import Loader from '../../components/common/Loader';
import { getProjectById, getTasksByProject } from '../../apis/project.api';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ProjectDetail() {
    const [project, setProject] = useState<ProjectInterface>();
    const [tasks, setTasks] = useState<any>();
    const [loader, setLoader] = useState<boolean>(false);
    const { id } = useParams();

    const getProject = async () => {

        setLoader(true);
        const response = await getProjectById(id as string);
        setProject(response?.data);
        setLoader(false);
    }


    const getTasks = async () => {
        setLoader(true);
        const response = await getTasksByProject(id as unknown as string);
        setTasks(response?.data);
        setLoader(false);
    }

    const columns = [
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Dnd Date',
            dataIndex: 'end Date',
            key: 'endDate',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        }
    ];

    useEffect(() => {
        getProject();
        getTasks();
      }, [id]);

      useEffect(() => {
        getProject();
        getTasks();
      }, []);

  return (
    <>
        <Row style={{display: 'felx', justifyContent: 'center', marginTop: '20px'}}>
            <Col span={22}>
                <Card title={project?.name}>
                    <Row gutter={24}>
                        <Col span={8} style={{padding: '10px'}}>
                            <Card title="Project Details" bordered={false}>
                                {project?.description}
                            </Card>
                        </Col>
                        <Col span={8} style={{padding: '10px'}}>
                            <Card title="Manager" bordered={false}>
                                {project?.manager}
                            </Card>
                        </Col>
                        <Col span={8} style={{padding: '10px'}}>
                            <Card title="Duration" bordered={false}>
                            <p>
                                Start Date:{' '}
                                <strong>
                                    {project?.startDate
                                    ? dayjs(project?.startDate).format('DD/MM/YYYY')
                                    : ''}
                                </strong>{' '}
                                </p>
                                <p>
                                End Date:{' '}
                                <strong>
                                    {project?.endDate ? dayjs(project?.endDate).format('DD/MM/YYYY') : ''}
                                </strong>{' '}
                                </p>
                            </Card>
                        </Col>
                    </Row>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px', alignItems: 'center'}}>
                            <Typography.Title level={4}>Tasks</Typography.Title>
                            <Link to={`/projects/${id}/create-task`}><Button>Add Task</Button></Link>
                    </div>
                    <Table dataSource={tasks} columns={columns} />;
                </Card>
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </>
  );
};