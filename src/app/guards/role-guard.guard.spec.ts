import { TestBed } from '@angular/core/testing';

import { RoleGuardService } from './role-guard.service';

describe('RoleGuardGuard', () => {
  let guard: RoleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuardService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
