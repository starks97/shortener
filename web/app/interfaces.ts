// Utility Types

/**
 * A utility type that flattens nested `data` properties in API responses.
 * If the type `T` has a `data` property, it extracts and returns its type `U`.
 * If no `data` property exists, it returns `T` itself.
 */
type FlattenData<T> = T extends { data: infer U } ? U : T;

/**
 * Represents a standard structure for API responses from the backend.
 * - `status`: Indicates whether the API response is successful ("success") or has errors ("error").
 * - `message`: Optional message providing additional context about the response.
 * - `data`: Contains the main response payload, flattened using `FlattenData<T>`.
 */
export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: FlattenData<T>;
}

// Query and Data Types

/**
 * Defines the structure for query parameters used in API requests.
 * Includes fields like:
 * - `limit`: The maximum number of records to fetch.
 * - `offset`: The starting point for fetching records.
 * - `category`: The category of URLs, defined by the `UrlCategories` enum.
 */
export type QueryParams = {
  limit: number;
  offset: number;
  category: UrlCategories;
};

/**
 * Represents the structure of URL data used in the application.
 * Includes metadata like:
 * - `id`, `slug`, `original_url`, `short_url`, `category`, `user_id`
 * - `views` and timestamps (`createdAt`, `updatedAt`).
 */
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

/**
 * Enum defining various URL categories such as `Tech`, `News`, `Music`, etc.
 */
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
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

export type Me = {
  user: {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    updatedAt: string;
  };
};

export type LoginData = {
  access_token: string;
};

export type RefreshTokenData = LoginData;

//ZOD FORM VALIDATION
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

//PROXY TYPES
export type SearchType = "view" | "update" | "delete" | "create";

export type ParamRecord = {
  id?: string;
  original_url?: string;
  short_url?: string;
  category?: UrlCategories;
  limit?: string | number;
  offset?: string | number;
};

export type ActionReturnTypes = {
  update: ApiResponse<UrlData>;
  view: ApiResponse<UrlData[]>;
  delete: ApiResponse<null>;
  create: ApiResponse<UrlData>;
};

export type ProxyActions = {
  [K in keyof ActionReturnTypes]: (
    params: ParamRecord,
    token: string
  ) => Promise<ActionReturnTypes[K]>;
};

//MODAL TYPES
export interface ModalProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

//QR GENERATION TYPES
export interface QRCodeGeneratorProps {
  url: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  size?: number;
  color?: string;
  bg?: string;
}
