import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MfqbNumPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'mfqbNum',
})
export class MfqbNumPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(num: any, i: number) {
    if (num == 0) {
      return 0;
    } else if (!num) {
      return null;
    } else if (typeof num !== 'number') {
      return '请传入number类型';
    }
    else {
      let newNum = num.toFixed(i);
      return newNum;
    }
  }
}
