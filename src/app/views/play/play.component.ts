import { Component } from '@angular/core';
import { InfinisweeperComponent } from "../../components/infinisweeper/infinisweeper.component";

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [InfinisweeperComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent {

}
