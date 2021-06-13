import { Injectable } from '@angular/core';
import { Logger } from '@utils/logger';

/**
 * This is a feature module scoped service.
 *
 * It cannot be used in other modules, only in the home module
 * (Notice the `providedIn: 'root'` is gone)
 *
 * This service is provided in the providers array of home.module.ts
 */

@Injectable()
export class LoginService {
  private logger = new Logger('login.service.ts');

  constructor() {
    this.logger.info('Constructing!');
  }
}
