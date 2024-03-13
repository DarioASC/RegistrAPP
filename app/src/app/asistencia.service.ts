import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './authetication.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) { }

  async registerAttendance() {
    const userEmail = this.authService.getEmail();
    const idAsistencia = this.firestore.createId();

    const attendanceData = {
      id_asistencia: idAsistencia,
      asistio: true, 
      email: userEmail,
    };

    return this.firestore.collection('Asistencia').doc(idAsistencia).set(attendanceData);
  }

  async registerAttendanceWithQR(qrData: any) {
    const userEmail = this.authService.getEmail();
    const idAsistencia = this.firestore.createId();

    const attendanceData = {
      id_asistencia: idAsistencia,
      asistio: true, 
      email: userEmail,
      seccion: qrData.seccion,
      carrera: qrData.carrera,
      fecha: qrData.fecha,
    };

    return this.firestore.collection('Asistencia').doc(idAsistencia).set(attendanceData);
  }
}
