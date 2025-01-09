import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BaseComponentComponent } from '../../components/base-component/base-component.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, BaseComponentComponent],
  standalone: true,
})
export class HomePage {
  isDarkMode = false;

  constructor(private router: Router) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
