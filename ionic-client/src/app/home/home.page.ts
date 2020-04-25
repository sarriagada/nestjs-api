import { Component, OnInit } from '@angular/core';

import { AlertController, ToastController, LoadingController } from '@ionic/angular';

import { Mission } from '../models/mission';
import { MissionsService } from '../services/missions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  missions: Mission[] = [];

  constructor(
    private missionsService: MissionsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
    });
    await loading.present();
    this.missionsService.getAllMissions()
    .subscribe(async (missions) => {
      this.missions = missions;
      await loading.dismiss();
    });
  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'New Mission',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'talk more about the mission'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Go',
          handler: (data) => {
            this.createMission(data.title);
          }
        }
      ]
    });
    await alert.present();
  }

  createMission(title: string) {
    const mission = {
      id: null,
      title,
      active: true,
      reward: 1,
    };
    this.missionsService.createMission(mission)
    .subscribe((newMission) => {
      this.missions.unshift(newMission);
      this.presentToast('Your mission was created successfuly');
    });
  }

  deleteMission(id: string, index: number) {
    this.missionsService.deleteMission(id)
    .subscribe(() => {
      this.missions.splice(index, 1);
      this.presentToast('Your mission was deleted successfuly');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }
}