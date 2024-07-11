export interface StudentInfoModel {
  studentId: number,
  faculty: {
    id: number,
    name: string
  },
  specialty: {
    id: number,
    name: string,
    facultyId: string
  },
  name: string,

  surname: string,

  gender: number,
  dateOfBirth: string,
  personalNumber: string,
  univeristyMail: string,
  phoneNumber: string,
  stateFunding: number,
  endorsementCount: number,
  isEmployed: boolean,
}
