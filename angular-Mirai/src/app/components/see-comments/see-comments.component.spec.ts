import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeCommentsComponent } from './see-comments.component';

describe('SeeCommentsComponent', () => {
  let component: SeeCommentsComponent;
  let fixture: ComponentFixture<SeeCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
