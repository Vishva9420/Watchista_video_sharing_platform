import { TestBed } from '@angular/core/testing';

import { Login2AuthService } from './login2-auth.service';

describe('Login2AuthService', () => {
  let service: Login2AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Login2AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
