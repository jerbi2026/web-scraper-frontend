import { ExcelService } from '../excel.service';
import { RobotService } from '../robot.service';
import { ScrapService } from './../scrap.service';
import { Component } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private excelService : ExcelService, private RobotService : RobotService,private ScrapService : ScrapService){}
  isLoading = false;
  p=1;
  message='';
  imdb_scrap ='';
  finance_scrap ='';
  url_amazon='';

 
  genre_imdb = false;
  url_imdb=false;
  stocks = false;
  forex = false;
  crypto = false;

  key_word_scrap={
    key_word:'',
    precision:0
  }
  type_site ='';

  site_scrap={
    url:'',
    product:''
  }

  fb_scrap ='https://www.facebook.com/marketplace/category/search/?query=';
  produit_fb='';


  trading_view_stocks_url = 'https://www.tradingview.com/markets/';
  finance_country ='';
  finance_type_extract = '';

  crypto_extract = '';
  forex_extract = '';



  keywords_product :any = []


  type_scrap_imdb(){
    if(this.imdb_scrap=='5'){
      this.genre_imdb = true;
      this.url_imdb = false;
    }
    else if(this.imdb_scrap=='6'){
      this.genre_imdb = false;
      this.url_imdb = true;
    }
    else{
      this.genre_imdb = false;
      this.url_imdb = false;
    }
  }

  scrap_finance(){
    if(this.finance_scrap=='1'){
      this.stocks = true;
      this.forex = false;
      this.crypto = false;
    }
    else if(this.finance_scrap=='3'){
      this.stocks = false;
      this.forex = true;
      this.crypto = false;
    }
    else if(this.finance_scrap=='2'){
      this.stocks = false;
      this.forex = false;
      this.crypto = true;
    }
    else{
      this.stocks = false;
      this.forex = false;
      this.crypto = false;
      
    }

  }


  get_finance_data(){
    if(this.stocks==true && this.forex == false && this.crypto == false){
      let url_to_extract = this.trading_view_stocks_url+this.finance_country+'/'+this.finance_type_extract+'/'
      this.isLoading = true;
      this.ScrapService.scrapeTradingview(url_to_extract).subscribe(
        (data:any)=>{
          this.message = data.message+'✅'
          this.isLoading = false;
          this.finance_country='';
          this.finance_type_extract='';
          this.open_modal_message()
        },
        (error)=>{
          this.message =  error.message+'⛔'
          this.isLoading = false;
          this.finance_type_extract='';
          this.finance_country=''
          this.open_modal_message()
        }
        
      )
    }
    else if(this.stocks==false && this.forex == true && this.crypto == false){
      this.isLoading = true;
      this.ScrapService.scrapeTradingview(this.forex_extract).subscribe(
        (data:any)=>{
          this.message = data.message+'✅'
          this.isLoading = false;
          this.forex_extract='';
          this.open_modal_message()
        },
        (error)=>{
         
          this.message =  error.message+'⛔'
          this.isLoading = false;
          this.forex_extract='';
          this.open_modal_message()
        }
        
      )


    }
    else if(this.stocks==false && this.forex == false && this.crypto == true){
      this.isLoading = true;
      this.ScrapService.scrapeTradingview(this.crypto_extract).subscribe(
        (data:any)=>{
          this.message = data.message+'✅'
          this.isLoading = false;
          this.crypto_extract='';
          this.open_modal_message()
        },
        (error)=>{
          console.log(error)
          this.message = error.message+'⛔'
          this.isLoading = false;
          this.crypto_extract='';
          this.open_modal_message()
        }
        
      )

    }
    this.stocks = true;
    this.forex = false;
    this.crypto = false;

  }

  scrap_imdb(){
    this.isLoading=true
    this.ScrapService.scrapeImdb(this.imdb_scrap).subscribe(
      (data:any)=>{
        this.message = data.message+'✅'
        this.isLoading = false;
        this.imdb_scrap='';
        this.genre_imdb = false;
        this.url_imdb=false;
        this.open_modal_message()
      },
      (error)=>{
        console.log(error)
        this.message =  error.message+'⛔'
        this.isLoading = false;
        this.genre_imdb = false;
        this.url_imdb=false;
        this.imdb_scrap=''
        this.open_modal_message()
      }
      
    )
  }

  scrap_amazon(){
    this.isLoading = true;
    if(this.url_amazon!=''){
      this.ScrapService.scrapeDynamic(this.url_amazon,'produits').subscribe(
        (data:any)=>{
          this.message = data.message+'✅'
          this.isLoading = false;
          this.url_amazon='';
          this.open_modal_message()
        },
        (error)=>{
          console.log(error)
          this.message =  error.message+'⛔'
          this.isLoading = false;
          this.url_amazon=''
          this.open_modal_message()
        }
        
      )
    }
  }

  scrap_facebook(){
    this.fb_scrap = 'https://www.facebook.com/marketplace/category/search/?query=';
    this.fb_scrap+=this.produit_fb
    this.isLoading = true;
    this.ScrapService.scrapeDynamic(this.fb_scrap,'produits').subscribe(
      (data:any)=>{
        this.message = data.message+'✅'
        this.isLoading = false;
        this.produit_fb='';
        this.open_modal_message()
      },
      (error)=>{
        this.message =  error.message+'⛔'
        this.isLoading = false;
        this.produit_fb=''
        this.open_modal_message()
      }
      
    )
  }

  scrap_key_word(){
   if(  this.key_word_scrap.key_word!='' && this.key_word_scrap.precision<3 && this.key_word_scrap.precision>-1){
    this.isLoading = true;
    this.ScrapService.scrapeKeyword(this.key_word_scrap.key_word,this.key_word_scrap.precision).subscribe(
      (data:any)=>{
        this.message = data.analysis
        this.keywords_product = data.products
        this.isLoading = false;
        this.open_keyword_modal()
      },
      (error)=>{
        this.message =  error.message+'⛔'
        this.isLoading = false;
        this.key_word_scrap.key_word='';
        this.key_word_scrap.precision=0;
        this.open_modal_message()
      }
      
    )
   }
  }


  scrap_sites(){
    this.isLoading = true;
    if(this.type_site=='1'){
      this.ScrapService.scrapeDynamic(this.site_scrap.url,this.site_scrap.product).subscribe(
        (data:any)=>{
          this.message = data.message+'✅'
          this.isLoading = false;
          this.site_scrap.url='';
          this.site_scrap.product='';
          this.open_modal_message()
        },
        (error)=>{
          this.message =  error.message+'⛔'
          this.isLoading = false;
          this.site_scrap.url='';
          this.site_scrap.product='';
          this.open_modal_message()
        }
        
      )

    }
    else if(this.type_site=='2'){
      this.ScrapService.scrapeSimple(this.site_scrap.url,this.site_scrap.product).subscribe(
        (data:any)=>{
          this.message = data.message+'✅'
          this.isLoading = false;
          this.site_scrap.url='';
          this.site_scrap.product='';
          this.open_modal_message()
        },
        (error)=>{
          this.message =  error.message+'⛔'
          this.isLoading = false;
          this.site_scrap.url='';
          this.site_scrap.product='';
          this.open_modal_message()
        }
        
      )
      
    }
    
  }

  downloadFile() {
    this.ScrapService.downloadFile().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'extracted_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading file:', error);
    });
  }

  open_modal_message(){
    const modal = new window.bootstrap.Modal(document.getElementById('messagemodal'));
    modal.show();
  }

  
  open_keyword_modal(){
    const modal = new window.bootstrap.Modal(document.getElementById('keyword_modal'));
    modal.show();
  }

  scrapeAndDownload() {
    const textContent = this.keywords_product.map((product: { title: any; link: any; }) => `${product.title}: ${product.link}`).join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.key_word_scrap.key_word+'.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    this.key_word_scrap.key_word='';
    this.key_word_scrap.precision=0;
  }

  open_modal_ai(){
    const modal = new window.bootstrap.Modal(document.getElementById('aimodal'));
    modal.show();
  }

  get_data_ai(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;
      let   Data_ai: { [key: string]: any[] } = {};
      this.excelService.readExcelFile(file).then((data) => {
        Data_ai = data;
        let json_output = this.excelService.convert_excel_to_json(Data_ai)[0].data;
        const jsonString = JSON.stringify(json_output, null, 2); 
        this.RobotService.get_response(jsonString).then(
          (data:any)=>{
            this.message = data;
            this.message = this.message.replaceAll('**','✅')
            this.isLoading = false;
            this.open_modal_ai()
          },
          (error)=>{
            this.message =error;
            this.isLoading = false;
            this.open_modal_ai()
          }
          
        )

        

       
        
      }).catch((error) => {
        console.error('Error reading excel file:', error);
      });
    }
  }


  

}
