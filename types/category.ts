export type CategoryName = 
  | "Азія"
  | "Гори"
  | "Європа"
  | "Америка"
  | "Африка"
  | "Пустелі"
  | "Балкани"
  | "Кавказ"
  | "Океанія";

export interface Category {
    _id: string;
    name: CategoryName;
}