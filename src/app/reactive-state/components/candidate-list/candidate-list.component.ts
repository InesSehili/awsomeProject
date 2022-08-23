import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CondidateService} from "../../services/condidate.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  loading$! : Observable<boolean>;
  constructor( private condidateService : CondidateService) { }

  ngOnInit(): void {
    this.loading$ = this.condidateService.loading$;
  }

}
