import { Injectable } from '@nestjs/common';
import { Client as GoogleMapsClient, Language, PlaceInputType } from "@googlemaps/google-maps-services-js";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
    constructor(private googleMapsClient: GoogleMapsClient, private configService:ConfigService) { }

    async findPlaces(text: string) {
        console.log('ke2y', this.configService.get<string>('GOOGLE_MAPS_API_KEY'))
        const { data } = await this.googleMapsClient.findPlaceFromText({
            params: {
                input: text,
                inputtype: PlaceInputType.textQuery,
                language: Language.pt_BR,
                fields: ['formatted_address', 'geometry', 'name', 'place_id'],
                key: this.configService.get<string>('GOOGLE_MAPS_API_KEY')
            }
        });
        return data;



    }
}
