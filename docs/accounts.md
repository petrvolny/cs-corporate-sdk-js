# Accounts

This guide walks you through accessing companies accounts and their balance and transactions.

[AccountsResource](../lib/accounts/accounts.ts)

```javascript

  // Get AccountsResource
  CSCorporateSDK
    .getClient()
    .accounts

```

## 1. List all companies accounts

You can list all of companies accounts by callling the `list` method on [AccountsResource](../lib/accounts/accounts.ts).

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

Get accounts balance by getting the [BalanceResource](../lib/accounts/balance.ts) and then calling the `get` method on it.

```javascript

  // Get accounts balance
  CSCorporateSDK
    .getClient()
    .accounts
    .withId(id: string|number)
    .balance
    .get()
    .then(...)
    .catch(...)

```

## 3. List accounts transactions

You can list accounts transactions by getting the [TransactionsResource](../lib/accounts/transactions.ts) and calling the `list` method on it. The `list` method takes object as its parameter. See [TransactionsParameters](../lib/accounts/transactions.ts).

```javascript

  // Get accounts transactions
  CSCorporateSDK
    .getClient()
    .accounts
    .withId(id: string|number)
    .transactions
    .list(parameters: TransactionsParameters)
    .then(...)
    .catch(...)

```