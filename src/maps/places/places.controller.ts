import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {

constructor(private readonly placeService: PlacesService) {}

    @Get()
    findPlaces(@Query('text') text: string){
        return this.placeService.findPlaces(text);

    }
}
