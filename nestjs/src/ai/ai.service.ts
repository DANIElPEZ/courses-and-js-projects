import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class AiService {
     private googleGenAI: GoogleGenAI;

     constructor(private configService: ConfigService) {
          const apiKey = this.configService.get('GEMINI_API_KEY');
          if (!apiKey) throw new Error('Gemini API key is not set');
          this.googleGenAI = new GoogleGenAI({ apiKey });
     }

     async generateSummary(content: string) {
          const response = await this.googleGenAI.models.generateContent({
               model: 'gemini-2.5-flash',
               contents: [
                    {
                         role: 'user',
                         parts: [{ text: 'You are a helpful assistant that generates summaries for blog posts. You should generate a summary with 200 characters or less.' }]
                    },
                    {
                         role: 'model',
                         parts: [{ text: content }]
                    }
               ]
          });
          return response.text;
     }

     async generateImage(text: string) {
          try {
               const response = await this.googleGenAI.models.generateImages({
                    model: 'gemini-2.5-flash',
                    prompt: `Generate an image for a blog post about ${text}`,
                    config: {
                         numberOfImages: 1,
                         aspectRatio:'1:1'
                    }
               });

               if(response?.generatedImages && response.generatedImages.length >0){
                    const image = response.generatedImages[0]?.image?.imageBytes;
                    if(image) return image;
               }
               return null;
          } catch (e) {
               console.log(e);
               return null;
          }
     }
}
