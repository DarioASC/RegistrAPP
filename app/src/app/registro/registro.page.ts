import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, LoadingController } from '@ionic/angular';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authetication.service';
import { SharedService } from '../shared.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  regForm!: FormGroup;
  
  constructor(
    private sharedService: SharedService,
    private alertController: AlertController,
    public formBuilder:FormBuilder, 
    public loadingCtrl: LoadingController, 
    public router:Router, 
    public authService: AuthenticationService,
    private animationCtrl: AnimationController) { }
  
  ngOnInit() {
    this.animar();
    this.regForm = this.formBuilder.group({
      fullname :['', [Validators.required]],
      email :['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]]
    })
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
  
    if (this.regForm?.valid) {
      try {
        const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password);
  
        if (user) {
          // Registro exitoso: establece el valor del fullname en el servicio.
          this.sharedService.userFullname = this.regForm.value.fullname;
          console.log('Nombre registrado:', this.regForm.value.fullname);
          loading.dismiss();
          this.presentAlert('Usuario Creado', '¡El usuario ha sido creado exitosamente!');
          this.router.navigate(['/login']);
        } else {
          console.log('Error al registrar usuario');
          loading.dismiss();
          this.presentAlert('Error al registrar usuario', 'Por favor, inténtelo de nuevo.');
        }
      } catch (error) {
        console.log(error);
        loading.dismiss();
        this.presentAlert('Error al registrar usuario', 'Por favor, inténtelo de nuevo.');
      }
    } else {
      loading.dismiss();
      this.presentAlert('Error en el formulario', 'Por favor, complete correctamente el formulario.');
    }
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async animar() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.a'))
      .duration(2500)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.5)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);
      
    await animation.play();

  }
}
