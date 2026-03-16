export interface User {
  id: string
  name: string
  email: string
}

// Stored in localStorage (password is plaintext until Supabase is added)
export interface StoredUser extends User {
  password: string
}
