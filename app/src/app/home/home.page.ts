import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authetication.service';
import { SharedService } from '../shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Capacitor } from '@capacitor/core';


import { AlertController } from '@ionic/angular';
import { BarcodeScanner, ScanResult} from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  userFullname: string = '';

  constructor(
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private router: Router,
    private sharedService: SharedService,
    public route: Router,
    public authService: AuthenticationService,
    private animationCtrl: AnimationController
  ) {
    this.user = authService.getProfile();
  }

  ngOnInit() {
    this.animar();
    this.animarInput();
    this.userFullname = this.sharedService.userFullname;
  }

  async logout() {
    this.authService
      .signOut()
      .then(() => {
        this.route.navigate(['/login']);
      })
      .catch((error) => {});
  }

  async scanAndSave() {
    try {
      // Verificar permisos de cámara
      const status = await BarcodeScanner.checkPermission();
  
      if (status.granted) {
        // Permiso concedido, iniciar escáner de QR
        const scanResult: ScanResult = await BarcodeScanner.startScan();
  
        if (scanResult.hasContent) {
          const qrText = scanResult.content;
          console.log('Texto del QR:', qrText);
  
          // Extraer información del texto del QR
          const [seccion, asignatura] = qrText.split('/'); // Suponiendo que el formato del QR es "seccion/asignatura"
  
          // Guardar en Firestore
          const currentDate = new Date().toISOString();
          this.firestore.collection('asistencia').add({
            seccion: seccion,
            asignatura: asignatura,
            fecha: currentDate,
          }).then(() => {
            console.log('Datos guardados en Firestore');
            alert('Datos guardados en Firestore');
          }).catch((error) => {
            console.error('Error al guardar en Firestore:', error);
            alert('Error al guardar en Firestore');
          });
        } else {
          console.log('Escaneo cancelado o error');
          alert('Escaneo cancelado o error');
        }
  
      } else {
        // Permiso no concedido, mostrar mensaje al usuario
        console.log('Permiso de cámara no concedido');
        alert('La aplicación necesita acceso a la cámara para escanear códigos QR. Por favor, concede los permisos.');
  
        // Redirigir al usuario a la configuración de la aplicación para otorgar permisos manualmente
        if (Capacitor.isNative && Capacitor.getPlatform() === 'android') {
          const packageName = 'io.ionic.starter'; // Reemplaza con el nombre de tu paquete de aplicación
          window.open(`intent://app-settings/#Intent;scheme=package;package=${packageName};end`);
        }
      }
    } catch (error) {
      console.error('Error al escanear QR:', error);
      alert('Error al escanear QR. Verifica la consola para más detalles.');
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

  async animar() {
    const animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll('.titulo'))
      .duration(2500)
      .keyframes([
        { offset: 0, transform: 'translateX(-100%)', opacity: '1' },
        { offset: 0.5, transform: 'translateX(0)', opacity: '1' },
        { offset: 1, transform: 'translateX(100%)', opacity: '0.2' },
      ]);

    await animation.play();
  }

  async animarInput() {
    const animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll('.ion-text-center'))
      .duration(2500)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    await animation.play();
  }
}
