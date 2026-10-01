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
                <!-- Header Section -->
                <header
                    style="position: relative; z-index: 1; padding: 32px 40px; display: flex; justify-content: space-between; gap: 32px;">

                    <!-- Left Side - Logo & Contact -->
                    <div style="flex: 1;  border-right: 1px solid #6D6E71;">

                        <!-- Logo -->
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                            <div>
                                <img src="../../../assets/images/logo-light.png" class="img-responsive" alt="Image"
                                    style="height: 50px;">

                            </div>

                        </div>

                        <!-- Contact Info -->
                        <div style="margin-top: 16px;">

                            <!-- Location -->
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 30px;">
                                <div class="avatar-xs ">
                                    <div>
                                        <span class="avatar-title rounded-circle  font-size-16"
                                            style="height: 32px; width: 32px; display: flex; align-items: center; justify-content: center; background-color: #6D6E71;">
                                            <i class="mdi mdi-twitter text-white"></i>
                                        </span>
                                    </div>
                                </div>

                                <div style="font-size: 11px; color: #718096; ">
                                    <p style="margin: 0;">Delata Riverside, Office number XXX wing two, Nairobi Kenya</p>

                                </div>
                            </div>

                            <!-- Phone & Web -->
                            <div style="display: flex; gap: 24px;">
                                <div style="display: flex; align-items: flex-start; gap: 8px;">
                                    <div class="avatar-xs ">
                                        <div>
                                            <span class="avatar-title rounded-circle  font-size-16"
                                                style="height: 32px; width: 32px; display: flex; align-items: center; justify-content: center; background-color: #6D6E71;">
                                                <i class="mdi mdi-phone text-white"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div style="font-size: 11px; color: #718096; line-height: 1.5;">
                                        <p style="margin: 0;">+6125 3739400</p>
                                        <p style="margin: 0;">+8293 3484707</p>
                                    </div>
                                </div>

                                <div style="display: flex; align-items: flex-start; gap: 8px;">
                                    <div class="avatar-xs ">
                                        <div>
                                            <span class="avatar-title rounded-circle  font-size-16"
                                                style="height: 32px; width: 32px; display: flex; align-items: center; justify-content: center; background-color: #6D6E71;">
                                                <i class="mdi mdi-web text-white"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div style="font-size: 11px; color: #718096; line-height: 1.5;">
                                        <p style="margin: 0;">www.yourbusiness.com</p>
                                        <p style="margin: 0;">yourbusiness@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side - Invoice Title & Details -->
                    <div style="text-align: left;">
                        <h1
                            style="font-family: 'Montserrat', sans-serif; font-size: 40px; font-weight: 800; letter-spacing: 4px; color: #b8956b; margin: 0 0 16px 0; line-height: 1;">
                            INVOICE</h1>

                        <div style="text-align: left;">
                            <div style="margin-bottom: 12px;">
                                <span
                                    style="display: block; font-size: 14px; color: #718096; margin-bottom: 2px; font-weight: bolder; color: black;">Invoice
                                    No.</span>
                                <span
                                    style="display: block; font-size: 14px; color: #2d3748; font-weight: 500;">987654321</span>
                            </div>

                            <div style="margin-bottom: 12px;">
                                <span
                                    style="display: block; font-size: 11px; color: #718096; margin-bottom: 2px;">Invoice
                                    To:</span>
                                <span style="display: block; font-size: 15px; color: #2d3748; font-weight: 700;">Mr.
                                    Alexander Marvel</span>
                            </div>

                            <div style="margin-top: 16px;">
                                <div
                                    style="display: flex; justify-content: space-between; gap: 4px; margin-bottom: 4px; font-size: 12px;">
                                    <span style="color: #718096;">Date</span>
                                    <span style="color: #2d3748; font-weight: 500;"> 23 / 12 / 2019</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; gap: 4px; font-size: 12px;">
                                    <span style="color: #718096;">Issue</span>
                                    <span style="color: #2d3748; font-weight: 500; text-align: rig;">02 / 10 /
                                        2020</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main style="position: relative; z-index: 1; padding: 0px 40px 32px; flex: 1;">

                    <!-- Items Table -->
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 0cm;">
                        <thead>
                            <tr
                                style="border-top:2px solid #b8956b; border-bottom: 2px solid #b8956b; background-color: #c0c0c04f;">
                                <th
                                    style="background: transparent; color: black; padding: 12px 16px; text-align: left; font-weight: 600; font-size: 13px; border: none; width: 45%;">
                                    Description</th>
                                <th
                                    style="background: transparent; color: black; padding: 12px 16px; text-align: center; font-weight: 600; font-size: 13px; border: none; width: 20%;">
                                    Unit Price</th>
                                <th
                                    style="background: transparent; color: black; padding: 12px 16px; text-align: center; font-weight: 600; font-size: 13px; border: none; width: 10%;">
                                    Qty</th>
                                <th
                                    style="background: transparent; color: black; padding: 12px 16px; text-align: right; font-weight: 600; font-size: 13px; border: none; width: 25%;">
                                    Cost</th>
                            </tr>
                        </thead>
                        <tbody style="border-bottom: 2px solid #b8956b;">
                            <tr style="border-bottom: 1px solid rgba(226,232,240,0.5);">
                                <td style="padding: 10px 16px; color: #2d3748; vertical-align: top;">
                                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Sketch</div>
                                    <div style="font-size: 11px; color: #718096;">Lorem Ipsum is simply dummy text of
                                        the printing.</div>
                                </td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">$
                                    400,00</td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">2
                                </td>
                                <td style="padding: 10px 16px; text-align: right; font-size: 14px; color: #2d3748;">$
                                    800,00</td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(226,232,240,0.5);">
                                <td style="padding: 10px 16px; color: #2d3748; vertical-align: top;">
                                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Graphic Design
                                    </div>
                                    <div style="font-size: 11px; color: #718096;">Lorem Ipsum is simply dummy text of
                                        the printing.</div>
                                </td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">$
                                    500,00</td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">1
                                </td>
                                <td style="padding: 10px 16px; text-align: right; font-size: 14px; color: #2d3748;">$
                                    800,00</td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(226,232,240,0.5);">
                                <td style="padding: 10px 16px; color: #2d3748; vertical-align: top;">
                                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Web Design</div>
                                    <div style="font-size: 11px; color: #718096;">Lorem Ipsum is simply dummy text of
                                        the printing.</div>
                                </td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">$
                                    1000,00</td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">1
                                </td>
                                <td style="padding: 10px 16px; text-align: right; font-size: 14px; color: #2d3748;">$
                                    500,00</td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(226,232,240,0.5);">
                                <td style="padding: 10px 16px; color: #2d3748; vertical-align: top;">
                                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Web Development
                                    </div>
                                    <div style="font-size: 11px; color: #718096;">Lorem Ipsum is simply dummy text of
                                        the printing.</div>
                                </td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">$
                                    1000,00</td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">2
                                </td>
                                <td style="padding: 10px 16px; text-align: right; font-size: 14px; color: #2d3748;">$
                                    1000,00</td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(226,232,240,0.5);">
                                <td style="padding: 10px 16px; color: #2d3748; vertical-align: top;">
                                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Marketing</div>
                                    <div style="font-size: 11px; color: #718096;">Lorem Ipsum is simply dummy text of
                                        the printing.</div>
                                </td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">$
                                    1000,00</td>
                                <td style="padding: 10px 16px; text-align: center; font-size: 14px; color: #2d3748;">1
                                </td>
                                <td style="padding: 10px 16px; text-align: right; font-size: 14px; color: #2d3748;">$
                                    2000,00</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Bottom Section - Payment & Totals -->
                    <div
                        style="display: flex; justify-content: space-between; gap: 32px; margin-bottom: 32px; margin-top: 0px;">

                        <!-- Left - Payment Method -->
                        <div style="flex: 1; margin-top: 15px;">
                            <h3
                                style="font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700; color: #2d3748; margin: 0 0 12px 0;">
                                Payment Method</h3>
                            <div style="font-size: 12px; color: #718096; line-height: 1.6; margin-bottom: 12px;">
                                <p style="margin: 0;"><strong>MPESA PAYBILL</strong></p>
                                <p style="margin: 0;">MPESA Paybill No. <strong>12345678</strong></p>
                                <p style="margin: 0;">Account Name <strong>987654321</strong></p>
                            </div>
                            <p style="font-size: 12px; color: #718096; margin: 0 0 12px 0;">Email : business@gmail.com
                            </p>
                            <div style="display: flex; gap: 12px;">
                                <span
                                    style="font-size: 11px; font-weight: 700; color: #2563eb; font-style: italic;">PayPal</span>
                                <span
                                    style="font-size: 11px; font-weight: 700; color: #1e3a8a; letter-spacing: 1px;">VISA</span>
                            </div>
                        </div>

                        <!-- Right - Totals -->
                        <div style="width: 400px; background-color: #c0c0c04f; height: fit-content; display: flex; justify-content: space-between; ;">
                            <div style="padding: 8px; background-color: #b8956b;">
                                <span style="font-weight: bold;color: white; text-transform: uppercase; font-size: 11px; text-align: center;">Scan To Pay</span>
                                <div
                                    style="width: 80px; height: 80px; background-color: white;  display: flex; justify-content: center; align-items: center; margin-top: 8px;">
                                    <img src="../../../assets/images/invoice-assest/code-demo.png" alt="QR Code"
                                        style="width: 75px; height: 75px;">
                                    </div>
                            </div>
                            <div style="text-wrap: nowrap; flex-grow: 1; display: flex; flex-direction: column;">
                                <div
                                    style="display: flex; justify-content: space-between; padding: 8px 15px; border-bottom: 1px solid rgba(226,232,240,0.5); font-size: 14px; gap: 30px;">
                                    <span style="color: black;">Subtotal price</span>
                                    <span style="font-weight: 600; color: #2d3748;">$ 2000,00</span>
                                </div>
                                <div
                                    style="display: flex; justify-content: space-between; padding: 8px 15px; border-bottom: 1px solid rgba(226,232,240,0.5); font-size: 14px;">
                                    <span style="color: black;">Tax</span>
                                    <span style="font-weight: 600; color: #2d3748;">$ 200,00</span>
                                </div>
                                <div
                                    style="display: flex; justify-content: space-between; padding: 12px 16px; background: #b8956b; color: white; margin-top: 0px; font-size: 14px; flex-grow: 1;">
                                    <span style="font-weight: 700;">Total price</span>
                                    <span style="font-weight: 700;">$ 2300,00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Terms & Signature -->
                    <div style="display: flex; justify-content: space-between; gap: 32px; margin-top: 16px;">

                        <!-- Terms -->
                        <div style="flex: 1; ">
                            <h3
                                style="font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700; color: #2d3748; margin: 0 0 8px 0;">
                                Term & Condition</h3>
                            <p style="font-size: 11px; color: #718096; line-height: 1.6; margin: 0 0 16px 0;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rutrum gravida turpis.
                                Nunc dictum, leo non blandit pharetra, erat arcu viverra libero.
                            </p>
                            <p style="font-size: 13px; font-weight: 600; color: #b8956b; margin: 0;">
                                www.yourbusiness.com</p>
                        </div>

                        <!-- Signature -->
                        <div style="text-align: center; min-width: 180px;">
                            <div
                                style="font-family: 'Dancing Script', cursive; font-size: 12px; color: #2d3748; margin-bottom: 4px;">
                                Jasmine Adelia</div>
                            <div style="width: 150px; height: 1px; background: #2d3748; margin: 0 auto 8px;"></div>
                            <p
                                style="font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 600; color: #2d3748; margin: 0;">
                                Jasmine Adelia</p>
                            <p style="font-size: 11px; color: #718096; margin: 2px 0 0 0;">Manager</p>
                        </div>
                    </div>
                </main>
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
    background-color:white;   
    margin: 0 auto;
    background-image: url("../../../assets/images/invoice-assest/bg-2.svg");
}
.page main,.page header{
    background-color: white;
}

.page main {
    flex: 1;
    display: flex;
    flex-flow: column;
}

.page-content {
    padding: 8mm;
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

.served-by,
.invoice-number {
    padding-bottom: 10px;
    margin-bottom: 0;
    margin-top: 0;
}

.page-content{
    height:100%
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
</style>

<script setup>
// Component logic can be added here
const handlePrint = () => {
    window.print();
};
</script>