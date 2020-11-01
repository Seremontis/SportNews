import { Component,OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Category} from 'src/service/model/Category';
import { WCategory } from 'src/service/model/WCategory';

@Component({
  selector: 'app-ModalUser',
  templateUrl: './ModalCategoryEdit.component.html',
  styleUrls: ['./ModalCategoryEdit.component.css']
})
export class ModalCategoryEditComponent implements OnInit {

  @Input() category: Category;
  @Input() CategoryList: WCategory[];
    ngOnInit() {
    }

  constructor(
    public activeModal: NgbActiveModal,
   ) {

   }



  submitForm(data) {
    this.category.name=data.value.CategoryName;
    this.category.categoryId=data.value.categoryId;
    this.activeModal.close(this.category);
  }
}
