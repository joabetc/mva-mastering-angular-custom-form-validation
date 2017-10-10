import { Component, Directive } from "@angular/core";
import { FormControl, NG_ASYNC_VALIDATORS, AbstractControl } from "@angular/forms";

import { Books } from "./services/books";

const validateBookIdFactory = (books: Books) => {

    return (c: AbstractControl) => {
        if (c.value == null || String(c.value).length === 0) {
            return Promise.resolve(null);
        }

        return new Promise((resolve, reject) => {
            books.getBook(Number(c.value)).subscribe(() => {
                resolve(null);
            }, () => {
                resolve({bookId: true});
            });
        })
    }
};

@Directive({
    selector: "[valid-book-id][ngModel]",
    providers: [
        { provide: NG_ASYNC_VALIDATORS, useFactory: validateBookIdFactory, multi: true, deps: [ Books ] }
    ],
})
export class BookIdValidatorDirective { }

@Component({
    selector: "main",
    styles: [
        "input.ng-valid ~ span { display: none; }",
    ],
    template: `
        <div>
            <label for="book-id-input">Book Id:</label>
            <input type="tel" id="book-id-input" valid-book-id [(ngModel)]="bookId">
            <span>
                Book Id is not valid.
            </span>
        </div>
    `,
})
export class AppComponent { }
