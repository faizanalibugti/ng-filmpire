import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let snackbar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: MatSnackBar }] });
    service = TestBed.inject(NotificationsService);
    snackbar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
