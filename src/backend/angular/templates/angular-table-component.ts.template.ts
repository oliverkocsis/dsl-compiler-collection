export const ANGULAR_TABLE_TS_TEMPLATE = `import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { {{pascal}} } from '../{{kebab}}';
import { {{pascal}}Service } from '../{{kebab}}.service';

@Component({
  selector: 'app-{{kebab}}-table',
  templateUrl: './{{kebab}}-table.component.html',
  styleUrls: ['./{{kebab}}-table.component.scss']
})
export class {{pascal}}TableComponent implements OnInit {
  displayedColumns = [
    {{#properties}}
    '{{camel}}', 
    {{/properties}}
  ];
  dataSource: Observable<{{pascal}}[]>;

  constructor(private service: {{pascal}}Service) { }

  ngOnInit() {
    this.dataSource = this.service.observable();
  }

}
`