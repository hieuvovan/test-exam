import * as localStorageKeys from '../constants'

export class AuthStorageService {
  get token(): any {
    return localStorage.getItem(localStorageKeys.ACCESS_TOKEN_KEY);
  }

  set token(value: string) {
    if (this.token === value) return;
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN_KEY, value)
  }

  destroy() {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN_KEY)
  }
}
