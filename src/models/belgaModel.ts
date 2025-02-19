export type BelgaModel = Belga[];

export interface Belga {
  id: number;
  name: string;
  sourceType: string;
  subSources: SubSource[];
}

export interface SubSource {
  id: number;
  name: string;
  editorialType: string;
}
