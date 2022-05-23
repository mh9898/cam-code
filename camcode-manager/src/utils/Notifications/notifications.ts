import { showNotification } from '@mantine/notifications';

export class notifications {
  static error(message: string) {
    showNotification({
      title: 'Error',
      message: message,
      color: 'red',
    });
  }
  static success(message: string) {
    showNotification({
      title: 'Success',
      message: message,
      color: 'green',
    });
  }
}
