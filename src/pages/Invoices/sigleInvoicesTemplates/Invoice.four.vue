<template>
    <div class="bill-container">
        <button class="print-btn d-none" @click="handlePrint">
            <img src="" alt="Printer Icon">
        </button>
        <button class="print-btn email-doc d-none" title="send On Email">
            <img src="" alt="Printer Icon">
        </button>

        <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <img class="logo-icon" src="../../../assets/images/logo-light.png" alt="Logo Icon">
      </div>
      <div class="contact-bar">
        <div class="contact-item">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>1183 th Street, X1A 2R3</span>
        </div>
        <div class="contact-item">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <span>company@email.com</span>
        </div>
        <div class="contact-item">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span>+1-265-568-7742</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Section -->
     <div class="top-section-cont">
         <div class="top-section">
        <div class="agreement-box" style="border-bottom: 2px solid black;">
          <div class="agreement-title">Agreement</div>
          <div class="agreement-text">
            Lorem Ipsum is simply<br>
            dummy text of the printing.
          </div>
        </div>

        <div class="invoice-to-details">
            <div class="invoice-to-box">
          <div class="invoice-to-label">Invoice To:</div>
          <div class="invoice-to-name">William Winsor STD.</div>
          <div class="invoice-to-address">
            1183 th Street, Yellowknife,<br>
            Northwest Territories, X1A 2R3,<br>
            867-669-6119<br><br>
            www.company.com
          </div>
        </div>
        <div class="dates-box">
          <div class="date-item">
            <span class="date-label">Date</span>
            <span class="date-value">12 Jun 2019</span>
          </div>
          <div class="date-item">
            <span class="date-label">Issue</span>
            <span class="date-value">20 Jun 2019</span>
          </div>
        </div>
        </div>
       
      </div>

      <!-- Details Section -->
      <div class="details-section">
         <div class="invoice-title">INVOICE</div>
        
        <div class="account-box">
          <div>
            <div class="account-label">Account No.</div>
            <div class="account-value">987654321</div>
          </div>
          <div>
            <div class="total-due-label">TOTAL DUE</div>
            <div class="total-due-value">$ 7000.00</div>
          </div>
        </div>
      </div>
     </div>

      <!-- Table -->
      <table class="items-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Unit Price</th>
            <th>QTY</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="item-name">Editorial Design</div>
              <div class="item-desc">Lorem Ipsum is simply dummy text of the printing.</div>
            </td>
            <td>$ 400,00</td>
            <td>2</td>
            <td>$ 800,00</td>
          </tr>
          <tr>
            <td>
              <div class="item-name">Web Design</div>
              <div class="item-desc">Lorem Ipsum is simply dummy text of the printing.</div>
            </td>
            <td>$ 500,00</td>
            <td>1</td>
            <td>$ 500,00</td>
          </tr>
          <tr>
            <td>
              <div class="item-name">Motion Graphic</div>
              <div class="item-desc">Lorem Ipsum is simply dummy text of the printing.</div>
            </td>
            <td>$ 1000,00</td>
            <td>1</td>
            <td>$ 1000,00</td>
          </tr>
          <tr>
            <td>
              <div class="item-name">UI / UX</div>
              <div class="item-desc">Lorem Ipsum is simply dummy text of the printing.</div>
            </td>
            <td>$ 1000,00</td>
            <td>1</td>
            <td>$ 1000,00</td>
          </tr>
          <tr>
            <td>
              <div class="item-name">GRAPHIC DESIGN</div>
              <div class="item-desc">Lorem Ipsum is simply dummy text of the printing.</div>
            </td>
            <td>$ 1000,00</td>
            <td>1</td>
            <td>$ 1000,00</td>
          </tr>
        </tbody>
      </table>

      <!-- Bottom Section -->
      <div class="bottom-section">
        <div class="payment-method">
          <div class="payment-title">Payment Method</div>
          <div class="payment-text">
            <p style="margin: 0px; font-weight: bold;">Mpesa Paybill</p>
            <p style="margin: 0px;">Pay Bill Number <strong>12345</strong></p>
            <p>Account Name <strong>987654321</strong></p>
          </div>
        </div>
        <div class="subtotal-box">
          <div class="subtotal-row">
            <span class="subtotal-label">Subtotal</span>
            <span class="subtotal-value">$ 3300,00</span>
          </div>
          <div class="subtotal-row total-collections">
            <span class="subtotal-label">Subtotal</span>
            <span class="subtotal-value">$ 3300,00</span>
          </div>
        </div>
      </div>

      <!-- Signature Section -->
      <div class="signature-section">
        <div class="agreement-box" >
          <div class="agreement-title">Agreement</div>
          <div class="agreement-text">
            Lorem Ipsum is simply<br>
            dummy text of the printing.
          </div>
        </div>
        <div class="signature-box">
          <div class="signature d-none">William Winsor</div>
          <div class="signature-line" ></div>
          <div class="signature-name">William Winsor</div>
          <div class="signature-title">Manager</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="page-footer">
      <div class="footer-text">Thank you for your business</div>
    </div>
  </div>
    </div>
</template>
 <style scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Montserrat', sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background-color: #ffffff;
      font-size: 10pt;
      color: #333333;
      display: flex;
      flex-direction: column;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      border-bottom: 3px solid #3bb3a9;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .logo-icon {
      width:auto;
      height: 50px;
      color: #3bb3a9;
    }
    
    .logo-text {
      font-family: 'Satisfy', cursive;
      font-size: 32pt;
      font-weight: 400;
      color: #3bb3a9;
    }
    
    .contact-bar {
      display: flex;
      gap: 30px;
      font-size: 9pt;
      color: #666666;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-flow: column;
    }
    
    .contact-icon {
      width: 16px;
      height: 16px;
      color: #3bb3a9;
    }
    
    .main-content {
      flex: 1;
      padding: 20px 40px;
      display: flex;
      flex-direction: column;
    }
    
    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      gap: 30px;
      flex-grow: 1;
      margin-right: 130px;
    }
    
    .agreement-box {
      flex: 1;
    }

    .agreement-box:first-child {
      
      width: 100%;
      padding-bottom: 10px;
    }
    
    .agreement-title {
      font-size: 12pt;
      font-weight: 600;
      color: #333333;
      margin-bottom: 8px;
    }
    
    .agreement-text {
      font-size: 9pt;
      color: #666666;
      line-height: 1.5;
    }
    
    .invoice-title {
      font-size: 30pt;
      font-weight: 100;
      text-align: right;

    font-weight: 100;
    letter-spacing: 10px;
    }
    
    .details-section {
      display: flex;
      align-items: flex-start;
      padding-bottom: 0px;
      flex-flow: column;
    }
    
    .invoice-to-box {
      flex: 1;
    }
    
    .invoice-to-label {
      font-size: 9pt;
      color: #666666;
      margin-bottom: 4px;
    }
    
    .invoice-to-name {
      font-size: 11pt;
      font-weight: 600;
      color: #333333;
      margin-bottom: 12px;
    }
    
    .invoice-to-address {
      font-size: 9pt;
      color: #666666;
      line-height: 1.6;
    }
    
    .dates-box {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .date-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    
    .date-label {
      font-size: 9pt;
      font-weight: 600;
      color: #333333;
    }
    
    .date-value {
      font-size: 9pt;
      color: #666666;
    }
    
    .account-box {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width:100%;
      padding-top: 40px;
    }
    
    .account-label {
      font-size: 9pt;
      font-weight: 600;
      color: #333333;
    }
    
    .account-value {
      font-size: 9pt;
      color: #666666;
    }
    
    .total-due-label {
      font-size: 9pt;
      font-weight: 600;
      color: #333333;
    }
    
    .total-due-value {
      font-weight: 600;
      padding: 8px;
    background: #d9f0ee;
    margin-top: 15px;
    font-size: 21px;
    }
    
    .items-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .items-table thead th {
      background-color: #3D6263;
      padding: 12px 15px;
      font-weight: 600;
      font-size: 9pt;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-align: left;
    }
    
    .items-table thead th:nth-child(1) {
      width: 40%;
    }
    
    .items-table thead th:nth-child(2),
    .items-table thead th:nth-child(3) {
      width: 20%;
      text-align: center;
    }
    
    .items-table thead th:nth-child(4) {
      width: 20%;
      text-align: right;
    }
    
    .items-table tbody td {
      padding: 15px 15px;
      /* border-bottom: 1px solid #eeeeee; */
      /* vertical-align: top; */
    }
    
    .items-table tbody td:nth-child(2),
    .items-table tbody td:nth-child(3) {
      text-align: center;
      font-size: 10pt;
      color: #333333;
    }
    
    .items-table tbody td:nth-child(4) {
      text-align: right;
      font-size: 10pt;
      font-weight: 600;
      color: #333333;
    }

    .items-table tbody tr:nth-child(odd) td {
  background-color: #d9f0ee;
}
    
    .item-name {
      font-weight: 600;
      font-size: 10pt;
      color: #333333;
      margin-bottom: 4px;
    }
    
    .item-desc {
      font-size: 8pt;
      color: #888888;
      line-height: 1.4;
    }
    
    .bottom-section {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    
    .payment-method {
      flex: 1;
      padding-top: 10px;
    }
    
    .payment-title {
      font-size: 14pt;
      font-weight: 600;
      color: #3bb3a9;
      margin-bottom: 0px;
    }
    
    .payment-text {
      font-size: 9pt;
      color: #666666;
      line-height: 1.8;
    }
    
    .subtotal-box {
      display: flex;
      flex-direction: column;
      /* gap: 8px; */
      min-width: 200px;
    }
    
    .subtotal-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 15px;
      border-bottom: 1px solid #eeeeee;
    }
    
    .subtotal-label {
      font-size: 10pt;
      font-weight: 600;
      color: #333333;
    }
    
    .subtotal-value {
      font-size: 10pt;
      font-weight: 600;
      color: #333333;
    }
    
    .signature-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 30px;
    }
    
    .signature-box {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    
    .signature {
      font-family: 'Dancing Script', cursive;
      font-size: 32pt;
      color: #333333;
      margin-bottom: 5px;
    }
    
    .signature-name {
      font-size: 11pt;
      font-weight: 600;
      color: #333333;
    }
    
    .signature-title {
      font-size: 9pt;
      color: #666666;
    }
    
    .page-footer {
      background-color: #d9f0ee;
      padding: 20px 40px;
      text-align: center;
    }
    
    .footer-text {
      font-family: 'Playfair Display', serif;
      font-size: 16pt;
      font-weight: 600;
      color: #333333;
    }
    .invoice-to-details{
        display: flex;
        gap: 30px;
        flex-grow: 1;
        width: 100%;
    }
    .top-section-cont{
        display: flex;
        justify-content: space-between;
    }

    .total-collections{
        color: white;
        background: #3d6263;
    }
    .total-collections .subtotal-label, .total-collections .subtotal-value{
        color: white;
    }
    .signature-line{
        width: 150px;
        height: 1px;
        background: black;
        margin-bottom: 5px;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .page {
        width: 210mm;
        height: 297mm;
        margin: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
<script setup>
// Component logic can be added here
const handlePrint = () => {
    window.print();
};
</script>