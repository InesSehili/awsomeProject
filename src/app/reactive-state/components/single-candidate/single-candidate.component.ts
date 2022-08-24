import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CondidateService} from "../../services/condidate.service";
import {map, Observable, switchMap, take, tap} from "rxjs";
import {ConditateModel} from "../../models/conditate.model";
import {ActivatedRoute,  Router} from "@angular/router";


@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit {
  candidate$ ! : Observable<ConditateModel>;
  loading$ ! : Observable<boolean>;

  constructor(private serviceCondidate: CondidateService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.initObservable();

  }

  private initObservable() {

    this.loading$ = this.serviceCondidate.loading$;
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.serviceCondidate.getCondidateById(+params['id']))
    );

  }

  onHire() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.serviceCondidate.hireCandidate(candidate.id);
        this.onGoBack();
      })
    ).subscribe();

  }

  onRefuse() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.serviceCondidate.refuseCandidate(candidate.id);
        this.onGoBack();
      })
    ).subscribe();

  }

  onGoBack() {
    this.router.navigateByUrl('reactive-state/conditates');
  }
}
