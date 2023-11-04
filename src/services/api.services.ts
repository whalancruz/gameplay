import axios from 'axios';
import { enviroment } from '../environments/environments';
import Storage from '../utils/storage';
import { StorageKeys } from '../enums/storage';
import { IUser } from '../interfaces/user.interfaces';

export const api = axios.create({
  baseURL: enviroment.SCOPE
});

// Interceptador para capturar erros de autenticação
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // Token de acesso expirado, renovar o token aqui

      let usuario = await Storage.get(StorageKeys.gameplay_user) as IUser;

      if (usuario) {
        // let newToken = await requestRefreshToken(usuario.token);

        // console.log("newToken", newToken);

        // usuario.token = newToken;

        // api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        // await Storage.set(StorageKeys.gameplay_user, JSON.stringify(usuario));
      };

      // Após a renovação do token, tente a chamada novamente
      // return api(error.config);
    }
    return Promise.reject(error);
  }
);