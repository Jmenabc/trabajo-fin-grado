import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logMessages: string[] = [];
  private saveTimeout: any;

  constructor() {
    this.scheduleSaveLogs();
  }

  log(message: string) {
    console.log(message);
    this.logMessages.push(message);
  }

  saveLogsToFile() {
    const logData = this.logMessages.join('\n');
    const blob = new Blob([logData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'logs.txt';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberar recursos
    URL.revokeObjectURL(url);
  }

  scheduleSaveLogs() {
    const currentDate = new Date();
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
      999
    );
    const timeUntilEndOfDay = endOfDay.getTime() - currentDate.getTime();

    this.saveTimeout = setTimeout(() => {
      this.saveLogsToFile();
      this.logMessages = [];
      this.scheduleSaveLogs();
    }, timeUntilEndOfDay);
  }
}
