/*export interface Town {
  id?: number,
  name: string,
  latitude: number,
  longitude: number,
  elevation?: number,
  feature_code?: string,
  country_code?: string,
  admin1_id?: number,
  admin2_id?: number,
  admin3_id?: number,
  admin4_id?: number,
  timezone?: string,
  population?: number,
  postcodes?: string[],
  country_id?: number,
  country?: string,
  admin1?: string,
  admin2?: string,
  admin3?: string,
  admin4?: string
}*/

export interface Town {
  id: number,
  name: string,
  coord: {
    lat: number,
    lon: number,
  },
  country?: string
}
export interface SearchTown {
  name: string,
  local_names?: { [key: string]: string, ascii: string, feature_name: string },
  lat: number,
  lon: number,
  country?: string,
  state?: string
}
