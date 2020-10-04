import { Component, OnInit } from '@angular/core';
import { HostListener,ElementRef,ViewChild } from '@angular/core';
import { ApiService} from 'src/service/ApiService'
import { WCategory } from 'src/service/model/WCategory';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  CategoryList:WCategory[];
  constructor(private apiSevice: ApiService) {
    this.LoadCategory();
   }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let container=document.querySelector('.container-fluid');
    let header=document.querySelector('header');
    let nav=document.querySelector('nav');
    let footer=document.querySelector('footer');
    let communityElement=<HTMLElement>document.querySelector('.searcherAndSocialMedia');
    if(event.target.innerWidth <= 768){
      if(!document.querySelector('.divFooter')){
        let createDiv=document.createElement("div");
        createDiv.classList.add("row");
        createDiv.classList.add("divFooter");
        header.parentElement.classList.remove("stickyItem");
        header.parentElement.classList.add("standardItem");
        createDiv.appendChild(footer);
        container.appendChild(createDiv);
      }
    }
    else{
      header.parentElement.classList.add("stickyItem");
      header.parentElement.classList.remove("standardItem"); 
      communityElement.appendChild(footer);   
      let element= document.querySelector('.divFooter');
      if(element)
        container.removeChild(element);
    }
  }

  LoadCategory(){
    this.apiSevice.GetCategory().subscribe(
      (response) => {                           //next() callback
        console.log('response received');
        this.CategoryList = response;
      },
      (error) => {                        //error() callback
        console.error('Request failed with error')
      },
      () => {
        console.info('Request completed')      //This is actually not needed 
      });
  }
}
