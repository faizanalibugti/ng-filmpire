import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsComponent } from './actors.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@ng-filmpire/material';

describe('ActorsComponent', () => {
  let component: ActorsComponent;
  let fixture: ComponentFixture<ActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
      declarations: [ActorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
