import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'transformColumnNamesPipe',
  standalone: true
})
export class TransformColumnNamesPipe implements PipeTransform {
  transform(column: string) {
    switch (column) {
      case ('id') : {
        return 'გაწევრიანების id'
      }
      case ('studentId') : {
        return 'ID'
      }
      case ('studentName') : {
        return 'სახელი'
      }
      case ('studentSurname') : {
        return 'გვარი'
      }
      case ('studentMobileNumber') : {
        return 'ნომერი'
      }
      case ('studentSpecialty') : {
        return 'სპეციალობა'
      }
      case ('isEmployed') : {
        return 'დასაქმებული'
      }
      case ('grade') : {
        return 'ქულა'
      }
      case ('studentEmail') : {
        return 'მეილი'
      }
      case ('gradeLetter') : {
        return 'შეფასება'
      }
      case ('enrollmentDate') : {
        return 'გაწევრიანება'
      }
      default :
        return 'ბლა'
    }
  }
}
