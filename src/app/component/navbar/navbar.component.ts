import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  selectedBtn: number = 0;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log();
        const url = event.url;
        if (url.includes('tasks')) {
          this.selectedBtn = 0;
        }

        if (url.includes('tasks/table')) {
          this.selectedBtn = 1;
        }

        if (url.includes('new')) {
          this.selectedBtn = 2;
        }
      });

  }
}
