// favourite.dto.ts
import { IsInt, Min } from 'class-validator';

/**
 * DTO for adding a wine to user's favourites.
 *
 * Used for validating incoming requests.
 * Ensures that `wineId` is a valid positive integer.
 */
export class AddFavouriteDto {
  @IsInt()
  @Min(1)
  wineId!: number;
}

/**
 * DTO for favourite wine response.
 *
 * Defines the shape of favourite data returned to the client.
 * Contains only safe, client-facing fields.
 */
export class FavouriteDto {
  wineId!: number;
  name!: string;
  vintage?: number;
  type?: string;
  color?: string;
  price?: string;
  photoUrl?: string;
}