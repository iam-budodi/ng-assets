import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: unknown[]): unknown {
        // return object[keyName];
    const keys: string[] = keyName.split('.');
    let value = object;
    for (const key of keys) {
      if (value == null) {
        return null;
      }
      value = value[key];
    }
    return value;

  }



}
