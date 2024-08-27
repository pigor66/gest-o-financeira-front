export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface FormProps<T> {
  onSubmit: (data: T) => void;
}