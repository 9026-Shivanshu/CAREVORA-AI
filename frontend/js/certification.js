"use strict";

ResumeBuilder.addCertification = function () {

    const container = this.elements.certificationContainer;

    if (!container) return;

    const html = `

    <div class="certification-item">

        <button
            type="button"
            class="remove-btn">
            ✖ Remove
        </button>

        <h3 class="certification-title"></h3>

        <div class="grid-2">

            <div class="form-group">
                <label>Certification Name</label>
                <input type="text" class="certificationName">
            </div>

            <div class="form-group">
                <label>Issued By</label>
                <input type="text" class="issuedBy">
            </div>

            <div class="form-group">
                <label>Issue Date</label>
                <input type="month" class="issueDate">
            </div>

            <div class="form-group">
                <label>Expiry Date</label>
                <input type="month" class="expiryDate">
            </div>

            <div class="form-group">
                <label>Credential ID</label>
                <input type="text" class="credentialId">
            </div>

            <div class="form-group">
                <label>Credential URL</label>
                <input type="url" class="credentialUrl">
            </div>

        </div>

    </div>

    `;

    container.insertAdjacentHTML("beforeend", html);

    this.updateCertificationNumbers();

    container.querySelectorAll(".remove-btn").forEach(button => {

        button.onclick = () => {

            this.removeItem(
                button,
                ".certification-item",
                ".certification-title",
                "Certification",
                this.updateCertificationsPreview
            );

            this.updateCertificationNumbers();

        };

    });

    this.updateCertificationsPreview();

};

ResumeBuilder.updateCertificationNumbers = function () {

    const cards =
        this.elements.certificationContainer.querySelectorAll(".certification-item");

    cards.forEach((card, index) => {

        card.querySelector(".certification-title").textContent =
            `Certification #${index + 1}`;

    });

};