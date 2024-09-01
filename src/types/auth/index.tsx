export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormProps<T> {
  onSubmit: (data: T) => void;
}
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
} 