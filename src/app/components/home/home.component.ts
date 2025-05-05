import {Component, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import { OllamaService } from '../../services/ollama.service';
import { firstValueFrom } from 'rxjs';
import { OllamaModel } from '../../models/ollama.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {OllamaResponseModel} from '../../models/ollama-response.model';
import {NanoToSecondsPipe} from '../../pipes/nano-to-seconds.pipe';
import {DateTimePipe} from '../../pipes/datetime.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ButtonModule, CardModule, SelectModule, FormsModule, DividerModule, TextareaModule, FloatLabelModule, Message, NanoToSecondsPipe, DateTimePipe],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent implements OnInit {
  ollamaStatusText: string ="";
  ollamaStatus: boolean = false;
  modelList: OllamaModel[] = [];
  selectedModel: OllamaModel | undefined;
  userPrompt: string = "";
  aiResponse: OllamaResponseModel | undefined;
  constructor(private ollamaService: OllamaService) {

  }

   async ngOnInit(){
     let status = await this.isOllamaRunning();
     this.ollamaStatus = status;
     if(status){
      this.ollamaStatusText = "Ollama is running...";
      await this.listModels();
     }else{
      this.ollamaStatusText = "Ollama cannot start!";
     }
  }


  async isOllamaRunning(): Promise<boolean> {
      try{
        return await firstValueFrom(this.ollamaService.isOllamaRunning());
      }
      catch (error) {
        console.log(error, "error");
        return false;
      }

  }

  async listModels(): Promise<void> {
    try{
      var response = await firstValueFrom(this.ollamaService.listModels());
      this.modelList = response.models;

    }
    catch (error) {
      console.log(error, "listModels");
    }
  }

  async generateResponse(): Promise<void>{
    try{
      if(this.selectedModel != undefined && this.userPrompt != ""){
        let result = await firstValueFrom(this.ollamaService.generateResponse(this.selectedModel.name,this.userPrompt));
        console.log(result);
        this.aiResponse = result;
      }else{
        alert("Error!");
      }
    }
    catch (error) {
      console.log(error, "listModels");
    }
  }

}


