export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
}

export type QueryParams = {
  limit: number;
  offset: number;
  category: UrlCategories;
};

export type UrlData = {
  id: string;
  slug: string;
  original_url: string;
  short_url: string;
  category: UrlCategories;
  user_id: string;
  username: string;
  views: number;
  createdAt: string;
  updatedAt: string;
};

export enum UrlCategories {
  All = "All",
  Tech = "Tech",
  News = "News",
  Music = "Music",
  Sports = "Sports",
  Gaming = "Gaming",
  Movies = "Movies",
  Education = "Education",
  Science = "Science",
}

export type RegisterData = {
  id: string;
  email: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type LoginData = {
  access_token: string;
};

export type RefreshTokenData = LoginData;

export interface FieldErrors {
  [key: string]: string;
}

export interface ActionData<T> {
  errors?: Partial<Record<keyof T, string>> & { general?: string };
}

export interface FormField {
  name: string;
  type: "text" | "select" | "password" | "email";
  label: string;
  placeholder: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface FormProps<T> {
  formSchema: FormField[];
  children?: React.ReactNode;
  actionData: ActionData<T>;
}
