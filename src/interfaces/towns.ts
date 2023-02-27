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
