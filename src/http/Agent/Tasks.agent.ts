import { BasicAgent } from './Basic.agent';
import {
  GetAllTasksResponse,
  GetAllTasksQuery,
  UpdateTaskResponse,
  UpdateTaskRequest,
  CreateTaskRequest,
  CreateTaskResponse,
  GetTaskResponse,
} from 'http/Model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>(`/tasks`, {
      params,
    });

    return data;
  }
  async getOneTask(taskId: string): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${taskId}`);
    return data;
  }

  async updateTask(taskId: string, newData: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, newData);

    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }

  async createTask(newData: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { data } = await this._http.post<CreateTaskResponse>('/tasks', { ...newData, isCompleted: false });
    return data;
  }
}

export const TaskAgentInstance = new TasksAgent();
