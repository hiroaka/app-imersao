import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';

@Injectable()
export class RoutesService {

  constructor(private prismaservice: PrismaService,
     private directionService: DirectionsService) {
    
  }
  async create(createRouteDto: CreateRouteDto) {
    const { available_travel_modes, geocoded_waypoints, routes, request } = await this.directionService.getDirections(
      createRouteDto.source_id, 
      createRouteDto.destination_id
    )

    const legs = routes[0].legs[0]

    return this.prismaservice.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: legs.start_address ,
          location: { lat: legs.start_location.lat, lng: legs.start_location.lng },
        },
        destination: {
          name: '',
          location: { lat: legs.start_location.lat, lng: legs.start_location.lng},
        },
        directions: JSON.parse(JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
          request
        })),
        duration: legs.duration.value,
        distance: legs.distance.value,
      }
    })

  }

  findAll() {
    return this.prismaservice.route.findMany();
  }

  findOne(id: string) {
    return this.prismaservice.route.findUniqueOrThrow({ 
      where: { id: id } 
    });
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}