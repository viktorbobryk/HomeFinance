import React, {Component} from 'react';

class FAQ extends Component {

  state = {

  };

  render() {
    return (
      <div>
          <h3>Capital One transactions are missing or not downloaded</h3>
         <p> As part of the new connection method for Capital One using apps like Mint, your Mint accounts will update once every 24 hours. As a result, it can take up to 24-48 hours for cleared transactions available on the Capital One site, to be available in Mint.

          In addition, pending transactions are no longer available in Mint. Once a transaction has cleared, it will be visible in Mint within 24-48 hours.

         </p>
             <h3>Mint bill pay is no longer supported</h3>
          <p>We have some important news to share. On June 30, Mint’s bill pay feature is going away. This means you’ll no longer be able to pay your bills through Mint, but you can still track your bills and get upcoming bill reminders.
          </p>
          <h3>How do I cancel a payment?</h3>
          <p>You can cancel a payment from the payment receipt found in the biller detail section in both the web and mobile app or from the payment confirmation email you received.
          </p>
      </div>
    );
  }
}

export default FAQ;