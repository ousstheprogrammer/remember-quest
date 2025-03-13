
export type Subject = 
  | "Math" 
  | "Science" 
  | "History" 
  | "English" 
  | "Art" 
  | "Music" 
  | "PE" 
  | "Languages" 
  | "Computer Science" 
  | "Other";

export interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
}

export type HomeworkFormData = Omit<HomeworkItem, 'id' | 'completed' | 'createdAt'>;
