import { ComponentFixture, TestBed } from '@angular/core/testing';
import GraphicSvgComponent from './graphic-svg.component';

describe('GraphicSvgComponent', () => {
  let component: GraphicSvgComponent;
  let fixture: ComponentFixture<GraphicSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GraphicSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('changeColor', () => {
    spyOn(Math, 'random').and.returnValues(0.1, 0.2, 0.3)
    component.changeColor()
    expect(component.fillColor).toBe('rgb(25, 51, 76)');
  });
});
