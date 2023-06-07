import { Inject, Optional, Injectable, InjectionToken } from '@angular/core';

export const LOGGER_VERBOSE_LEVEL = new InjectionToken<string>('VerboseLevel');

@Injectable()
export class LoggerService {
  private readonly verboseLevel: number;

  constructor(@Optional() @Inject(LOGGER_VERBOSE_LEVEL) verboseLevel?: number) {
    this.verboseLevel = (verboseLevel || verboseLevel === 0) ? verboseLevel : 99;
  }

  public error(message: string): void {
    this.verboseLevel > 0 && console.error(message);
  }
  public warn(message: string): void {
    this.verboseLevel > 1 && console.warn(message);
  }
  public info(message: string): void {
    this.verboseLevel > 2 && console.info ? console.info(message) : console.log(message);
  }
  public log(message: string): void {
    this.verboseLevel > 3 && console.log(message);
  }
}
