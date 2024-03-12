/* eslint-disable no-console */
import { doGet, doPost } from '../utils/request';

export const getProjects = async () => {
  try {
    const response = await doGet('/getProjects');
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const response = await doGet(`/projects/${id}`);
    return response;
  } catch (err: any) {
    return err;
  }
};


export const createProject = async (data: any) => {
  try {
    const response = await doPost('/createProject', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const updateProject = async (data: any) => {
  try {
    const response = await doPost('/updateProject', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const createTask = async (data: any) => {
  try {
    const response = await doPost('/createTask', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const updateTask = async (data: any) => {
  try {
    const response = await doPost('/updateTask', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getTasksByProject = async (id: string) => {
  try {
    const response = await doGet(`/projects/${id}/tasks`);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const sendMail = async (body: any) =>{
  try {
    const response = await doPost('/sendMessage', body);
    return response;
  } catch (err: any) {
    return err;
  }
}