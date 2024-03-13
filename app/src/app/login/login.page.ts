import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, LoadingController } from '@ionic/angular';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authetication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public formBuilder:FormBuilder,
    private alertController: AlertController, 
    public loadingCtrl: LoadingController, 
    private router:Router, 
    public authService: AuthenticationService,
    private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.animar();
    this.loginForm = this.formBuilder.group({
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
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
  
    if (this.loginForm?.valid) {
      try {
        const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
  
        if (user) {
          loading.dismiss();
          this.router.navigate(['/home']);
        } else {
          loading.dismiss();
          this.presentAlert('Usuario y/o Contraseña incorrectos');
        }
      } catch (error) {
        loading.dismiss();
        console.error('Error al iniciar sesión:', error);
        this.presentAlert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } else {
      loading.dismiss();
      this.presentAlert('Por favor, ingrese un email y una contraseña válidos.');
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
    const animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.centrado'))
      .duration(2500)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.5) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(0) ' },
      ]);
      
    await animation.play();
  }

}
