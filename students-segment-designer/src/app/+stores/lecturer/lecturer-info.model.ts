export interface LecturerInfoModel {
  "id": number,
  "personalNumber": string,
  "name": string,
  "surname": string,
  "degree": string,
  "type": string,
  "faculty": {
    "id": 1,
    "name": string
  },
  "age": number,
  "dateOfBirth": string,
  "startedWorking": string
}
