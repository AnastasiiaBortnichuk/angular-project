import { Pipe, PipeTransform } from '@angular/core';
import { IAddress } from '@shared/types';

@Pipe({
  name: 'addressFormatter'
})
export class AddressFormatterPipe implements PipeTransform {

  transform(value: IAddress): string {
    if (!value) {
      return '';
    }
    return `${value.street}, ${value.city}, ${value.zip}`;
  }

}
