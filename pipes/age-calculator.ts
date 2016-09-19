import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageCalculator'
})
export class AgeCalculator implements PipeTransform{
  transform( value ) {
    /*
    let year = value.substr(0, 4);
    return new Date().getFullYear() - year;
    */
    let birthday = new Date( value ).getTime();
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}

