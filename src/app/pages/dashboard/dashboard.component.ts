import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BaseComponentComponent } from '../../components/base-component/base-component.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [IonicModule, BaseComponentComponent],
  standalone: true,
})
export class DashboardComponent {}
