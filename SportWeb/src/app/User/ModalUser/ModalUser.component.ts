import { Component,OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Category} from 'src/service/model/Category';

@Component({
  selector: 'app-ModalUser',
  templateUrl: './ModalUser.component.html',
  styleUrls: ['./ModalUser.component.css']
})
export class ModalUserComponent implements OnInit {

  @Input() category: Category;

    ngOnInit() {
         console.log(this.category);
    }

  constructor(
    public activeModal: NgbActiveModal,
   ) {

   }



  submitForm(data) {
    this.category.name=data.value.CategoryName;
    this.activeModal.close(this.category);
  }
}
