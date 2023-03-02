export interface IUser {
  id: string,
  registerDate: string;
  fio: string;
  position: POSITIONS;
  email: string;
  password: string;
  phoneNumber: string;
}

export const enum POSITIONS {
  DEVELOPER  = 'Разработчик',
  QA = 'Тестировщик',
  PM = 'Менеджер проектов',
  HR = 'HR'
}
