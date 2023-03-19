import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fullname'
})

export class FullnamePipe implements PipeTransform {
    transform(user: {firstName: string, lastName: string}, locale: 'en' | 'fr' = 'en'): string {
        if(locale === 'fr')
        {
            return `${user.lastName.toLocaleUpperCase()} ${user.firstName.substring(0,1).toUpperCase()}${user.firstName.substring(1, user.firstName.length).toLowerCase()}`
        } return `${user.lastName.substring(0,1).toUpperCase()}${user.lastName.substring(1, user.lastName.length).toLowerCase()} ${user.firstName.substring(0,1).toUpperCase()}${user.firstName.substring(1, user.firstName.length).toLowerCase()}`
        
    }
}