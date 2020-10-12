import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'should call getApiMessage',
    waitForAsync(() => {
      const data = { message: 'ApiMessage' };

      service
        .getApiMessage()
        .subscribe((result) => expect(result).toEqual('ApiMessage'));

      const request = httpTestingController.expectOne(
        'http://localhost:3333/api'
      );
      expect(request.request.method).toBe('GET');

      request.flush(data);
      httpTestingController.verify();
    })
  );
});
