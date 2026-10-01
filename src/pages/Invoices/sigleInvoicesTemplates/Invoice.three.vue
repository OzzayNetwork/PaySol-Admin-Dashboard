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
            <div class="page-content invoice-page">
                <!-- Header Section -->
                <header class="invoice-header">
                    <div class="business-name">
                        YOUR <span>BUSINESS</span>
                    </div>
                    <div class="tagline">YOUR BUSINESS TAGLINE</div>
                </header>

                <main class="invoice-body">
                    <!-- Left Column -->
                    <aside class="left-column">
                        <div class="logo-block">
                            <div class="logo w-100 d-flex justify-end align-end">
                                <img src="../../../assets/images/logo-light.png"  alt="" class="img w-100 h-auto" >
                            </div>
                        </div>

                        <div class="invoice-to">
                            <span class="invoice-to-label">Invoice To</span>
                            <span class="client-name">JAMES JACK</span>
                            <p class="address">
                                1183 th Street, Yellowknife,<br>
                                Northwest Territories,<br>
                                X1A 2R3, 867-669-6119
                            </p>
                        </div>

                        <div class="dates">
                            <span>Date : 23 / 12 / 2019</span>
                            <span>Issue : 02 / 10 / 2020</span>
                        </div>

                        <div class="payment-method">
                            <h4 class="payment-method-title">Payment Method</h4>
                            <p>Your Bank</p>
                            <p>Bank Account</p>
                            <p>Swift Code</p>
                            <p>Card Payment</p>
                            <p>Paypal</p>
                            <p>Master Card</p>
                            <p style="margin-top: 10px">Email : business@gmail.com</p>
                            <div class="payment-icons">
                                <span>PayPal</span>
                                <span class="visa">VISA</span>
                            </div>
                        </div>

                        <div class="terms-section">
                            <h4 class="terms-title">Term & Condition</h4>
                            <p class="terms-text">
                                Lorem ipsum dolor sit amet,
                                Ut wisi enim ad minim veniam,
                                quis nostrud exerci tation
                                ullamcorper suscipit lobortis
                                nisl ut aliquip ex ea commodo
                                consequat.
                            </p>
                            <p class="terms-text">
                                Duis autem vel eum iriure
                                dolor in hendrerit in vulputate
                                velit esse molestie consequat,
                                vel illum dolore eu feugiat
                                nulla facilisis at vero eros et
                                accumsan et iusto odio
                                dignissim.
                            </p>
                        </div>
                    </aside>

                    <!-- Right Column -->
                    <section class="right-column">
                        <div class="invoice-title-section">
                            <h1 class="invoice-title">INVOICE</h1>
                            <div class="account-info">
                                <p>Invoice No.</p>
                                <p>987654321</p>
                            </div>
                        </div>

                        <div class="gold-divider"></div>

                        <div class="project-description">
                            <h3 class="project-title">Project Description</h3>
                            <p class="project-text">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
                                veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                                commodo consequat.
                            </p>
                        </div>

                        <div class="items-table">
                            <div class="table-header">
                                <div class="col-description">Description</div>
                                <div class="col-unit-price">Unit Price</div>
                                <div class="col-qty">Qty</div>
                                <div class="col-cost">Cost</div>
                            </div>

                            <div class="table-row">
                                <div class="col-description">
                                    <div class="item-info">
                                        <span class="item-name">Sketch</span>
                                        <span class="item-desc">Lorem Ipsum is simply dummy text of the printing.</span>
                                    </div>
                                </div>
                                <div class="col-unit-price">$ 400,00</div>
                                <div class="col-qty">2</div>
                                <div class="col-cost">$ 800,00</div>
                            </div>

                            <div class="table-row">
                                <div class="col-description">
                                    <div class="item-info">
                                        <span class="item-name">Graphic Design</span>
                                        <span class="item-desc">Lorem Ipsum is simply dummy text of the printing.</span>
                                    </div>
                                </div>
                                <div class="col-unit-price">$ 500,00</div>
                                <div class="col-qty">1</div>
                                <div class="col-cost">$ 800,00</div>
                            </div>

                            <div class="table-row">
                                <div class="col-description">
                                    <div class="item-info">
                                        <span class="item-name">Web Design</span>
                                        <span class="item-desc">Lorem Ipsum is simply dummy text of the printing.</span>
                                    </div>
                                </div>
                                <div class="col-unit-price">$ 1000,00</div>
                                <div class="col-qty">1</div>
                                <div class="col-cost">$ 500,00</div>
                            </div>

                            <div class="table-row">
                                <div class="col-description">
                                    <div class="item-info">
                                        <span class="item-name">Web Development</span>
                                        <span class="item-desc">Lorem Ipsum is simply dummy text of the printing.</span>
                                    </div>
                                </div>
                                <div class="col-unit-price">$ 1000,00</div>
                                <div class="col-qty">2</div>
                                <div class="col-cost">$ 1000,00</div>
                            </div>

                            <div class="table-row">
                                <div class="col-description">
                                    <div class="item-info">
                                        <span class="item-name">Marketing</span>
                                        <span class="item-desc">Lorem Ipsum is simply dummy text of the printing.</span>
                                    </div>
                                </div>
                                <div class="col-unit-price">$ 1000,00</div>
                                <div class="col-qty">1</div>
                                <div class="col-cost">$ 2000,00</div>
                            </div>

                            <div class="table-row">
                                <div class="col-description">
                                    <div class="item-info">
                                        <span class="item-name">Marketing</span>
                                        <span class="item-desc">Lorem Ipsum is simply dummy text of the printing.</span>
                                    </div>
                                </div>
                                <div class="col-unit-price">$ 1000,00</div>
                                <div class="col-qty">1</div>
                                <div class="col-cost">$ 2000,00</div>
                            </div>
                        </div>

                        <div class="summary-section">
                            <div class="summary-row">
                                <span>Subtotal price</span>
                                <span>$ 2000,00</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total price</span>
                                <span>$ 2000,00</span>
                            </div>
                        </div>

                        <div class="signature-section">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                                <span class="signature">Jasmine Adelia</span>
                                <span class="signer-name">Jasmine Adelia</span>
                                <span class="signer-title">Manager</span>
                            </div>
                        </div>
                    </section>
                </main>
                <!-- Sidebar vertical text -->
                <div class="sidebar-text">WWW.YOURBUSINESS.COM</div>
                <div class="the-vert-line"></div>

                <!-- Footer cream section -->
                <footer class="footer-section"></footer>








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

.invoice-page {
    width: 210mm;
    min-height: 297mm;
    background: #ffffff;
    color: #2d2d2d;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
}

.invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background: #fdf8ed;
}

.business-name {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
}

.business-name span {
    color: #d4a84b;
    font-weight: 700;
}

.tagline {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #888;
}

.invoice-body {
    display: flex;
    flex: 1;
    padding: 30px 0;
}

.left-column {
    width: 200px;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding-left: 50px;
    padding-right: 10px;
}

.logo-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.logo {
    width: 70px;
    display: flex;
    align-items: center;
}

.logo svg {
    width: 100%;
    height: 100%;
}

.invoice-to {
    display: flex;
    flex-direction: column;
}

.invoice-to-label {
    font-size: 11px;
    font-weight: 400;
    color: #666;
}

.client-name {
    font-size: 14px;
    font-weight: 700;
    color: #d4a84b;
    letter-spacing: 1px;
}

.address {
    font-size: 10px;
    line-height: 1.7;
    color: #555;
    margin-top: 10px;
}

.dates {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 11px;
}

.dates span {
    color: #555;
}

.payment-method {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.payment-method-title {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 5px;
}

.payment-method p {
    font-size: 10px;
    color: #555;
    line-height: 1.5;
}

.payment-icons {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
}

.payment-icons span {
    font-size: 11px;
    font-weight: 600;
    color: #003087;
}

.payment-icons .visa {
    color: #1a1f71;
    font-style: italic;
    font-weight: 700;
}

.terms-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.terms-title {
    font-size: 13px;
    font-weight: 700;
}

.terms-text {
    font-size: 9px;
    line-height: 1.7;
    color: #555;
}

.right-column {
    flex: 1;
    padding: 0 40px 0 20px;
    /* display: flex; */
    flex-direction: column;
}

.invoice-title-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}

.invoice-title {
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 10px;
    color: #d4a84b;
}

.account-info {
    text-align: right;
    font-size: 11px;
}

.account-info p:first-child {
    color: #888;
}

.account-info p:last-child {
    font-weight: 700;
    font-size: 14px;
}

.gold-divider {
    width: 100%;
    height: 3px;
    background: #d4a84b;
    margin-bottom: 25px;
}

.project-description {
    margin-bottom: 25px;
}

.project-title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
}

.project-text {
    font-size: 10px;
    line-height: 1.8;
    color: #555;
}

.items-table {
    display: flex;
    flex-direction: column;
    margin-bottom: 0px;
}

.table-header {
    display: flex;
    padding: 10px 0;
    border-bottom: 2px solid grey;
    border-top: 2px solid grey;
    font-size: 14px;
    font-weight: 600;
}

.col-description {
    flex: 2;
}

.col-unit-price {
    flex: 1;
    text-align: center;
}

.col-qty {
    flex: 0.5;
    text-align: center;
}

.col-cost {
    flex: 1;
    text-align: right;
}

.table-row {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #e0e0e0;
    align-items: flex-start;
}

.item-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.item-name {
    font-size: 11px;
    font-weight: 600;
}

.item-desc {
    font-size: 9px;
    color: #888;
}

.table-row .col-unit-price,
.table-row .col-qty,
.table-row .col-cost {
    font-size: 11px;
    padding-top: 3px;
}

.summary-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 0px;
    margin-bottom: 30px;
    border-bottom: 2px solid black;
    border-top: 2px solid black;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    width: 200px;
    padding: 8px 0;
    font-size: 12px;
    gap: 20px;
}

.summary-row.total {
    font-weight: 700;
}

.signature-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: auto;
}

.signature {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 36px;
    color: #2d2d2d;
    margin-bottom: 5px;
}

.signer-name {
    font-size: 12px;
    font-weight: 700;
}

.signer-title {
    font-size: 10px;
    color: #888;
}

.sidebar-text {
    position: absolute;
    left: 10px;
    bottom: 120mm;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    font-size: 8px;
    letter-spacing: 2px;
    color: #888;
}

.footer-section {
    background: #fdf8ed;
    height: 80px;
    width: 100%;
}
.the-vert-line{
    position: absolute;
    left: 30px;
    bottom: 0px;
    top: 0px;
    width: 1.5px;
    height: 100%;
    background: black;
}

@media print {
    body {
        background: white;
        padding: 0;
    }

    .invoice-page {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 0;
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