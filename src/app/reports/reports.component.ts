import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";
import { DeviceSaleObject } from "./../objects/device-saleobject";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: []
})
export class ReportsComponent implements OnInit {
  tmpSalesList: any;
  ShowReport = false;
  tmpDataProfit = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  tmpDataTotalSale = [0,0,0,0,0,0,0,0,0,0,0,0,0];

  constructor(public _sharedService: SharedService) { }

  ngOnInit() {
    this.callGetSales();
  }

  CreateTmpDisplay()
  {
    var lbl = "Data Bitches";
    for ( let i of this.tmpSalesList.Items)
    {
      let newDate = new Date(i.DeviceSaleObject.DateSold);
      //alert(newDate.getMonth());
      this.tmpDataProfit[newDate.getMonth()] = Number(this.tmpDataProfit[newDate.getMonth()]) + Number(i.DeviceSaleObject.Profit);
      this.tmpDataTotalSale[newDate.getMonth()] = Number(this.tmpDataTotalSale[newDate.getMonth()]) + Number(i.DeviceSaleObject.PriceSold);
    }

    this.ConnectToReport();
  }

  getReportData()
  {
    var tmpdata = this._sharedService.GetReport("1").subscribe(val=> alert(val));
    
  }

  callGetSales()
  {
    this._sharedService.getDeviceSales()
    .subscribe(
    lstresult => {          
              this.tmpSalesList = lstresult;   
              this.ShowReport = true;  
              this.CreateTmpDisplay();
    },
    error => {
      alert("error!" + error);      
      console.log(error);
    } 
    );             
  }

  public lineChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Profit'},
    {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Total Sold'},
  ];

  public lineChartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public ConnectToReport():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        switch(i)
        {
          case 0:
            _lineChartData[i].data[j] = this.tmpDataProfit[j];
            break;
          case 1:
            _lineChartData[i].data[j] = this.tmpDataTotalSale[j];
            break;
          default:
            break;
        }
        
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
