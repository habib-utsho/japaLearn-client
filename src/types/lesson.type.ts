export type TCreateLesson = {
  name: string;
  number: number;
};
export type TLesson = {
  _id: string;
  name: string;
  number: number;
  vocabularyCount: number;
  isDeleted: boolean;
};
