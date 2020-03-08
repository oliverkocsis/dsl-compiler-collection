export const COMPONENT_CLASS = `import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-{{kebab}}',
  templateUrl: './{{kebab}}.component.html',
  styleUrls: ['./{{kebab}}.component.css']
})
export class {{camel}}Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
`

export const COMPONENT_HTML = `<p>my-domain works!</p>
`