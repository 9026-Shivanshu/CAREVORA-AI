"use strict";

ResumeBuilder.addExperience = function () {

    const container = this.elements.experienceContainer;

    if (!container) return;

    const html = `

    <div class="experience-item">

        <button
            type="button"
            class="remove-btn">
            ✖ Remove
        </button>

        <h3 class="experience-title"></h3>

        <div class="grid-2">

            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="jobTitle">
            </div>

            <div class="form-group">
                <label>Company Name</label>
                <input type="text" class="companyName">
            </div>

            <div class="form-group">
                <label>Employment Type</label>

                <select class="employmentType">
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                </select>

            </div>

            <div class="form-group">
                <label>Location</label>
                <input type="text" class="jobLocation">
            </div>

            <div class="form-group">
                <label>Start Date</label>
                <input type="month" class="startDate">
            </div>

            <div class="form-group">
                <label>End Date</label>
                <input type="month" class="endDate">
            </div>

        </div>

        <div class="form-group">

            <label>Description</label>

            <textarea
                class="jobDescription"
                rows="4"></textarea>

        </div>

    </div>

    `;

    container.insertAdjacentHTML("beforeend", html);

    this.updateExperienceNumbers();

    container.querySelectorAll(".remove-btn").forEach(button => {

        button.onclick = () => {

            this.removeItem(
                button,
                ".experience-item",
                ".experience-title",
                "Experience",
                this.updateExperiencePreview
            );

            this.updateExperienceNumbers();

        };

    });

    this.updateExperiencePreview();

};

ResumeBuilder.updateExperienceNumbers = function () {

    const cards =
        this.elements.experienceContainer.querySelectorAll(".experience-item");

    cards.forEach((card, index) => {

        let title =
            card.querySelector(".experience-title");

        title.textContent =
            `Experience #${index + 1}`;

    });

};