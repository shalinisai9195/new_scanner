import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './scanner/scanner.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
