export interface TCreateVocabulary {
  word: string;
  meaning: string;
  pronunciation: string;
  whenToSay: string;
  lessonNumber: number;
  adminEmail: string;
}
export type TVocabulary = {
  _id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  whenToSay: string;
  lessonNumber: number;
  adminEmail: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
