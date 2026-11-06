
import {REGISTER_STEPS} from '../constant/form.constant';
import {registerSchema} from '../schemas';

export type IRegisterFormValues = z.infer<typeof registerSchema>;

export type IRegisterStep = typeof REGISTER_STEPS[keyof typeof REGISTER_STEPS];

export interface IRegisterResponse {
  users: IUser;
  token?: string;
  accessToken?: string;
  access_token?: string;
  data?: IRegisterResponse;
  payload?: IRegisterResponse;
  error?: string;    
}