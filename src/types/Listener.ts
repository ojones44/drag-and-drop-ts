import { Project } from '../classes/Project';

export type Listener<T> = (items: T[]) => void;
