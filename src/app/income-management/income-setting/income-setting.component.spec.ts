import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSettingComponent } from './income-setting.component';

describe('IncomeSettingComponent', () => {
  let component: IncomeSettingComponent;
  let fixture: ComponentFixture<IncomeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
