/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarUserComponent } from './barUser.component';

describe('BarUserComponent', () => {
  let component: BarUserComponent;
  let fixture: ComponentFixture<BarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
