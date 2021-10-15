import { MediaRelationDto } from './media-relation.dto';

export class AreaDto {
  title: string;
  description?: string;
  type = 'Polygon';
  coordinates: number[][][];
  medias: MediaRelationDto[];
}
