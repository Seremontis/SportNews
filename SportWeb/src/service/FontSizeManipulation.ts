import { Injectable } from '@angular/core';
@Injectable(
    {
        providedIn: "root"
    })
export class FontSizeManipulation {
    allFontStyleClass = ['largetext', 'veryLargetext', 'largeh1', 'largeh5', 'verylargeh1', 'verylargeh5'];

    normalFontchange() {
        this.allFontStyleClass.forEach(element => {
            document.querySelectorAll('.' + element).forEach(subelement => {
                subelement.classList.remove(element);
            })
        });
        localStorage.removeItem('FontMode');
    }

    largeFontchange() {
        if (!document.querySelector('.largetext'))
            this.normalFontchange();
        this.prependClass(document.querySelector('body'), 'largetext');
        document.querySelectorAll('h1').forEach(element => {
            this.prependClass(element, 'largeh1');
        })
        document.querySelectorAll('h5').forEach(element => {
            this.prependClass(element, 'largeh5');
        })
        localStorage.setItem('FontMode', '1');
    }

    largeFontchangeAferLoad() {
        let main=document.querySelector('main');
        main.querySelectorAll('h1').forEach(element =>{
            element.classList.add('largeh1');
        })
        main.querySelectorAll('h5').forEach(element =>{
            element.classList.add('largeh5');
        })
    }

    veryLargeFontchange() {
        if (!document.querySelector('.veryLargetext'))
            this.normalFontchange();
        this.prependClass(document.querySelector('body'), 'veryLargetext');
        document.querySelectorAll('h1').forEach(element => {
            this.prependClass(element, 'verylargeh1');
        })
        document.querySelectorAll('h5').forEach(element => {
            this.prependClass(element, 'verylargeh5');
        });
        localStorage.setItem('FontMode', '2');
    }
    verylargeFontchangeAferLoad() {
        let main=document.querySelector('main');
        main.querySelectorAll('h1').forEach(element =>{
            element.classList.add('verulargeh1');
        })
        main.querySelectorAll('h5').forEach(element =>{
            element.classList.add('verylargeh5');
        })
    }
    prependClass(sel: HTMLElement, strClass: string) {
        let clone = <HTMLElement>sel.cloneNode(true);
        let list = clone.classList;
        if (list) {
            sel.className = '';
            sel.classList.add(strClass);
            for (let i = 0; i < list.length; i++) {
                sel.classList.add(list[i]);
            }
        }
        else
            sel.classList.add(strClass);
    }
}
