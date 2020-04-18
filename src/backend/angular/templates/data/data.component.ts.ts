export const DATA_COMPONENT_TS_TEMPLATE = `import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-{{ kebab }}',
  templateUrl: './{{ kebab }}.component.html',
  styleUrls: ['./{{ kebab }}.component.scss']
})
export class {{ pascal }}Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
`