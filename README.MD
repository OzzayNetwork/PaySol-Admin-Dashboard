# PaySol Admin Frontend

PaySol Admin is the web application used by business owners and administrators to manage and monitor their businesses.

PaySol is not just a POS system. It is a business accountability and visibility platform designed for businesses where the owner may not always be physically present.

The Admin frontend provides the owner with a clear view of:

* Sales
* Payments
* Cash
* M-Pesa
* Bank transactions
* Stock
* Employees
* Customers
* Branches
* Commissions
* Expenses
* Reconciliation
* Business activity
* Exceptions and unusual activity

The main goal is simple:

> **Give the business owner a reliable view of what is happening in the business, even when they are not there.**

---

# 1. Product Context

PaySol targets growing Kenyan businesses such as:

* Small bars
* Wines & spirits shops
* Kinyozi and barbershops
* Spas and salons
* Mini supermarkets
* Supermarkets
* Pharmacies
* Hardware shops
* General retail shops
* Other small and medium businesses

Many of these businesses are operated by employees while the owner is elsewhere.

This creates problems such as:

* Cash leakage
* M-Pesa/payment diversion
* Stock leakage
* Unrecorded sales
* Employee-owned stock being sold before business stock
* Customer relationships moving from the business to employees
* Unexplained cash differences
* Payment reconciliation problems
* Difficulty knowing what happened during the day
* Owners discovering problems only after significant losses

PaySol is designed to create an independent business record.

---

# 2. Core Product Principle

Every important business event should leave a trace.

For example:

```text
Customer
   ↓
Product / Service
   ↓
Employee
   ↓
Sale
   ↓
Payment
   ↓
Business Account
   ↓
Reconciliation
```

The Admin application should allow the owner to follow this chain.

The system should make it easy to answer:

1. What was sold?
2. Who sold it?
3. When was it sold?
4. What stock moved?
5. How much should have been received?
6. Where was the money received?
7. Was the payment confirmed?
8. Does the payment match the sale?
9. Is there anything unusual?
10. Which employee, branch, product or payment account requires attention?

---

# 3. Admin Frontend Responsibilities

The Admin frontend is responsible for presenting and managing business information.

It should NOT become the source of truth for business rules.

The backend/API remains responsible for:

* Authentication
* Authorization
* Business rules
* Validation
* Calculations
* Payment verification
* Reconciliation
* Stock calculations
* Commission calculations
* Audit logging
* Integration with payment providers
* Integration with banks
* Transaction processing

The frontend should consume APIs and provide a clear, fast and understandable interface.

---

# 4. Main Admin Areas

## Dashboard

The dashboard should give the owner a quick understanding of business health.

The owner should be able to understand the important information in approximately 30 seconds.

Example:

```text
Today's Sales
KSh 185,400

Payments Received
KSh 182,900

Outstanding Difference
KSh 2,500

Stock Value
KSh 1,840,000

Employees Active
12

Branches
4

Exceptions
3
```

The dashboard should prioritize exceptions and important information rather than filling the screen with charts.

---

# 5. Sales

The sales section should provide:

* Sales list
* Sale details
* Sale items
* Employee/cashier
* Branch
* Customer
* Discounts
* Taxes where applicable
* Payment status
* Refunds
* Voided sales
* Sale history

Example:

```text
Sale #PS-00018273

Branch: CBD
Cashier: Brian
Date: 30 Sep 2026

Items:
- Sugar 2kg        KSh 320
- Bread            KSh 80
- Milk             KSh 120

Total:             KSh 520

Payment:
M-Pesa Till
Status: Confirmed
Transaction: QK123ABC
```

---

# 6. Payments

Payments are independent business records.

Do not assume:

```text
Sale = Payment
```

A sale may have:

* One payment
* Multiple payments
* Partial payment
* Pending payment
* Failed payment
* Reversed payment
* Unmatched payment

Payment states may include:

```text
pending
confirmed
failed
reversed
unmatched
duplicate
```

The Admin UI should make these states clear.

---

# 7. Payment Accounts

A business can have multiple official payment channels.

Examples:

```text
M-Pesa Till
M-Pesa PayBill
Pochi
KCB Account
Equity Account
Co-op Account
Card Terminal
Cash Drawer
```

The frontend should allow administrators to view and manage approved payment accounts according to backend permissions.

Example:

```text
Payment Accounts

M-Pesa Till
Status: Active

KCB Bank
Status: Active

Equity Bank
Status: Active

Cash
Status: Active
```

The concept is important:

> PaySol should know where business money is officially allowed to arrive.

---

# 8. Reconciliation

Reconciliation is one of the most important parts of PaySol.

The frontend should help the owner compare:

```text
Expected
    ↓
Received
    ↓
Difference
    ↓
Explanation
```

Example:

```text
Today's Sales                 KSh 185,400

Expected Payments
Cash                          KSh 42,000
M-Pesa                        KSh 58,500
PayBill                       KSh 21,400
Bank                          KSh 35,000
Card                          KSh 28,500

Expected Total                KSh 185,400

Actual Received               KSh 182,900

Difference                    -KSh 2,500
```

The user should be able to drill into the difference.

---

# 9. Unmatched Payments

A payment can arrive without PaySol knowing which sale it belongs to.

Example:

```text
M-Pesa payment received

Amount: KSh 4,500
Reference: QK73H2...
Time: 14:32
Account: Till 123456

Sale: Unknown
```

This should become an **unmatched payment**.

The Admin user should be able to:

* View it
* Search for matching sales
* Match it
* Leave it unmatched
* Investigate it
* View its source transaction

Never silently discard unmatched payments.

---

# 10. Stock

The stock section should provide:

* Products
* Categories
* Stock levels
* Stock movements
* Purchases
* Sales
* Adjustments
* Transfers
* Damaged stock
* Returns
* Low-stock alerts
* Stock valuation

The system should preserve stock history.

Do not simply overwrite:

```text
Stock = 100
```

Instead record movements:

```text
Opening:       100
Purchase:      +50
Sale:          -20
Adjustment:    -2
Transfer:      -10

Current:       118
```

The history is important for accountability.

---

# 11. Employees

Employees should be connected to business activity.

The Admin should be able to see:

* Employee profile
* Role
* Branch
* Sales
* Transactions
* Payments
* Services
* Commission
* Voids
* Discounts
* Refunds
* Stock movements
* Login/activity history
* Exceptions

The purpose is not to assume an employee is dishonest.

The purpose is to make business activity traceable.

---

# 12. Services and Commission

For businesses such as:

* Kinyozi
* Barbershops
* Salons
* Spas
* Massage businesses
* Other service businesses

PaySol should support:

```text
Customer
   ↓
Service
   ↓
Employee
   ↓
Sale
   ↓
Payment
   ↓
Commission
```

Example:

```text
Service: Haircut
Price: KSh 500
Employee: John

Commission: 30%
Commission amount: KSh 150
```

The frontend should clearly distinguish:

* Revenue
* Employee commission
* Business income

---

# 13. Customers

Customers may be associated with:

* Sales
* Services
* Branches
* Employees
* Payments
* Contact information
* Purchase history

Customer information should belong to the business rather than becoming dependent on an individual employee.

This is especially important for service businesses.

---

# 14. Branches

PaySol should support multiple branches.

Every relevant transaction should be traceable to a branch.

Example:

```text
Business
 ├── CBD
 ├── Westlands
 ├── Utawala
 └── Rongai
```

The Admin user should be able to view:

* Business-wide information
* Branch information
* Branch sales
* Branch stock
* Branch employees
* Branch payments
* Branch reconciliation
* Branch exceptions

---

# 15. Exceptions

Exceptions are one of the most important future capabilities of PaySol.

The system should highlight things that require investigation.

Examples:

```text
Payment Account Mismatch

A payment was recorded against an
unapproved payment account.
```

```text
Stock / Sales Mismatch

Stock decreased by 12 units but
only 10 corresponding sales were found.
```

```text
Unmatched Payment

KSh 5,400 was received but no
matching sale was found.
```

```text
Unusual Activity

Refund activity for this employee
is significantly above their normal level.
```

The frontend should present these as **things to investigate**, not accusations.

Avoid UI language such as:

> "John is stealing."

Prefer:

> "Unusual activity requires review."

---

# 16. Audit Trail

Important actions should be traceable.

Examples:

```text
Who
What
When
Before
After
Reason
```

Example:

```text
John

Changed product price

From: KSh 500
To: KSh 450

Time:
14:32

Reason:
Customer discount
```

Another:

```text
Mary

Voided Sale #PS-001823

Amount:
KSh 4,500

Reason:
Duplicate sale
```

The frontend should make audit information accessible without making the normal workflow complicated.

---

# 17. Roles and Permissions

The Admin application should support role-based access.

Possible roles:

```text
Owner
Administrator
Manager
Supervisor
Cashier
Stock Manager
Accountant
```

Permissions should come from the backend.

Do not rely on frontend hiding alone for security.

For example:

```text
Frontend:
Hide "Delete User"

Backend:
Must still reject unauthorized requests.
```

Frontend permissions are for UX.

Backend permissions are for security.

---

# 18. Design Principles

## Simple

The application should be understandable by a Kenyan SME owner who is not an accountant or software engineer.

Avoid unnecessary technical terminology.

---

## Fast

Business owners often check the system from a phone or while busy.

Important information should appear quickly.

---

## Action-oriented

Do not make users search through five pages to understand a problem.

Prefer:

```text
3 Exceptions Need Attention
```

over:

```text
Here are 17 reports.
```

---

## Traceable

Important numbers should be drillable.

For example:

```text
Today's Sales
KSh 185,400
```

Clicking should allow the user to see the transactions making up that number.

---

## Don't Destroy History

Avoid interfaces that overwrite important historical information.

Prefer:

```text
Adjustment
Correction
Reversal
Void
Refund
```

with an audit trail.

---

# 19. Frontend Architecture

The exact technology stack should follow the project's existing setup.

A recommended logical structure is:

```text
src/
├── app/
├── components/
├── layouts/
├── pages/
├── features/
│   ├── dashboard/
│   ├── sales/
│   ├── payments/
│   ├── reconciliation/
│   ├── inventory/
│   ├── employees/
│   ├── customers/
│   ├── branches/
│   ├── services/
│   ├── commissions/
│   ├── expenses/
│   └── settings/
├── hooks/
├── services/
├── api/
├── types/
├── utils/
└── assets/
```

Feature-specific logic should stay close to the feature where practical.

Avoid creating a giant global utility layer.

---

# 20. API Integration

The frontend should communicate with the PaySol backend through a clearly defined API layer.

Prefer:

```text
components
    ↓
hooks / feature services
    ↓
API client
    ↓
PaySol Backend
```

Avoid scattering raw HTTP calls throughout components.

For example:

```text
Bad:

Component
 └── fetch("/api/sales/123")

Another component
 └── fetch("/api/sales/123")

Another component
 └── axios.get(...)
```

Prefer:

```text
salesService
    ↓
getSale(id)
    ↓
API client
```

This makes the frontend easier to maintain when backend APIs change.

---

# 21. State Management

Use local state where possible.

Use shared/global state only where there is a real need.

Examples of appropriate global state:

* Authenticated user
* Current business
* Current branch
* Permissions
* Application configuration

Do not put every API response into global state.

Server data should have a clear caching/invalidation strategy.

---

# 22. Error Handling

Never silently fail.

API failures should provide useful messages.

Bad:

```text
Error 500
```

Better:

```text
We couldn't load today's sales.

Please try again.
```

For payment-related operations, be particularly careful.

Do not tell the user:

> “Payment failed”

unless the backend has actually confirmed that the payment failed.

Possible state:

```text
Payment status is being verified.
```

This is important for M-Pesa and bank integrations where callbacks or verification can be delayed.

---

# 23. Loading States

Every data-dependent screen should have a proper loading state.

Use:

* Skeletons
* Spinners where appropriate
* Empty states
* Error states

Avoid blank screens.

---

# 24. Empty States

An empty state should explain what the user can do.

Example:

```text
No payment accounts yet.

Add your first payment account to start
tracking business payments.
```

Avoid:

```text
No data.
```

---

# 25. Mobile Responsiveness

The Admin application should work well on:

* Desktop
* Laptop
* Tablet
* Mobile browsers

The owner may not sit at a computer.

Important dashboard information should remain accessible on smaller screens.

---

# 26. Currency and Localisation

PaySol's primary market is Kenya.

Use:

```text
KES
KSh
```

consistently according to the project's UI conventions.

Dates and times should use the business's configured timezone.

Do not hard-code formatting logic throughout components.

Create reusable formatting utilities.

---

# 27. Security

Never place sensitive credentials in frontend code.

The frontend must never contain:

* M-Pesa consumer secrets
* M-Pesa consumer keys
* Bank API secrets
* Client secrets
* Encryption keys
* Private credentials

Payment provider credentials belong on the backend.

Environment variables exposed to the browser must contain only values that are safe to expose.

---

# 28. Important Payment Principle

STK Push is not the payment ledger.

The frontend should distinguish between:

```text
Payment Initiated
```

and:

```text
Payment Confirmed
```

A typical flow may be:

```text
Sale
 ↓
Payment Request
 ↓
Pending
 ↓
Provider Confirmation
 ↓
Confirmed
```

If confirmation has not arrived:

```text
Pending / Verifying
```

Do not automatically show:

```text
Paid
```

just because an STK request was initiated.

---

# 29. Reconciliation Principle

PaySol should eventually be able to reconcile different sources:

```text
Sales
   ↕
Payments
   ↕
Provider Transactions
   ↕
Bank Statements
   ↕
Cash
```

The frontend should make differences visible.

Example:

```text
Expected:   KSh 100,000
Received:   KSh 98,500
Difference: KSh -1,500
```

The user should be able to drill into the difference.

---

# 30. Do Not Hard-Code Payment Providers

The frontend should not assume that the business only uses M-Pesa.

Payment providers should be represented as data.

Examples:

```text
M-Pesa
KCB
Equity
Co-operative Bank
Stanbic
Card
Cash
```

The same UI concepts should work across different providers.

---

# 31. Development Philosophy

When adding a feature, ask:

### 1. Does this help the owner understand the business?

### 2. Does this create or improve traceability?

### 3. Can the owner drill from a number to the underlying transaction?

### 4. Does the feature work when the owner is not physically present?

### 5. Does it preserve historical information?

### 6. Does it make reconciliation easier?

### 7. Does it avoid assuming that an employee is dishonest?

### 8. Does it remain simple enough for a small business?

---

# 32. Example Owner Journey

A typical owner might open PaySol in the morning.

The dashboard should quickly show:

```text
GOOD MORNING

Yesterday

Sales                 KSh 185,400
Payments received     KSh 182,900
Difference            KSh 2,500

Stock value           KSh 1.84M

────────────────────────

3 items need attention

1. KSh 4,500 unmatched M-Pesa payment
2. Branch 2 has KSh 2,500 reconciliation difference
3. 2 stock adjustments made yesterday
```

The owner can then drill down.

The goal is not to make the owner read reports.

The goal is to make the owner **understand what needs attention**.

---

# 33. What PaySol Admin Is Not

PaySol Admin should not become:

* A complicated accounting system
* A spreadsheet replacement with hundreds of screens
* A generic ERP
* A banking application
* A payment provider
* A surveillance system for employees

It should remain focused on:

> **Business visibility, control and accountability.**

---

# 34. North Star

The ultimate question for the frontend is:

> **Can a business owner understand the health of their business in 30 seconds and investigate anything unusual within a few clicks?**

If yes, the frontend is doing its job.

---

# 35. Future Direction

Potential future capabilities include:

* Multi-business management
* Multi-branch dashboards
* Advanced reconciliation
* Automated bank statement import
* M-Pesa transaction matching
* Bank API integrations
* Payment anomaly detection
* Stock anomaly detection
* Employee performance analytics
* Service commissions
* Supplier management
* Purchase management
* Customer loyalty
* Business notifications
* WhatsApp/SMS notifications
* Offline-aware workflows
* Advanced reporting

These should be added without compromising the core principle:

> **Simple for the operator. Powerful for the owner. Traceable for the business.**

---

# 36. Final Product Statement

PaySol Admin is the owner's window into the business.

The POS records what happens.

The payment integrations tell us where money went.

The inventory system tells us what moved.

The employee system tells us who handled it.

The reconciliation engine checks whether everything agrees.

The Admin frontend brings all of this together so the owner can understand the business without physically being there.
