import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@ng-filmpire/material';
import { MovieInformationComponent } from './movie-information.component';

describe('MovieInformationComponent', () => {
  let component: MovieInformationComponent;
  let fixture: ComponentFixture<MovieInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
      declarations: [MovieInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
