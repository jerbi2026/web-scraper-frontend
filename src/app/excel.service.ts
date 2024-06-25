import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public readExcelFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array((event.target as any).result);
        const workbook = XLSX.read(data, { type: 'array', codepage: 65001 });

        const sheetsData: { [key: string]: any[] } = {};
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          sheetsData[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        });

        resolve(sheetsData);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  public convert_excel_to_json(sheetsData: { [key: string]: any[] }): any[] {
    let json_data: any[] = [];
  
    for (let sheetName in sheetsData) {
      let data = sheetsData[sheetName];
  
      if (!Array.isArray(data) || data.length === 0) {
        continue; 
      }
  
      let headers = data[0];
      let sheetJsonData: any[] = [];
  
      for (let i = 1; i < data.length; i++) {
        let row = data[i];
  
        if (!Array.isArray(row)) {
          continue; 
        }
  
        let json_row: any = {};
  
        for (let j = 0; j < headers.length && j < row.length; j++) {
          json_row[headers[j]] = row[j];
        }
  
        sheetJsonData.push(json_row);
      }
  
      json_data.push({ sheetName, data: sheetJsonData });
    }
  
    return json_data;
  }
  
}
