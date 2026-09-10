export interface TodoData {
  userId: string,
  title: string,
  abstract: string,
  completed: boolean,
  deadline: string
}

export interface Todo extends TodoData {
  _id: string
}