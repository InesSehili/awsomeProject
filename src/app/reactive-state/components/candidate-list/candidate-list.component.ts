import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CondidateService} from "../../services/condidate.service";
import {combineLatest, map, Observable, startWith} from "rxjs";
import {ConditateModel} from "../../models/conditate.model";
import {FormBuilder, FormControl} from "@angular/forms";
import {CandidateSearchTypeEnum} from "../../enum/candidate-search-type.enum";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  loading$! : Observable<boolean>;
  candidates$ ! : Observable<ConditateModel[]>;
  searchCtrl! : FormControl;
  searchTypeCtrl! : FormControl;
  searchTypeOption! : {
    value: CandidateSearchTypeEnum,
    label : string
  }[];
  constructor( private candidatesService : CondidateService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidatesService.getCondidateFromServer();
  }

  private initObservables() {
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchTypeEnum> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
    this.loading$ = this.candidatesService.loading$;
    this.candidates$ = combineLatest([
        search$,
        searchType$,
        this.candidatesService.candidates$
      ]
    ).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string))
      )
    );
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchTypeEnum.LASTNAME);
    this.searchTypeOption = [
      { value: CandidateSearchTypeEnum.LASTNAME, label: 'Nom' },
      { value: CandidateSearchTypeEnum.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchTypeEnum.COMPANY, label: 'Entreprise' }
    ];
  }
}
