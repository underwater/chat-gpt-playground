import { useRef, useState } from 'react';

// fetch wrapper

type Options = Omit<RequestInit, 'body'> & {
  body?: Record<string, any>;
};

export async function http<T>(endpoint: string, { body, ...options }: Options = {}) {
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`http://localhost:3000/${endpoint}`, config);

  if (response.ok) {
    return (await response.json()) as T;
  } else {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }
}

// class name helper

export function cx(...classNames: Array<string | boolean | undefined | null>) {
  return classNames.filter(Boolean).join(' ');
}

// ref with local storage persistence

export function usePersistRef(key: string) {
  const [initialValue] = useState<string | undefined>(
    () => localStorage.getItem(key) ?? undefined
  );
  const ref = useRef(initialValue);
  const setRef = (value: string) => {
    localStorage.setItem(key, value);
    ref.current = value;
  };
  return [ref, setRef] as const;
}
