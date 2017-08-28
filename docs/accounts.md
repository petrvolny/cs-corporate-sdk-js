# Accounts

This guide walks you through accessing companies accounts and their balance and transactions.

[AccountsResource](../lib/accounts/accounts.ts#L6)

```javascript

  // Get AccountsResource
  CSCorporateSDK
    .getClient()
    .accounts

```

## 1. List all companies accounts

You can list all of companies accounts by calling the `list` method on [AccountsResource](../lib/accounts/accounts.ts#L6). The `list` method takes object with options as a parameter. It also supports sorting, you can use [AccountsSortableFields](../lib/accounts/accounts.ts#L72) enum. See [AccountsParameters](../lib/accounts/accounts.ts#L54) for all supported options. For full response see [AccountList](../lib/accounts/accounts.ts#L56) interface.


```javascript

  // List all accounts
  CSCorporateSDK
    .getClient()
    .accounts
    .list(parameters: AccountsParameters)
    .then(...)
    .catch(...)

```

## 2. Get accounts balance

Get accounts balance by getting the [BalanceResource](../lib/accounts/balance.ts#L4) and then calling the `get` method on it. For full response see [AccountBalance](../lib/accounts/balance.ts#L22) interface.

```javascript

  // Get accounts balance
  CSCorporateSDK
    .getClient()
    .accounts
    .withId(accountId: string|number)
    .balance
    .get()
    .then(...)
    .catch(...)

```

## 3. List accounts transactions

You can list accounts transactions by getting the [TransactionsResource](../lib/accounts/transactions.ts#L4) and calling the `list` method on it. The `list` method takes object with options as a parameter. It also supports sorting, you can use [TransactionsSortableFields](../lib/accounts/transactions.ts#L35) enum. See [TransactionsParameters](../lib/accounts/transactions.ts#L28) for all supported options. For full response see [TransactionList](../lib/accounts/transactions.ts#L41) interface.

```javascript

  // Get accounts transactions
  CSCorporateSDK
    .getClient()
    .accounts
    .withId(accountId: string|number)
    .transactions
    .list(parameters: TransactionsParameters)
    .then(...)
    .catch(...)

```