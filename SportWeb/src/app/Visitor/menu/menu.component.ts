import { Component, OnInit } from '@angular/core';
import { HostListener,ElementRef,ViewChild } from '@angular/core';
import { ApiService} from 'src/service/ApiService'
import { WCategory } from 'src/service/model/WCategory';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  /*host: {
    '(window:resize)': 'onResize($event)'
  }*/
})
export class MenuComponent implements OnInit {

  CategoryList:WCategory[];
  constructor(private apiSevice: ApiService) {
    this.LoadCategory();
   }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let header=document.querySelector('header');
    let nav=document.querySelector('nav');
    let footer=<HTMLElement>document.querySelector('.searcherAndSocialMedia')||<HTMLElement>document.querySelector('.searcherAndSocialMediaStandard');
    let height=header.offsetHeight+nav.offsetHeight+footer.offsetHeight;
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
