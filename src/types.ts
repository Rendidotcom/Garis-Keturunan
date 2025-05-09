export type RelasiTipe = "Ayah" | "Ibu" | "Anak" | "Saudara" | "Pasangan";

export interface Relasi {
  nama: string;
  tipe: RelasiTipe;
}

export interface User {
  id: string;
  email: string;
  password: string;
  namaLengkap?: string;
  foto?: string;
  relasi?: Relasi[];
}
