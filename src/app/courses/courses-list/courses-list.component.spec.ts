import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesListComponent } from "./courses-list.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

describe("CoursesListComponent", () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      imports: [HttpClientModule, StoreModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
