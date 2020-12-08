import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-pentaho-dashboard',
  templateUrl: './pentaho-dashboard.component.html',
  styleUrls: ['./pentaho-dashboard.component.scss']
})
export class PentahoDashboardComponent implements OnInit, OnChanges {

  @Input() id: string;
  @Input() dashboardPath: string;
  @Input() pentahoParamsName: string[] = [];
  @Input() params: any[] = [];
  @Input() additionalDashboards: string[] = [];
  @Input() setDefaults: boolean;
  @Input() externalHtmlId: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.renderDashboard();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.clear();
      // this.renderDashboard();
    }
  }

  private renderDashboard() {
    let dashboardRender: any;
    /*if (this.additionalDashboards.length > 0) {
      dashboardRender = this.setDashboardPathWithAddDash();
    } else */
    // if (this.params.length > 0) {
    dashboardRender = this.setDashboardPathWithExternalElement();
    // } else {
      // dashboardRender = this.setDashboardPath();
    // }
    const range = document.createRange();
    range.selectNode(document.getElementsByTagName('BODY')[0]);
    const documentFragment = range.createContextualFragment(dashboardRender);
    document.body.appendChild(documentFragment);
  }

  /**
   * Se renderiza dashboads que solo requieren de
   * la dirección y el id del div
   */
  private setDashboardPath() {
    // document.body.removeChild(document.getElementsByTagName('script')[285]);
    return `<script id="script1" type="text/javascript">
    require([
    'dash!/${this.dashboardPath}'],
    function(SampleDash) {
      var dashboardInstance = new SampleDash("${this.id}");
      dashboardInstance.render();
    });
    </script>`;
  }

  private setDashboardPathWithExternalElement() {
    console.log('setDashboardPathWithExternalElement');
    let result = '';
    result = `<script type="text/javascript">
    require([
    'dash!/${this.dashboardPath}'],
    function(SampleDash) {
      // console.log('SampleDash');
      // console.log(SampleDash.toString());
      var dashboardInstance = new SampleDash("${this.id}");
      console.log('dashboardInstance');
      console.log(dashboardInstance.toString());
      dashboardInstance.render();
      ${this.setFireChangeParams()}
    });
    </script>`;
    console.log(result);
    return result;
  }

  private setFireChangeParams() {
    let result = '';
    this.pentahoParamsName.forEach((element, i) => {
      result += `
      var htmlElement${i} = document.getElementById("${this.externalHtmlId[i]}");
      htmlElement${i}.addEventListener("change", function() {
        console.log(this.value);
        dashboardInstance.fireChange("${element}", this.value);
      });
      ${this.setDefault(element, i)}
      `;
      // result += `dashboardInstance.setParameter("${element}", "${this.params[i]}");`;
      // ${this.setDefault(i)};
    });
    return result;
  }

  private setDefault(element, i) {
    if (this.setDefaults) {
      return `dashboardInstance.setParameter("${element}", "${this.params[i]}");`;
    }
  }

  private setDashboardPathWithAddDash() {
    return `<script type="text/javascript">
    require([
    'dash!/${this.dashboardPath}'],
    function(Dashboard) {
      var dashboardInstance = new Dashboard("${this.id}");
      dashboardInstance.render();

      selector.on("customer:fireChange", function (evt) {
        dashboardInstance.fireChange("Petit Auto", evt.line);
      });
    } );
    </script>`;
  }

}
