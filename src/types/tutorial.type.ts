import { TLesson } from "./lesson.type";

export type TCreateTutorial = {
  title: string;
  link: string;
  description?: string;
  lesson: string;
  isDeleted: boolean;
};
export type TTutorial = {
  _id: string;
  title: string;
  link: string;
  description?: string;
  lesson: TLesson;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};
