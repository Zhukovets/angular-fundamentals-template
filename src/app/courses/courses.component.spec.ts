import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesComponent } from "./courses.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

describe("CoursesComponent", () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [HttpClientModule, StoreModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
