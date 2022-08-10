import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concatMap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = this.userService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl('', Validators.required),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl('')
  })

  constructor(private authenticationService: AuthenticationService, private imageUploadService: ImageUploadService, private toast: HotToastService, private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({ ...user })
    })
  }

  uploadImage(event: any, user: ProfileUser) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe({
        success: 'Foto alterada com sucesso',
        loading: "Carregando imagem",
        error: "ERROR: Não foi possivel alterar sua foto"
      }), concatMap((photoURL) => this.userService.updateUser({ uid: user.uid, photoURL }))).subscribe()
  }

  saveProfile() {
    let profileData = this.profileForm.value
    this.userService.updateUser(profileData).pipe(
      this.toast.observe({
        success: 'Dados salvos com sucesso',
        loading: "Salvando",
        error: "ERROR: Não foi possivel salvar seus dados"
      })).subscribe()
  }
}
