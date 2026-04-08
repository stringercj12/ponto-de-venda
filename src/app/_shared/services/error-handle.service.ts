import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandlingService implements ErrorHandler {
  handleError(error: any): void {
    console.error('Ocorreu um erro global:', error);
  }
}
