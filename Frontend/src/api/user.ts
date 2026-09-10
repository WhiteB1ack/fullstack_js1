import request from "./request.ts";

import type { LoginData, RegisterData } from "@/types/user.ts";

export function login(data: LoginData) {
  return request.post('/login', data)
}

export function register(data: RegisterData) {
  return request.post('/register', data)
}