// types/sdg.ts
export interface SDG {
  id: number;
  displayTitle: string;
  actualTitle: string;
  summary: string;
  description: string;
  color: string;
  image_url: string;
  focus_areas: string[];
  objectives: string[];
  requirements: string[];
  benefits: string[];
  targets: string[];
}

export type SdgType = SDG;