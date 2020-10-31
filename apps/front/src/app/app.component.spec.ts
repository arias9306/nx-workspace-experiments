import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { FrontMaterialModule } from '@nx-workspace-experiments/front/material';

const mockApiService = () => ({
  getApiMessage: jest.fn(),
});

describe('AppComponent', () => {
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FrontMaterialModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: ApiService,
          useFactory: mockApiService,
        },
      ],
    }).compileComponents();

    apiService = TestBed.inject(ApiService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the api message', () => {
    jest.spyOn(apiService, 'getApiMessage').mockReturnValue(of('ApiMessage'));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ApiMessage');
  });
});
