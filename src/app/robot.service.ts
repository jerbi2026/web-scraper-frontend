import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { gemini } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class RobotService {
  genAI = new GoogleGenerativeAI(gemini.API_KEY);


  async  get_response(data : string) : Promise<string>{
    
  
   
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    let prompt = 'voici un  data sous forme json et je veux seulement une analyse sur ce data en mentionnant si necessaire des statistiques. et voici le data :\n'+data;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
  }
  
  

  

  
}
