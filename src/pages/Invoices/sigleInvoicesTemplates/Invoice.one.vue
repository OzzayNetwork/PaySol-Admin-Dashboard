<template>
  <div class="bill-container">
    <button class="print-btn d-none" @click="handlePrint">
      <img src="" alt="Printer Icon">
    </button>
    <button class="print-btn email-doc d-none" title="send On Email">
      <img src="" alt="Printer Icon">
    </button>

    <div class="page">
      <!-- Main content -->
      <div class="page-content">
        <header class="header">
          <div class="logo">
            <img src="../../../assets/images/favicon.svg" alt="Kenya Coat of Arms">
          </div>
          <div class="header-center">
            <h2 class="county-title">
              County Government <br> Of Homa-Bay
            </h2>
            <h4 class="center-subtitle">
              (Ushuru Center)
            </h4>
            <h4 class="contact-info">
              P.O Box 469-40300 Homa Bay <br>
              Email: finance@homabay.go.ke
            </h4>
            <h4 class="motto">
              <span class="motto-text">Tulipe Ushuru Tujenge Homa Bay</span>
              <span class="motto-text">#Endless Potential</span>
            </h4>
          </div>
          <div class="logo">
            <img src="../../../assets/images/favicon.svg" alt="Homa Bay Logo">
          </div>
        </header>
        
        <div class="blue-line">
          <img src="../../../assets/images/invoice-assest/blue-line.png" alt="Divider">
        </div>

        <!-- Contact information and QR code -->
        <div class="info-section">
          <!-- Contact information -->
          <div class="contact-details">
            <p class="detail-item">
              <span class="label">Issued To:</span>
              <strong class="value">Bob Hotel And Resturant</strong>
            </p>
            <p class="detail-item">
              <span class="label">Date of Creation:</span>
              <strong class="value">10 Feb 2023 At 10:45 AM</strong>
            </p>
            <p class="detail-item">
              <span class="label">Invoice No.</span>
              <strong class="value">BLL123566</strong>
            </p>
            <p class="detail-item">
              <span class="label">Printed On.</span>
              <strong class="value">10 Feb 2023 10:46 AM</strong>
            </p>
          </div>

          <!-- The QR code -->
          <div class="qr-code-container">
            <img src="../../../assets/images/invoice-assest/code-demo.png" alt="invoice QR Code">
          </div>
        </div>

        <!-- The table -->
        <table class="items-table">
          <thead>
            <tr>
              <th class="col-number">No.</th>
              <th class="col-description">Fee Description</th>
              <th class="col-amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row">
              <td class="col-number">1.</td>
              <td class="col-description">
                <p>General Retail Alcoholic Drink License (on License)</p>
              </td>
              <td class="col-amount">
                <strong>KES 5,000.00</strong>
              </td>
            </tr>
            <!-- Additional rows would go here -->
          </tbody>
        </table>

        <div class="blue-line">
          <img src="../../../assets/images/invoice-assest/blue-line.png" alt="Divider">
        </div>

        <!-- Billing details and summary -->
        <div class="summary-section">
          <table class="summary-table">
            <tbody>
              <tr>
                <td class="summary-label">Amount Billed:</td>
                <td class="summary-value"><strong>KES 5,000.00</strong></td>
              </tr>
              <tr>
                <td class="summary-label">Amount Paid</td>
                <td class="summary-value"><strong>KES 0.00</strong></td>
              </tr>
              <tr>
                <td class="summary-label">Payable Balance:</td>
                <td class="summary-value"><strong>KES 5,000.00</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- The page-footer starts here -->
      <div class="page-footer">
        <div class="footer-content">
          <div class="payment-options">
            <h2 class="payment-title">Payment Options</h2>
            <div class="payment-method">
              <p><strong>MPESA</strong></p>
              <p class="payment-detail">
                <span class="detail-label">Pay Bill No.</span>
                <strong class="detail-value">0434343</strong>
              </p>
              <p class="payment-detail">
                <span class="detail-label">Account Name</span>
                <strong class="detail-value">BLL100501472791</strong>
              </p>
              <p class="payment-detail">
                <span class="detail-label">Amount</span>
                <strong class="detail-value">KES 5,000</strong>
              </p>
            </div>
            
            <div class="payment-method">
              <p><strong>BANK</strong></p>
              <p class="payment-detail">
                <span class="detail-label">Bank</span>
                <strong class="detail-value">Any KCB Bank</strong>
              </p>
              <p class="payment-detail">
                <span class="detail-label">Amount</span>
                <strong class="detail-value">KES 5,000</strong>
              </p>
            </div>
          </div>

          <!-- Android logo section (hidden by default) -->
          <div class="android-section" style="display: none;">
            <div class="android-info">
              <img src="" alt="Android Logo">
              <span class="download-text">Scan to download the <br>Android App.</span>
            </div>
          </div>
        </div>

        <footer class="footer-bottom">
          <div class="footer-thanks">
            <span class="thanks-text">Thank You!</span>
            <img src="../../../assets/images/invoice-assest/blue-line.png" style="width: 100%;" alt="Divider">
          </div>
          <div class="footer-details">
            <p class="served-by">
              Served By <strong>Jane Doe</strong>
            </p>
            <p class="invoice-number">
              <strong>INVOICE NO. BLL100501472791</strong>
            </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Global styles */
* {
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  -webkit-print-color-adjust: exact !important;
  color-adjust: exact !important;
}

.bill-container {
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

/* Print button styles */
.print-btn {
  display: flex;
  z-index: 1000000000;
  position: fixed;
  background: #4aaa23;
  color: white;
  top: 30px;
  right: 30px;
  border-radius: 50%;
  padding: 1rem;
  margin: 0;
  border: none;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 0px 20px 4px rgba(136, 136, 136, 0.65);
  cursor: pointer;
  transition: 0.4s;
}

.print-btn:hover {
  transform: scale(1.05);
}

.email-doc {
  top: 130px;
  background: #0063c0;
}

.print-btn img {
  height: 35px;
  width: 35px;
}

/* Page layout */
.page {
  width: 210mm;
  min-height: 297mm;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: white;
  margin: 0 auto;
}

.page-content {
  padding: 8.5mm;
}

/* Header styles */
.header {
  display: flex;
  height: 47mm;
  align-items: center;
  position: relative;
  width: 100%;
  justify-content: space-between;
}

.logo img {
  height: 36mm;
  margin-right: 0;
}

.header-center {
  text-align: center;
  margin: 0 8.5mm;
}

.county-title {
  margin-top: 0;
  font-size: 26px;
  text-transform: uppercase;
  color: #4ca82c;
  font-weight: 700;
  margin-bottom: 1.2mm;
  padding-bottom: 0;
  line-height: 1.2;
}

.center-subtitle {
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 4.5mm;
}

.contact-info {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
}

.motto {
  padding: 0;
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
  margin-top: 2mm;
}

.motto-text {
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
  margin-right: 3mm;
}

.blue-line img {
  width: 100%;
  display: block;
}

/* Info section */
.info-section {
  display: flex;
  justify-content: space-between;
  margin-top: 6.3mm;
}

.contact-details {
  font-size: 12px;
  flex: 1;
}

.detail-item {
  padding: 0;
  margin: 0;
  padding-bottom: 1.5mm;
  text-transform: uppercase;
}

.detail-item:first-child {
  padding-top: 4.3mm;
}

.label {
  margin-right: 5px;
}

.value {
  text-transform: uppercase;
}

.qr-code-container {
  height: 25.3mm;
  margin-top: 3.3mm;
  width: 25.3mm;
  border: 2px solid #0045a1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-code-container img {
  height: 25mm;
  width: 25mm;
}

/* Table styles */
.items-table {
  margin-top: 6.3mm;
  border-spacing: 0;
  min-height: 70mm;
  width: 100%;
  border-collapse: collapse;
}

.items-table thead {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  background: #e2f2fd;
}

.items-table th {
  padding: 2.5mm;
  text-align: left;
  border: none;
}

.col-number {
  width: 20mm;
}

.col-description {
  width: auto;
}

.col-amount {
  width: 50mm;
  text-align: right !important;
}

.table-row td {
  padding: 2.5mm;
  border-bottom: 1px solid #80808029;
  font-size: 12px;
}

.col-amount strong {
  display: block;
}

/* Summary section */
.summary-section {
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
  margin-top: 3.3mm;
}

.summary-table {
  border-spacing: 0;
  text-transform: capitalize;
  font-size: 14px;
  width: auto;
}

.summary-table td {
  padding: 2.5mm;
  border-bottom: 1px solid #d9d9d9;
}

.summary-label {
  text-align: left;
}

.summary-value {
  text-align: right;
  min-width: 40mm;
}

.summary-table tr:last-child td {
  border-bottom: none;
}

/* page-footer styles */
.page-footer {
  padding: 8.5mm;
  width: 100%;
  background-color: #e2f2fd;
  flex-grow: 1;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.payment-options {
  font-size: 12px;
  padding-top: 3.3mm;
  flex: 1;
}

.payment-title {
  margin-top: 0;
  font-size: 18px;
  text-transform: uppercase;
  color: #0045a1;
  font-weight: 700;
  margin-bottom: 3.3mm;
  padding-bottom: 0;
}

.payment-method {
  margin-bottom: 10px;
}

.payment-method p {
  margin: 0;
  padding: 0;
}

.payment-detail {
  padding-bottom: 1mm;
  display: block;
}

.detail-label {
  display: inline-block;
  width: 100px;
}

.android-section {
  padding-top: 3.3mm;
  padding-left: 17.3mm;
}

.android-info {
  display: flex;
  margin-bottom: 4mm;
  justify-content: center;
  align-items: center;
}

.android-info img {
  margin-right: 3.3mm;
  height: 12mm;
}

.download-text {
  font-family: 'Yellowtail', cursive;
  color: #0045a1;
  line-height: 0.9;
  font-size: 20px;
}

/* Footer bottom */
.footer-bottom {
  position: relative;
  width: 100%;
  margin-top: auto;
}

.footer-thanks {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 10px;
}

.thanks-text {
  font-family: 'Yellowtail', cursive;
  color: #0045a1;
  line-height: 0.9;
  font-size: 20px;
  text-align: right;
}

.footer-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2mm;
  font-size: 12px;
}

.served-by, .invoice-number {
  padding-bottom: 10px;
  margin-bottom: 0;
  margin-top: 0;
}

/* Print styles */
@media print {
  .print-btn {
    display: none;
  }
  
  .bill-container {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .page {
    margin: 0;
    box-shadow: none;
  }
  
  @page {
    size: A4 portrait;
    margin: 0;
  }
}

/* Responsive adjustments */

</style>

<script setup>
// Component logic can be added here
const handlePrint = () => {
  window.print();
};
</script>