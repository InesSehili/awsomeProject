import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, delay, filter, map, Observable, switchMap, take, tap} from "rxjs";
import {ConditateModel} from "../models/conditate.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class CondidateService {
  constructor( private http : HttpClient) {
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
  private lastCandidatesLoad = 0;

  getCondidateFromServer(){
    if (Date.now() - this.lastCandidatesLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<ConditateModel[]>(`${environment.apiUrl}/candidates`).pipe(
      delay(500),
      tap(candidates => {
        this.lastCandidatesLoad = Date.now();
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }
  getCondidateById(id : number) : Observable<ConditateModel>{
    if(!this.lastCandidatesLoad)
    {this.getCondidateFromServer();}
    return this.candidates$.pipe(
      map(candidate => candidate.filter(candidate => candidate.id === id)[0])
    );


  }
  refuseCandidate(id: number): void {
    this.setLoadingStatus(true);
    this.http.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
      delay(200),
      switchMap(() => this.candidates$),
      take(1),
      map(candidates => candidates.filter(candidate => candidate.id !== id)),
      tap(candidates => {
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }
  hireCandidate(id: number): void {
    this.candidates$.pipe(
      take(1),
      map(candidates => candidates
        .map(candidate => candidate.id === id ?
          { ...candidate, company: 'Snapface Ltd' } :
          candidate
        )
      ),
      tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
      switchMap(updatedCandidates =>
        this.http.patch(`${environment.apiUrl}/candidates/${id}`,
          updatedCandidates.find(candidate => candidate.id === id))
      )
    ).subscribe();
  }
}
