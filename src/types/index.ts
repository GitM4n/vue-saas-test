export type AccountType = 'ldap' | 'local'

export type Account = {
  mark: { text: string }[]
  type: AccountType
  login: string
  password: string | null
}
