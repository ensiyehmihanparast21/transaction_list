import { AfterViewInit,Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionListService } from 'src/app/Servises/TransactionList/transaction-list.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator  ;
  transaction_list: any =[] ;
  displayedColumns:string[]=['account_no','create_date','amount','terminal_id','merchant_id','status_type','person_id','first_name','last_name','nation_code','trn_type','issuer','acceptor','create_time_f','create_date_f','response_description','balance','stan']
  dataSource= new MatTableDataSource<any>()



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  from_date = new FormControl();
  to_date = new FormControl();
  page_no = new FormControl();
  count = new FormControl();
  acceptor_tag_list = new FormControl();
  tag_list = new FormControl();
  isChecking = false;
  sumcount:any;
  sumbalance:any;
  sumamount:any;

  constructor(private TransactionListService: TransactionListService,private cdr: ChangeDetectorRef) { }

  validateDateRange() {
    const from_date = this.from_date.value;
    const to_date = this.to_date.value;
    const page_no = this.page_no.value;
    const count = this.count.value;
    const acceptor_tag_list = this.acceptor_tag_list.value;
    const tag_list = this.tag_list.value;
    console.log('تاریخ از:', from_date);
    console.log('تاریخ تا:', to_date);
    console.log('صفحات:', page_no);
    console.log('مقدار:', count);
    console.log('پذیرنده:',acceptor_tag_list);
    console.log('تگ:', tag_list);
    this.isChecking = true; // تغییر مقدار isChecking به true
    this.TransactionListService.getTransactions(from_date,to_date,+page_no,+count,+acceptor_tag_list,+tag_list)
      .subscribe(
        (response: any) => {
          // console.log('Transaction data:', response);
          this.transaction_list =response;
          this.dataSource = new MatTableDataSource(response.transaction_list);
          this.dataSource.paginator = this.paginator;
          this.cdr.detectChanges();
          console.log('ds', this.dataSource.data);
          console.log( 'trans',this.transaction_list);
          // محاسبه سرجمع مبلغ و موجودی
          this.sumcount = this.transaction_list.transaction_list.length;
          this.sumbalance = this.transaction_list.transaction_list.reduce((acc: any, trn: { balance: any; }) => acc + trn.balance, 0);
          this.sumamount = this.transaction_list.transaction_list.reduce((acc: any, trn: { amount: any; }) => acc + trn.amount, 0);

          this.isChecking = true; // تغییر مقدار isChecking به false
        },
        (error: any) => {
          console.error('خطا در بررسی ریزتراکنش ها: ', error);
          this.isChecking = false; // تغییر مقدار isChecking به false (در صورت بروز خطا نیز)
        }
      );
  }



}



