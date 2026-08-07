"use strict";

ResumeBuilder.addProject = function () {

    const container = this.elements.projectsContainer;

    if (!container) return;

    const html = `

<div class="project-item">

<button type="button" class="remove-btn">
✖ Remove
</button>

<h3 class="project-title"></h3>

<div class="grid-2">

<div class="form-group">
<label>Project Title</label>
<input type="text" class="projectName">
</div>

<div class="form-group">
<label>Project Type</label>

<select class="projectType">
<option>Academic</option>
<option>Personal</option>
<option>Freelance</option>
<option>Open Source</option>
</select>

</div>

<div class="form-group">
<label>Technologies Used</label>
<input type="text" class="projectTech">
</div>

<div class="form-group">
<label>Your Role</label>
<input type="text" class="projectRole">
</div>

<div class="form-group">
<label>Start Date</label>
<input type="month" class="projectStartDate">
</div>

<div class="form-group">
<label>End Date</label>
<input type="month" class="projectEndDate">
</div>

<div class="form-group">
<label>GitHub</label>
<input type="url" class="githubLink">
</div>

<div class="form-group">
<label>Live Demo</label>
<input type="url" class="liveDemo">
</div>

</div>

<div class="form-group">

<label>Description</label>

<textarea
rows="4"
class="projectDescription"></textarea>

</div>

<div class="form-group">

<label>Key Features</label>

<textarea
rows="3"
class="projectFeatures"></textarea>

</div>

</div>

`;

    container.insertAdjacentHTML("beforeend", html);

    this.updateProjectNumbers();

    container.querySelectorAll(".remove-btn").forEach(button => {

        button.onclick = () => {

            this.removeItem(
                button,
                ".project-item",
                ".project-title",
                "Project",
                this.updateProjectsPreview
            );

            this.updateProjectNumbers();

        };

    });

    this.updateProjectsPreview();

};

ResumeBuilder.updateProjectNumbers = function () {

    const cards =
        this.elements.projectsContainer.querySelectorAll(".project-item");

    cards.forEach((card, index) => {

        card.querySelector(".project-title").textContent =
            `Project #${index + 1}`;

    });

};