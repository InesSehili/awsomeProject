import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ConditateModel} from "../models/conditate.model";

@Injectable()
export class CondidateService {
  constructor( http : HttpClient) {
  }
  private _loading$ = new BehaviorSubject<boolean>(false);
  /* – qui émettra  true  ou  false  selon qu'un chargement est en cours ou non ;*/
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  } // pour que les components n'appelle pas la methode next()

  private _candidates$ = new BehaviorSubject<ConditateModel[]>([]);
  //– qui émettra des tableaux de  Candidate .
  get candidates$(): Observable<ConditateModel[]> {
    return this._candidates$.asObservable();
  }
  //ici on appele cete merthode comme etant une variable
  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }/* Appeler  next  sur l'un des BehaviorSubjects du service, c'est s'assurer que tous
  les components qui sont souscrits à leurs Observables recevront cette nouvelle donnée.*/

}
