import { Component, Directive, forwardRef } from "@angular/core";
import { FormControl, NG_ASYNC_VALIDATORS, AbstractControl, AsyncValidator } from "@angular/forms";

import { Observable } from "rxjs";

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
        { 
            provide: NG_ASYNC_VALIDATORS, 
            useExisting: forwardRef(() => BookIdValidatorDirective), 
            multi: true
        }
    ],
})
export class BookIdValidatorDirective implements AsyncValidator {

    private validator: (c: AbstractControl) => Promise<any> | Observable<any>;

    constructor(private books: Books) {
        this.validator = validateBookIdFactory(this.books);
    }

    public validate(c: AbstractControl) {
        return this.validator(c);
    }
}

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
