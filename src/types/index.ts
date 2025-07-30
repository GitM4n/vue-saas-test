export type AccountType = 'ldap' | 'local'

export type Account = {
  mark: string
  type: AccountType
  login: string
  password: string | null
}
