export enum Category {
  Asia = 'Asia',
  Mountains = 'Mountains',
  Europe = 'Europe',
  America = 'America',
  Africa = 'Africa',
  Deserts = 'Deserts',
  Balkans = 'Balkans',
  Caucasus = 'Caucasus',
  Oceania = 'Oceania',
}

export const CATEGORY_MAP = {
  [Category.Asia]: 'Азія',
  [Category.Mountains]: 'Гори',
  [Category.Europe]: 'Європа',
  [Category.America]: 'Америка',
  [Category.Africa]: 'Африка',
  [Category.Deserts]: 'Пустелі',
  [Category.Balkans]: 'Балкани',
  [Category.Caucasus]: 'Кавказ',
  [Category.Oceania]: 'Океанія',
} as const;

// export interface Category {
//   _id: string;
//   name: keyof typeof CategoryMap;
// }
