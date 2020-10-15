import { Component, OnInit } from '@angular/core';
import { HostListener,ElementRef,ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Loading } from 'src/assets/Loading';
import { ApiService} from 'src/service/ApiService'
import { WCategory } from 'src/service/model/WCategory';
import { AccessData } from 'src/service/AccessData';
import { BarVisitorComponent } from '../barVisitor/barVisitor.component';
import { DarkMode } from 'src/service/DarkMode';
import { Router } from '@angular/router';
import { ApiVisitorService } from 'src/service/ApiVisitorService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  @ViewChildren('li') elements: QueryList<any>;
  CategoryList:WCategory[];
  private readonly loading:Loading=new Loading();
  constructor(private apiSevice: ApiVisitorService,private accessData: AccessData, 
    private route:Router,private mode:DarkMode) {
   this.LoadCategory();
 
  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));

  }
  ngAfterViewInit(){
    if(!this.CategoryList)
      this.loading.Loading(document.querySelector('.visitor'),'text-primary');
      if (localStorage.getItem('darkMode')){
        this.elements.changes.subscribe(li => {
          li.forEach(elm => this.mode.DarkModeMenuLink())
        }) 
      }    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let container=document.querySelector('.container-fluid');
    let header=document.querySelector('header');
    let nav=<HTMLElement>document.querySelector('nav.visitor');
    let footer=document.querySelector('footer');
    let communityElement=<HTMLElement>document.querySelector('.searcherAndSocialMedia');
    let appMenu=<HTMLElement>document.querySelector('app-menu>.flex-column');
    if(event.target.innerWidth <= 768){
      if(!document.querySelector('.divFooter')){
        let createDiv=document.createElement("div");
        createDiv.classList.add("row");
        createDiv.classList.add("divFooter");
        header.parentElement.classList.add("standardItem");
        createDiv.appendChild(footer);
        container.appendChild(createDiv);      
        document.querySelector('.mainBar').appendChild(nav);
        nav.style.height='0';
        nav.style.minHeight='auto'
        nav.style.visibility='hidden';
        //appMenu.removeChild(nav);
      }
    }
    else{
      header.parentElement.classList.remove("standardItem"); 
      communityElement.appendChild(footer);   
      let element= document.querySelector('.divFooter');    
      if(element)
        container.removeChild(element);
      appMenu.insertBefore(nav,communityElement);
      nav.style.height='auto';
      nav.style.minHeight='auto';
      nav.style.visibility='visible';
    }
  }

  LoadCategory(){
    this.apiSevice.GetCategory().subscribe(
      (response) => {                          
        console.log('response received');
        this.CategoryList = response;
        this.accessData.SetCategoryList(this.CategoryList);
        this.loading.LoadingDelete(document.querySelector('.visitor')); 
      },
      (error) => {                      
        console.error('Request failed with error')
      });
  }

  SearchArticle(data){
    if(data.value.keywords){
      localStorage.setItem('searchtext',data.value.keywords);
      this.route.navigate(['search']);
    }
    else
      alert('Puste pole wyszukiwarki');
   
  }
}
