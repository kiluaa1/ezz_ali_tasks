import { TestBed } from '@angular/core/testing';

import { CanActiveedGuard } from './can-activeed.guard';

describe('CanActiveedGuard', () => {
  let guard: CanActiveedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActiveedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
