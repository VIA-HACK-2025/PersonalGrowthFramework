import { Task } from './task';
export interface Node {
    _id: number;
    parentId?: string;
    children?: Node[];
    data?: Task[]
}