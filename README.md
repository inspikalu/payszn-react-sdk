# PaySZN SDK Documentation

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Account Creation](#account-creation)
  - [API Key Generation](#api-key-generation)
  - [Setting Up Callback URLs](#setting-up-callback-urls)
- [Installation](#installation)
- [Importing](#importing)
- [Usage](#usage)
  - [Basic Implementation](#basic-implementation)
  - [Advanced Implementation](#advanced-implementation)
- [Component Reference](#component-reference)
  - [PaySZNProvider](#paysznprovider)
  - [PaymentButton](#paymentbutton)
  - [PaymentModalWrapper](#paymentmodalwrapper)
- [Configuration Options](#configuration-options)
- [Handling Payment Events](#handling-payment-events)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Overview

PaySZN is a comprehensive React/Next.js SDK designed to seamlessly integrate cryptocurrency payment processing with `Jupiter's swap functionality`. Our SDK simplifies the implementation of crypto payments in your applications, providing an intuitive experience for both developers and end-users.

What makes PaySZN unique is its ability to accept payments in any Solana token available on Jupiter, while automatically converting them to USDC for the merchant. This means your customers can pay with their preferred tokens, and you'll always receive the equivalent value in USDC without any additional steps.

The SDK handles the entire payment flow from token selection to transaction confirmation, making it easy to implement crypto payments in any web application built with React or Next.js.

## Features

- **Multi-Token Payment Processing**: Accept payments in any Solana token available on Jupiter while receiving USDC.
- **Automated Token Swaps**: Seamlessly convert customer tokens to USDC using Jupiter's swap functionality.
- **Solana Blockchain Support**: Built on Solana for fast and cost-effective transactions with minimal fees.
- **Pre-built React Components**: Plug-and-play UI components that save development time and look great.
- **Wallet Integration**: Built-in Solana wallet adapter integration for connecting to various wallet providers.
- **Responsive Design**: Sleek, modern interface that works perfectly across all devices and screen sizes.
- **Real-time Price Calculation**: Automatically calculates token equivalents based on current market prices.
- **Customizable Redirection**: Configure callback URLs to redirect users after completed transactions.
- **Robust Error Handling**: User-friendly error messages and transaction recovery procedures.

## Getting Started

### Account Creation

Before implementing the PaySZN SDK, you'll need to create an account on our platform:

1. Visit [https://dashboard.payszn.com/register](https://dashboard.payszn.com/register) to create a new developer account.
2. Fill in your details and complete the registration process.
3. Verify your email address by clicking the link sent to your inbox.
4. Log in to your new account to access the developer dashboard.

### API Key Generation

To use the PaySZN SDK in your application, you'll need to generate an API key:

1. Navigate to the "API Keys" section in your dashboard.
2. Click "Generate New API Key."
3. Copy the generated key—you'll need it when initializing the SDK.

> **⚠️ Important**: Keep your API key secure! Never commit it directly to your source code or expose it in client-side code without proper security measures.

### Setting Up Callback URLs

The callback URL is where users will be redirected after completing a payment. This is crucial for creating a seamless payment flow in your application:

1. In your dashboard, navigate to "Settings" > "Callback URLs."
2. Add the URL where users should be redirected after a successful payment (e.g., `https://yourdomain.com/payment/success`).
3. Optionally, configure separate URLs for successful, failed, or cancelled payments.
4. Save your settings.

When a payment is successfully processed, the SDK will automatically redirect the user to your specified callback URL. This happens in the `handleSubmitPaymentModal` method of the PaySZN class:

```typescript
// Inside the handleSubmitPaymentModal method
// Check if callbackUrl exists and redirect the user
if (processPaymentResponse && processPaymentResponse.callbackUrl) {
  // Close the modal first
  this.handleCloseModal();

  // Redirect to the callback URL
  window.location.href = processPaymentResponse.callbackUrl;
}
```

The URL defined in your dashboard will be returned in the `processPaymentResponse` from the PaySZN API after a successful payment.

## Installation

To install the PaySZN SDK, run one of the following commands in your project directory:

```bash
# Using npm
npm install payszn-sdk

# Using yarn
yarn add payszn-sdk

# Using pnpm
pnpm add payszn-sdk
```

## Importing

The PaySZN SDK provides several components and services that you can import into your application:

```typescript
// Main SDK export
import PaySZN from "payszn-sdk";

// Context provider and hook
import { PaySZNProvider, usePaySZN } from "payszn-sdk";

// UI Components
import { PaymentButton } from "payszn-sdk";
import { PaymentModalWrapper } from "payszn-sdk";

// Types
import type { PaymentIntent } from "payszn-sdk";

// Services (optional, for advanced usage)
import * as JupiterService from "payszn-sdk";
import * as TokenService from "payszn-sdk";
```

## Usage

### Basic Implementation

Here's a simple implementation to get you started with PaySZN:

```tsx
import { PaySZNProvider, PaymentButton, PaymentModalWrapper } from "payszn-sdk";

const CheckoutPage = () => {
  return (
    <PaySZNProvider apiKey="your_api_key_here" initialAmount={0.01}>
      <div className="flex h-screen items-center justify-center">
        <div className="w-40">
          <PaymentButton />
        </div>
        <PaymentModalWrapper />
      </div>
    </PaySZNProvider>
  );
};

export default CheckoutPage;
```

The `PaySZNProvider` initializes the SDK with your API key and the payment amount. The `PaymentButton` renders a button that opens the payment modal, and the `PaymentModalWrapper` contains the actual payment interface where users can select tokens and complete the transaction.

Note that the callback URL is configured in your dashboard and doesn't need to be passed as a prop in the basic implementation.


## Component Reference

### PaySZNProvider

The `PaySZNProvider` is the core component that initializes the SDK and provides the payment context to all child components.

```tsx
// From the source code
interface PaySZNProviderProps {
  apiKey: string;
  children: React.ReactNode;
  initialAmount?: number;
}

export const PaySZNProvider: React.FC<PaySZNProviderProps> = ({
  apiKey,
  children,
  initialAmount = 0.01,
}) => {
  // Implementation
};
```

**Props:**

| Prop            | Type            | Required | Default | Description                                                  |
| --------------- | --------------- | -------- | ------- | ------------------------------------------------------------ |
| `apiKey`        | string          | Yes      | -       | Your PaySZN API key obtained from the dashboard              |
| `initialAmount` | number          | No       | 0.01    | Initial payment amount in USDC                               |
| `children`      | React.ReactNode | Yes      | -       | Child components that will have access to the PaySZN context |

The `PaySZNProvider` creates a new instance of the PaySZN SDK and initializes a payment intent with the specified amount. It also wraps your components with the Solana wallet adapter providers through `WalletProviderWrapper`.

### PaymentButton

The `PaymentButton` component renders a button that triggers the payment modal when clicked. It uses the PaySZN instance from the context to render the button.

```tsx
// From the source code
export const PaymentButton: React.FC = () => {
  const { paySZN } = usePaySZN();

  if (!paySZN) return <div>Loading...</div>;

  return paySZN.renderPaymentButton();
};
```

The button styling is handled internally by the SDK, which uses a purple to blue gradient design for a modern look. Under the hood, it uses the `SDKPaymentButton` component with the following props:

### PaymentModalWrapper

The `PaymentModalWrapper` component renders the payment modal that allows users to select a token and complete the payment. It's conditionally rendered based on the `showModal` state from the PaySZN context.

```tsx
// Internal implementation in the SDK
export const PaymentModalWrapper: React.FC = () => {
  const { paySZN, showModal } = usePaySZN();

  if (!paySZN || !showModal) return null;

  return paySZN.renderPaymentModal();
};
```

The modal includes:

- Token selection dropdown (showing all tokens in the user's wallet)
- Estimated token amount calculation (based on current market prices)
- Wallet connection button (if wallet not connected)
- Pay button (when wallet is connected)
- Transaction status information

The modal has a sleek dark theme with gradient accents and is designed to be responsive across all device sizes. It automatically shows toast notifications for transaction status updates.

## Configuration Options

The PaySZN SDK configuration is primarily handled through the `PaySZNProvider` props and the dashboard settings. Here are the main configuration options:

```tsx
<PaySZNProvider
  apiKey="your_api_key_here"
  initialAmount={0.01} // Default: 0.01 USDC
  children={/* Your components */}
/>
```

### Backend Configuration

Most of the SDK's functionality is configured through your merchant dashboard at [https://dashboard.payszn.com](https://dashboard.payszn.com):

1. **Callback URLs**: Set the URL where users will be redirected after a payment
2. **Fee Configuration**: View and manage transaction fees
3. **Webhook Settings**: Configure webhooks for transaction notifications

## Troubleshooting

### Common Issues and Solutions

| Issue                     | Possible Solution                                                      |
| ------------------------- | ---------------------------------------------------------------------- |
| "Invalid API Key" error   | Ensure you're using the correct API key and that it hasn't expired     |
| Payment modal not opening | Check if the PaySZNProvider is properly wrapping your components       |
| Transaction timeout       | Network congestion may be causing delays; try again later              |
| Token not available       | Verify the token is supported on your configured network               |
| Callback URL not working  | Check URL format and ensure it's correctly configured in the dashboard |

For more help, see our [troubleshooting guide](https://docs.payszn.com/troubleshooting) or contact support.

## Examples

### E-commerce Checkout Integration

```tsx
import { PaySZNProvider, PaymentButton, PaymentModalWrapper } from "payszn-sdk";

function ProductCheckout({ product, price }) {
  return (
    <PaySZNProvider
      apiKey="your_api_key"
      initialAmount={price}
    >
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">${price} USD</p>

        <div className="payment-options">
          <PaymentButton label="Pay with Crypto" />
          {/* Other payment methods */}
        </div>
      </div>
      <PaymentModalWrapper />
    </PaySZNProvider>
  );
}
```

### Subscription Activation

```tsx
import { PaySZNProvider, PaymentButton, PaymentModalWrapper } from "payszn-sdk";

function SubscriptionActivation({ plan }) {
  const handleSuccess = (txId) => {
    // Activate the subscription in your database
    activateSubscription(user.id, plan.id, txId);
  };

  return (
    <PaySZNProvider
      apiKey="your_api_key"
      initialAmount={plan.monthlyPrice}
    >
      <div className="subscription-details">
        <h2>{plan.name} Plan</h2>
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p className="price">${plan.monthlyPrice}/month</p>

        <PaymentButton label="Subscribe Now" />
      </div>
      <PaymentModalWrapper />
    </PaySZNProvider>
  );
}
```

## Best Practices

- **API Key Security**: Never expose your API key in client-side code without proper security measures. Consider using environment variables and server-side authentication.

- **Error Handling**: Implement comprehensive error handling to provide a smooth user experience even when issues occur.

- **Testing**: Always test your integration thoroughly on the testnet before going live.

- **Responsive Design**: Ensure your payment flow works well on all device sizes.

- **Timeout Handling**: Implement proper timeout handling to manage cases where users abandon the payment process.


## Contributing

We welcome contributions to the PaySZN SDK! If you'd like to contribute:

1. Fork the repository on GitHub
2. Create a new branch for your feature
3. Add your changes and write tests
4. Submit a pull request with a clear description of your improvements

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/payszn/payszn-sdk/blob/main/LICENSE) file for more details.

## Support

If you encounter any issues or need assistance with implementation:

- **Documentation**: Visit our [documentation portal](https://docs.payszn.com)
- **FAQ**: Check our [frequently asked questions](https://docs.payszn.com/faq)
- **Email Support**: Contact us at `inspikalu@gmail.com`
- **GitHub Issues**: Report bugs through our [issue tracker](https://github.com/payszn/payszn-sdk/issues)
