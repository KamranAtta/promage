export interface ProjectInterface {
    _id: string;
    id: string;
    manager: string;
    name: string;
    description: string;
    isRunning: boolean;
    startDate: string;
    endDate: string
}