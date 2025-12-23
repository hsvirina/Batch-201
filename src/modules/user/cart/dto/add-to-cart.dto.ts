import { IsInt, Min } from 'class-validator';

/**
 * DTO for adding/updating an item in the user's cart
 * 
 * Responsibilities:
 * - Validate incoming payload
 * - Ensure quantity is a positive integer
 * - Prevent invalid or malicious input from reaching service layer
 */
export class AddToCartDto {
  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' }) // Clear error message for client
  quantity!: number;
}

/**
 * DTO for cart item response
 * 
 * Responsibilities:
 * - Define safe fields to expose to the client
 * - Prevent leaking database internals (like userId, cartItemId)
 * - Convert numeric fields to string if needed for consistent client formatting (price)
 */
export class CartItemResponseDto {
  wineId!: number;
  name!: string;
  quantity!: number;

  // Optional wine metadata
  vintage?: number;
  type?: string;
  color?: string;
  price?: string;      // Use string for precision and avoid float issues on client
  photoUrl?: string;

  /**
   * Could add constructor for mapping from service entity to DTO:
   *
   * constructor(partial: Partial<CartItemResponseDto>) {
   *   Object.assign(this, partial);
   * }
   */
}