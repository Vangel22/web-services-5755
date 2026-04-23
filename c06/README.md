# c06 — Multitenancy и циркуларниот проблем

## Што е циркуларниот проблем?

Во оваа лекција воведовме **multitenancy** — секој `Account` припаѓа на една
`Organization`, а секој `Event` припаѓа на истата организација. Тоа значи дека
`Account.organizationId` е задолжително поле.

Но тука настана еден проблем:

- За да направиш **account**, ти треба `organizationId`.
- За да направиш **organization**, мораш да си **најавен** (бидејќи рутата е
  заштитена со JWT).
- За да си најавен, мораш да имаш **account**.

Ова е класичен _chicken-and-egg_ / циркуларен проблем: A зависи од B, B зависи од
C, C зависи од A.

## Како го решивме?

Со **најпростото можно решение**: ги споивме двете операции во една рута.

`POST /auth/register` сега прима и `organizationName` покрај другите полиња.
Логиката е _find-or-create_:

1. Ако организација со тоа име **не постои** → ја креираме (новиот корисник е
   нејзиниот сопственик).
2. Ако организација со тоа име **веќе постои** → новиот корисник се придружува
   кон постоечката.

На тој начин организацијата секогаш постои **пред** да го креираме accountот, па
`organizationId` секогаш има вредност.

## Пример

**Прв корисник креира организација:**

```http
POST /auth/register
{
  "username": "alice",
  "email": "alice@x.com",
  "password": "p",
  "confirmPassword": "p",
  "organizationName": "Alice Corp"
}
```

→ Се креира `Alice Corp`, Alice е првиот член.

**Втор корисник се придружува на истата организација:**

```http
POST /auth/register
{
  "username": "bob",
  "email": "bob@x.com",
  "password": "p",
  "confirmPassword": "p",
  "organizationName": "Alice Corp"
}
```

→ Bob се придружува кон постоечката `Alice Corp`. Сега Alice и Bob имаат ист
`organizationId`.

**Сега `joinEvent` има смисла:**

Alice може да направи event и да го додаде Bob како attendee преку
`POST /join/:id/:attendeeId`, бидејќи и двата accountи припаѓаат на истата
организација и `Event.findOne({ _id, organizationId })` ќе ги најде податоците.
