import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { TokenService } from "../Token/token.service";

// The output data type is defined here
interface TransactionItem {
  type: any;
  create_date: any;
  account_no: any;
  amount: any;
  terminal_id: any;
  merchant_id: any;
  status_type: any;
  person_id: any;
  first_name: any;
  last_name: any;
  nation_code: any;
  trn_type: any;
  issuer: any;
  acceptor: any;
  create_time_f: any;
  create_date_f: any;
  response_description: any;
  balance: any;
  stan: any;
}

interface TransactionResponse {
  // Receive information as a presentation
  data: TransactionItem[];
  token: any;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  private apiUrl = 'https://gatewayapi.eniac-tech.com/api/v1/transaction_list';
  private tokenKey = 'access_token';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getTransactions(
    fromDate: string,
    toDate: string,
    pageNo: number,
    count: number,
    acceptorTagList:number,
    tagList: number
  ): Observable<TransactionItem[]> {
    return this.tokenService.getToken().pipe(
      tap((data) => {
        this.storeToken(data.token);
      }),
      switchMap(() => {
        const body = {
          from_date: fromDate,
          to_date: toDate,
          acceptor_tag_list: [acceptorTagList],
          tag_list: [tagList],
          page_no: pageNo,
          count: count
        };
          const headers = new HttpHeaders({
          'token': ` ${this.getToken()}`,
        });

        return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
          map((response) => {
            console.log(response);
            return response;
          })
        );
      })
    );
  }


  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }


  private getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }
}
