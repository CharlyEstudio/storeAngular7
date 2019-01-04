import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
    selector: 'app-paginas',
    templateUrl: './paginas.component.html',
    styles: []
})

export class PaginasComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        init_plugins();
    }
}
