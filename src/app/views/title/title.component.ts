import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  constructor(private router: Router) { }
  
  public play(): void {
    this.router.navigate(["play"]);
  }
}
