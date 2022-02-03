import { EmailModel } from './../models/email-mod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile: Profile={};
  private emailModel: EmailModel ={};

  constructor(private http: HttpClient) { }

  setData(profile: Profile){
    this.profile = profile;
  }
  setEmailMod(email: string){
    this.emailModel.email = email;
  }
getEmailMod(){
  let temp2 = this.emailModel;
  this.emailModel={};
  return temp2;
}
  getProfile(){
    return this.profile;
  }

  setImhg(img : any){
    this.profile.imgurl = img;
  }

  getData(){
    let temp = this.profile;
    this.profile={};
    return temp;
  }

  registerProfile(profile: Profile): Observable<any> {
    return this.http.post(environment.url+'/profile/register', profile,
    {observe: 'response'});
  }

  getProfileByPid(pid: number): Observable<Profile>{
    return this.http.get(`${environment.url}/profile/${pid}`)
  }

  updateProfile(profile: Profile): Observable<any>{
    let token = sessionStorage.getItem("Authorization");
    if(token){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token });
      let options = { headers: headers };
      return this.http.put(`${environment.url}/profile`, profile, options);
    } else {
      return this.http.put(`${environment.url}/profile`, profile);
   }
  }

  login(username: string, password: string): Observable<HttpResponse<Profile>>{
    return this.http.post<Profile>(environment.url+'/profile/login', `username=${username}&password=${password}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  getProfileByToken(): Observable<HttpResponse<Profile>> {
    var token = sessionStorage.getItem("Authorization");
    return this.http.post<Profile>(environment.url+'/profile/token', `token=${token}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  getProfileByUsername(username: string): Observable<Profile>{
    return this.http.get<Profile>(`${environment.url}/profile/search${username}`)
  }

  verifyEmail(emailModel:EmailModel): Observable<any>{
    this.generateEmailUrl(emailModel);
    return this.http.post(environment.url+'/verify/email', emailModel, {observe: 'response'})
  }

  generateEmailUrl(emailModel:EmailModel): any {
    let tk = sessionStorage.getItem("Authorization");
    let randCode= '';
    if(tk){
      for(var i =0; i < 15; i++){
     randCode+= tk.charAt(Math.floor(Math.random() * tk.length))
    }
    localStorage.setItem('randomCode',randCode);
    emailModel.url = 'http://localhost:4200/verify/email?randomCode='+randCode;
    }
  }
}
