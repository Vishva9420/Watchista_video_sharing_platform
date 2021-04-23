import { TestBed } from '@angular/core/testing';

import { LoginAuthGaurdService } from './login-auth-gaurd.service';

describe('LoginAuthGaurdService', () => {
  let service: LoginAuthGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAuthGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
