import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  /*host: {
    '(window:resize)': 'onResize($event)'
  }*/
})
export class MenuComponent implements OnInit {
  array=[];

  constructor() {
    for(let i=0;i<10;i++){
      this.array.push("Opcja "+(i+1))
    }
    
   }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let header=document.querySelector('header');
    console.log("header "+header);
    let nav=document.querySelector('nav');
    console.log("nav "+nav);
    let footer=<HTMLElement>document.querySelector('.searcherAndSocialMedia')||<HTMLElement>document.querySelector('.searcherAndSocialMediaStandard');
    console.log("footer "+footer);
    let height=header.offsetHeight+nav.offsetHeight+footer.offsetHeight;
    console.log('lacznie '+height);
    console.log(event.target.innerHeight);
    if(height>event.target.innerHeight){
      header.parentElement.classList.remove("stickyItem");
      header.parentElement.classList.add("standardItem");
      footer.classList.remove('searcherAndSocialMedia');
      footer.classList.add('searcherAndSocialMediaStandard');
    }
    else{
      header.parentElement.classList.add("stickyItem");
      header.parentElement.classList.remove("standardItem");
      footer.classList.add('searcherAndSocialMedia');
      footer.classList.remove('searcherAndSocialMediaStandard');
    }
  }
}
