import { Component } from '@angular/core';
import { MENU_ITEMS } from '@shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../styles/header.scss']
})
export class HeaderComponent {
  menuItems = [...MENU_ITEMS]
}
