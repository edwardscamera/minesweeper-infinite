import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Game } from './Game';

@Component({
  selector: 'app-infinisweeper',
  standalone: true,
  imports: [],
  templateUrl: './infinisweeper.component.html',
  styleUrl: './infinisweeper.component.scss'
})
export class InfinisweeperComponent implements AfterViewInit {
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;
  private element: HTMLElement | null = null;
  private game: Game | null = null;

  public ngAfterViewInit(): void {
    this.element = this.canvas.nativeElement.parentElement;

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.game = new Game(this.canvas.nativeElement); 
  }

  public resize(): void {
    this.canvas.nativeElement.width = this.element?.offsetWidth || 0;
    this.canvas.nativeElement.height = this.element?.offsetHeight || 0;
  }
}
