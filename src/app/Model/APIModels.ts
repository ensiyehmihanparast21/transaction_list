export interface ApiModel {
  create_date : number;
  type : number;
  account_no :number;
  tag : number;
  pan : string;
  amount: number;
  terminal_id: string;
  merchant_id: string;
  stan: number;
  rrn: string;
  balance: number;
  uuid: string;
  response_code: number;
  additional_data: string;
  status: string;
  status_type: string;
  person_id: number;
  first_name: string;
  last_name: string;
  nation_code: string;
  trn_type: string,
  issuer: string,
  acceptor: string,
  acceptor_tag: number,
  response_description: string,
  tracking_number:string,
  create_date_f: string,
  create_time_f: string
}
