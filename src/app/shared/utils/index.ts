import Swal from 'sweetalert2';

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
}
