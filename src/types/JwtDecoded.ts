export default interface JwtDecoded {
  id: number;
  userId: string;
  iat: number;
  exp: number;
}
