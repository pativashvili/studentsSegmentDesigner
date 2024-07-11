import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'transformRowNamesPipe',
  standalone: true
})
export class TransformRowNamesPipe implements PipeTransform {
  transform(row: string) {
    if (row.toString() === 'true') {
      return 'კი'
    }
    if (row.toString() === 'false') {
      return 'არა'
    }
    return row
  }
}
