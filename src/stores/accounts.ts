import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const addAccount = (account: Account) => {
    accounts.value.push(account)
  }

  const updateAccount = (index: number, newAccount: Account) => {
    accounts.value[index] = newAccount
    if (accounts.value[index].password !== '' && accounts.value[index].login !== '') saveAccounts()
  }

  const removeAccount = (index: number) => {
    accounts.value.splice(index, 1)
    saveAccounts()
  }

  const saveAccounts = () => {
    sessionStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  const loadAccounts = () => {
    const saved = sessionStorage.getItem('accounts')
    if (saved) accounts.value = JSON.parse(saved)
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    removeAccount,
    saveAccounts,
    loadAccounts,
  }
})
