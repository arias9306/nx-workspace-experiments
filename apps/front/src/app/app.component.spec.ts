import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';

const mockApiService = () => ({
  getApiMessage: jest.fn(),
});

describe('AppComponent', () => {
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
