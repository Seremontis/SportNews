import { Injectable } from '@angular/core';
@Injectable(
    {
        providedIn: "root"
    })
export class DarkMode {
    elementToChangeModeWithBorder: string[] = ['.contentPage', '.mainBar', '.contentSchedule', '.NavSide'];
    //customATageToChangeMdoe:string[]=['a','.mainBar'];
    public blackModeActivation() {
        this.elementToChangeModeWithBorder.forEach(element => {
            let tag = <HTMLElement>document.querySelector(element);
            if (!tag.classList.contains("darkbackground"))
                this.prependClass(tag, "darkbackground");
        })
        let list = document.querySelectorAll('a');

        list.forEach(element => {
            if (!element.classList.contains("colorLinkDarkMode")) {
                if (!element.classList.contains("whiteTheme"))
                    this.prependClass(<HTMLElement>element, "colorLinkDarkMode");
            }
        })

        let listIcon = document.querySelectorAll('nav>ul>li');

        listIcon.forEach(element => {
            let tmp=<HTMLElement>element.childNodes[0];
            tmp.classList.add('DarkIconColor');
        })

        localStorage.setItem('darkMode', 'true');
    }

    DarkModeMenuLink(){
        let list = document.querySelectorAll('nav>ul>li');

        list.forEach(element => {
            let tmp=<HTMLElement>element.childNodes[0];
            tmp.classList.add('DarkIconColor');
            tmp=<HTMLElement>element.childNodes[1];
            tmp.classList.add('colorLinkDarkMode');
        })

        localStorage.setItem('darkMode', 'true');
    }

    standardThemeActive() {
        let tags = document.querySelectorAll('.darkbackground');
        tags.forEach(element => {
            element.classList.remove('darkbackground');
        })
        let atag = document.querySelectorAll('.colorLinkDarkMode');
        atag.forEach(element => {
            element.classList.remove('colorLinkDarkMode');
        })
        let icontag = document.querySelectorAll('.DarkIconColor');
        icontag.forEach(element => {
            element.classList.remove('DarkIconColor');
        })
        if (localStorage.getItem('darkMode'))
            localStorage.removeItem('darkMode');
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
