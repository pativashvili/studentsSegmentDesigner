import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'progressBarPipe',
  standalone: true
})
export class ProgressBarPipe implements PipeTransform {
  transform(passed: any, failed: number, fail?: boolean) {
    return fail ? Math.round(failed / passed * 100) : Math.round(100 - failed / passed * 100)
  }
}
