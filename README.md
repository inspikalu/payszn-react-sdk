# PaySZN SDK Documentation

## Overview

PaySZN is a comprehensive SDK designed to handle cryptocurrency payment processing with Jupiter swap integration. It simplifies the process of integrating cryptocurrency payments into your application, providing a seamless experience for both developers and users.

## Features

- **Cryptocurrency Payment Processing**: Easily handle payments in various cryptocurrencies.
- **Jupiter Swap Integration**: Leverage Jupiter's swap functionality for efficient token exchanges.
- **User-Friendly Components**: Pre-built React components for quick integration.

## Installation

To install the PaySZN SDK, run the following command:

```terminal
npm install payszn-sdk
```

## Usage

### Importing the SDK Components

To use the PaySZN SDK in your frontend application, import the necessary components:

```tsx
import { PaySZNProvider, PaymentButton, PaymentModalWrapper } from "payszn-sdk";
```

### Example Implementation

Below is an example of how to implement the PaySZN SDK in a frontend application:

```tsx
import { PaySZNProvider, PaymentButton, PaymentModalWrapper } from "payszn-sdk";

const Home = () => {
  return (
    <PaySZNProvider apiKey="Your_api_Key" initialAmount={0.01}>
      <div className="flex h-screen items-center justify-center">
        <div className="w-40">
          <PaymentButton />
        </div>
        <PaymentModalWrapper />
      </div>
    </PaySZNProvider>
  );
};

export default Home;
```

##

`PaySZNProvider`

The `PaySZNProvider` component is the main provider for the PaySZN SDK. It initializes the SDK with the provided API key and initial payment amount.

**Props:**

- apiKey (string): Your API key for the PaySZN SDK.
- initialAmount (number): The initial payment amount in USDC.

`PaymentButton`

The `PaymentButton` component renders a button that, when clicked, opens the payment modal.

`PaymentModalWrapper`

The `PaymentModalWrapper` component renders the payment modal, which handles the entire payment process.

## API Reference

### PaySZNProvider

```
<PaySZNProvider apiKey="Your_api_Key" initialAmount={0.01}>
  {/* Your components */}
</PaySZNProvider>
```

### PaymentButton

```
<PaymentButton />
```

### PaymentModalWrapper

```
<PaymentModalWrapper />
```

## Contributing

We welcome contributions to the PaySZN SDK. If you have any suggestions or improvements, please open an issue or submit a pull request on our GitHub repository.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Support
If you have any questions or need support, please contact our support team at `inspikalu@gmail.com`.
