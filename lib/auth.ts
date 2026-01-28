const AUTH_KEY = 'capvision_auth';

export const isLoggedIn = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const setLoggedIn = (value: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(AUTH_KEY, value ? 'true' : 'false');
};

export const clearLoggedIn = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(AUTH_KEY);
};
