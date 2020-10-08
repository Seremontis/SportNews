import { Injectable } from '@angular/core';
@Injectable(
    {
        providedIn: "root"
    })
export class DarkMode {
    elementToChangeModeWithBorder: string[] = ['.contentPage', '.mainBar', 
    '.contentSchedule', '.NavSide', '.input-group-append>span', '.menuSchedule>button',
    '.result','.schedule','.breakLine'];
    public blackModeActivation() {
        this.elementToChangeModeWithBorder.forEach(element => {
            let tags = document.querySelectorAll(element);
            tags.forEach(tag => {
                if (!tag.classList.contains("darkbackground"))
                    this.prependClass(<HTMLElement>tag, "darkbackground");
            })
        })
        let list = document.querySelectorAll('a');

        list.forEach(element => {
            if (!element.classList.contains("colorLinkDarkMode")) {
                if (!element.classList.contains("whiteTheme"))
                    this.prependClass(<HTMLElement>element, "colorLinkDarkMode");
            }
        })

        document.querySelectorAll('nav>ul>li').forEach(element => {
            let tmp = <HTMLElement>element.childNodes[0];
            tmp.classList.add('DarkIconColor');
        })

        document.querySelectorAll('.navOption>li').forEach(element => {
            element.classList.add('DarkBorderBottom');
        })

        let results = document.querySelectorAll('.result>.line,.schedule,figcaption');
        results.forEach(element => {
            element.classList.add('DarkIconColor');
        })


        document.querySelector('.search').classList.add('darkbackground');
        document.querySelector('.rulesAndAuthor').classList.add('DarkIconColor');
        let checkH1=document.querySelector('main>h1')
        if(checkH1)
            checkH1.classList.add('DarkIconColor');

        let span = document.querySelector('.nullArticle')
        if (span)
            span.classList.add('DarkIconColor');
        let button = document.querySelector('.addArticle')
        if (button)
            button.classList.add('DarkIconColorMedia');

        localStorage.setItem('darkMode', 'true');

        this.prependClass(document.querySelector('.iconSearch'), 'DarkIconColor')
        let footer = document.querySelectorAll('.fab,app-article');
        footer.forEach(element => {
            let tmp = <HTMLElement>element;
            this.prependClass(tmp, 'DarkIconColorMedia');
        })

        this.DarkModeFigure();
    }

    DarkModeMenuLink() {
        let list = document.querySelectorAll('nav.visitor>ul>li');

        list.forEach(element => {
            element.classList.add('DarkBorderBottom');
            let tmp = <HTMLElement>element.childNodes[0];
            tmp.classList.add('DarkIconColor');
            tmp = <HTMLElement>element.childNodes[1];
            tmp.classList.add('colorLinkDarkMode');
        })
        localStorage.setItem('darkMode', 'true');
    }
    DarkModeFigure() {
        let list = document.querySelectorAll('.card,figure');

        list.forEach(element => {
            this.prependClass(<HTMLElement>element, 'darkbackground');
            this.prependClass(element.querySelector('header'), 'headerDarkMode');
            if (element.querySelector('h1'))
                this.prependClass(element.querySelector('h1'), 'headerDarkMode');
        })

        localStorage.setItem('darkMode', 'true');
    }
    standardThemeActive() {
        document.querySelectorAll('.darkbackground').forEach(element => {
            element.classList.remove('darkbackground');
        })
        document.querySelectorAll('.colorLinkDarkMode').forEach(element => {
            element.classList.remove('colorLinkDarkMode');
        })
        document.querySelectorAll('.DarkIconColor').forEach(element => {
            element.classList.remove('DarkIconColor');
        })
        document.querySelectorAll('.DarkBorderBottom').forEach(element => {
            element.classList.remove('DarkBorderBottom');
        })
        document.querySelectorAll('.card,figure').forEach(element => {
            element.classList.remove('darkbackground');
            element.querySelectorAll('.headerDarkMode').forEach(subelement => {
                subelement.classList.remove('headerDarkMode');
            })
        })
        document.querySelectorAll('.DarkIconColorMedia').forEach(element => {
            element.classList.remove('DarkIconColorMedia');
        })
        if (localStorage.getItem('darkMode'))
            localStorage.removeItem('darkMode');
    }

    SpanNullArticle() {
        if (document.querySelector('.nullArticle'))
            document.querySelector('.nullArticle').classList.add('DarkIconColor');
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
