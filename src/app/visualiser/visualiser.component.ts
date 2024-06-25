import { RobotService } from './../robot.service';
import { Component } from '@angular/core';
import { ExcelService } from '../excel.service';
declare var window: any;

@Component({
  selector: 'app-visualiser',
  templateUrl: './visualiser.component.html',
  styleUrls: ['./visualiser.component.css']
})
export class VisualiserComponent {
  isLoading = false;
  
  message='';

  sheetsData: { [key: string]: any[] } = {};

  constructor(private excelService : ExcelService, private RobotService : RobotService){}
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelService.readExcelFile(file).then((data) => {
        this.sheetsData = data;
        
        
        
      }).catch((error) => {
        console.error('Error reading excel file:', error);
      });
    }
  }

  DownloadJson() {
    let json_output = this.excelService.convert_excel_to_json(this.sheetsData)[0].data;
    const jsonString = JSON.stringify(json_output, null, 2); 
    const blob = new Blob([jsonString], { type: 'application/json' }); 
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_data.json'; 
    a.click();
    window.URL.revokeObjectURL(url);
  }


  analyser_data(){
    this.isLoading = true;
    let json_data = this.excelService.convert_excel_to_json(this.sheetsData)[0].data;
    const jsonString = JSON.stringify(json_data, null, 2); 

    this.RobotService.get_response(jsonString).then(
      (data:any)=>{
        this.message = data;
        this.message = this.message.replaceAll('**','✅')
        this.isLoading = false;
        this.open_modal_message()
      },
      (error)=>{
        this.message =error;
        this.isLoading = false;
        this.open_modal_message()
      }
      
    )

  }


  open_modal_message(){
    const modal = new window.bootstrap.Modal(document.getElementById('messagemodal'));
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
            this.open_modal_message()
          },
          (error)=>{
            this.message =error;
            this.isLoading = false;
            this.open_modal_message()
          }
          
        )

        

       
        
      }).catch((error) => {
        console.error('Error reading excel file:', error);
      });
    }
  }
  
  

}
