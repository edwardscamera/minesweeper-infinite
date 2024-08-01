import { Routes } from '@angular/router';
import { TitleComponent } from './views/title/title.component';
import { PlayComponent } from './views/play/play.component';

export const routes: Routes = [
    { path: "", component: TitleComponent, pathMatch: "full", },
    { path: "play", component: PlayComponent, pathMatch: "prefix", },
];
