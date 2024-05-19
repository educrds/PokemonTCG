import Swal from 'sweetalert2';
import { Pack } from '../../core/interfaces/Pack';

export class Util {
  static showAlert(message: string) {
    Swal.fire({
      position: 'top-end',
      timer: 2000,
      width: '450px',
      timerProgressBar: true,
      toast: true,
      showConfirmButton: false,
      html: message,
    });
  }

  static getCardsFromLocalStorage(): Pack[] {
    const existingCards = localStorage.getItem('cards');
    let cardsArray: Pack[] = existingCards ? JSON.parse(existingCards) : [];
    return cardsArray;
  }
}
