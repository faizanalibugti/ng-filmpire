import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInfoComponent } from './person-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@ng-filmpire/material';

describe('PersonInfoComponent', () => {
  let component: PersonInfoComponent;
  let fixture: ComponentFixture<PersonInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
      declarations: [PersonInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
