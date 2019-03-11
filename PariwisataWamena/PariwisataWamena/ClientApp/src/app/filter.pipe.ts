import { Pipe, PipeTransform } from '@angular/core';
import { Article } from './models/models.component';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Article[], searchText: string): any[] {
        if (!items) { return []; }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.title.toLowerCase().includes(searchText) 
            || it.content.toLowerCase().includes(searchText)
            ||it.type.toLowerCase().includes(searchText);
        });
    }
}
