import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authetication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
email:any
  constructor(
    private alertController: AlertController,
    public route:Router,
    public authService: AuthenticationService,) { }

  ngOnInit() {
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
    return emailPattern.test(email);
  }
  
  async resetPassword() {
    if (!this.isValidEmail(this.email)) {
      // Muestra una alerta si el correo electrónico no sigue el patrón adecuado
      this.presentAlert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
  
    try {
      await this.authService.resetPassword(this.email);
      // Muestra una alerta indicando que se ha enviado un correo
      this.presentAlert('Un email será enviado a su dirección de correo electrónico.');
      this.route.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  
}
