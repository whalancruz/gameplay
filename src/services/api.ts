import axios from 'axios';
import { enviroment } from '../environments/environments';

export const api = axios.create({
  // baseURL: enviroment.SCOPE
});