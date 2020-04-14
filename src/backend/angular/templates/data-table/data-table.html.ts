export const DATA_TABLE_HTML_TEMPLATE = `  <table mat-table [dataSource]="dataSource" class="full-width-table">
  {{#properties}}
  <ng-container matColumnDef="{{camel}}">
    <th mat-header-cell *matHeaderCellDef>{{name}}</th>
    {{=<% %>=}}
    <td mat-cell *matCellDef="let row">{{row.<%camel%>}}</td>
    <%={{ }}=%>
  </ng-container>
  {{/properties}}
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>`