import { Component } from '@angular/core';
import { HomeComponent } from '../main';
import { DemosComponent } from '../demos/demos.component';
import GraphicSvgComponent from 'src/lib/independientes/graphic-svg/graphic-svg.component';
import { CalcComponent } from '../calc/calc.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menu = [
    { text: 'registro', icon: '', component: RegisterFormComponent},
    { text: 'calculadora', icon: '', component: CalcComponent},
    { text: 'demos', icon: '', component: DemosComponent},
    { text: 'inicio', icon: '', component: HomeComponent},
    { text: 'gráfico', icon: '', component: GraphicSvgComponent},
  ]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actual: any = this.menu[0].component;

  select(index: number) {
    this.actual = this.menu[index].component;
  }
}
