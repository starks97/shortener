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

/**
 * Represents the response structure when registering a new user.
 * Fields include user details like `id`, `email`, `name`, and timestamps.
 */
export type RegisterData = {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

/**
 * Defines the structure of the current authenticated user data.
 * Fields include user details like `id`, `email`, `name`, and timestamps (`createdAt`, `updatedAt`).
 */
export type Me = {
  user: {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    updatedAt: string;
  };
};

/**
 * Represents the structure of data returned after a successful login.
 * Contains the `access_token` used for authenticated requests.
 */
export type LoginData = {
  access_token: string;
};

/**
 * Alias for `LoginData`, used when refreshing authentication tokens.
 */
export type RefreshTokenData = LoginData;

// Form and Validation Types

/**
 * Represents error messages for specific form fields.
 * A dictionary where each key corresponds to a field name, and the value is the error message.
 */
export interface FieldErrors {
  [key: string]: string;
}

/**
 * Represents data related to form submission actions.
 * Fields:
 * - `errors`: Partial dictionary of field errors, optionally including a general error message.
 */
export interface ActionData<T> {
  errors?: Partial<Record<keyof T, string>> & { general?: string };
}

/**
 * Defines the structure of a single form field.
 * Fields:
 * - `name`: Unique identifier for the form field.
 * - `type`: Type of input field (e.g., `text`, `select`, `password`, etc.).
 * - `label`: User-friendly label for the form field.
 * - `placeholder`: Placeholder text for the input field.
 * - `required`: Indicates whether the field is mandatory.
 * - `options`: Optional field for dropdowns or select inputs.
 */
export interface FormField {
  name: string;
  type: "text" | "select" | "password" | "email";
  label: string;
  placeholder: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

/**
 * Represents the props passed to a form component.
 * Fields:
 * - `formSchema`: An array of `FormField` definitions.
 * - `children`: Optional child components rendered inside the form.
 * - `actionData`: Contains action-related data like errors.
 */
export interface FormProps<T> {
  formSchema: FormField[];
  actionData: ActionData<T>;
  method: string;
  action?: string; //this field is to define what route should be use to excute the action of the form
  submitLabel: string;
}

// Proxy and Action Types

/**
 * Enum-like type defining available actions (`view`, `update`, `delete`, `create`) for proxy interactions.
 */
export type SearchType = "view" | "update" | "delete" | "create";

/**
 * Represents the parameters passed to proxy actions.
 * Includes fields like `id`, `original_url`, `short_url`, `category`, and pagination fields (`limit`, `offset`).
 */
export type ParamRecord = {
  id?: string;
  original_url?: string;
  short_url?: string;
  category?: UrlCategories;
  limit?: string | number;
  offset?: string | number;
};

/**
 * Maps actions to their expected API response types.
 * Structure:
 * - `update`: Returns a single `UrlData` object.
 * - `view`: Returns an array of `UrlData` objects.
 * - `delete`: Returns `null`.
 * - `create`: Returns a single `UrlData` object.
 */
export type ActionReturnTypes = {
  update: ApiResponse<UrlData>;
  view: ApiResponse<UrlData[] | UrlData>;
  delete: ApiResponse<null>;
  create: ApiResponse<UrlData>;
};

/**
 * Represents a collection of asynchronous functions for each proxy action.
 * Each function takes `params` and `token` as arguments and returns a promise resolving to the corresponding `ActionReturnTypes` type.
 */
export type ProxyActions = {
  [K in keyof ActionReturnTypes]: (
    params: ParamRecord,
    token: string
  ) => Promise<ActionReturnTypes[K]>;
};

// Modal Types

/**
 * Defines the structure of props for modal components.
 * Fields:
 * - `id`: Unique identifier for the modal.
 * - `title`: Title of the modal.
 * - `children`: Optional child components or content inside the modal.
 * - `footer`: Optional footer content for the modal.
 * - `close`: close modal.
 */
export interface ModalProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  close: () => void;
}

/**
 * `SearchModalType` is a union type representing possible modes or variants of a "search modal."
 * In this case, it can be either:
 * - `"view"`: Represents a standard viewing mode.
 * - `"qr"`: Represents a mode for displaying or scanning QR codes.
 */
export type SearchModalType = "view" | "qr";

/**
 * `ModalActions` defines a structure that maps each `SearchModalType` to a corresponding
 * function that handles the behavior of opening or manipulating modal references.
 *
 * Both `view` and `qr` functions receive:
 * - `dialogRef`: A ref to a `HTMLDialogElement` which might be the primary modal dialog.
 * - `qrModalRef`: A ref to another `HTMLDialogElement` which might be specifically for a QR
 *    code related modal.
 *
 * By having these as functions, you can encapsulate how each modal type is initialized or
 * presented, possibly performing DOM interactions (such as calling `dialogRef.current?.showModal()`),
 * fetching data, or modifying state before the modal is displayed.
 */
export type ModalActions = {
  view: (
    dialogRef: React.RefObject<HTMLDialogElement>,
    qrModalRef: React.RefObject<HTMLDialogElement>
  ) => void;
  qr: (
    dialogRef: React.RefObject<HTMLDialogElement>,
    qrModalRef: React.RefObject<HTMLDialogElement>
  ) => void;
};

// QR Code Generation Types

/**
 * Defines the props for generating QR codes.
 * Fields:
 * - `url`: The URL to encode in the QR code.
 * - `canvasRef`: A reference to the HTML canvas element where the QR code will be drawn.
 * - `size`: Optional size of the QR code.
 * - `color`: Optional color for the QR code.
 * - `bg`: Optional background color for the QR code.
 */
export interface QRCodeGeneratorProps {
  url: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  size?: number;
  color?: string;
  bg?: string;
}
