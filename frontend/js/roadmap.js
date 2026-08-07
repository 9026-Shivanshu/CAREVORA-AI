// ======================================
// PATHLY AI
// Career Roadmap
// ======================================

// Get Elements

const generateBtn = document.getElementById("generateRoadmap");

const careerSelect = document.getElementById("careerSelect");

const roadmapContainer = document.getElementById("roadmapContainer");

// ======================================
// Generate Roadmap Button
// ======================================

generateBtn.addEventListener("click", () => {

    const career = careerSelect.value;

    if (career === "") {

        alert("Please select a career.");

        return;

    }

    generateRoadmap(career);
saveRoadmap(career);
});

// ======================================
// Generate Roadmap Function
// ======================================

function generateRoadmap(career) {

    switch (career) {

        case "frontend":

            showFrontendRoadmap();

            break;

        case "backend":

            showBackendRoadmap();

            break;

        case "fullstack":

            showFullStackRoadmap();

            break;

        case "java":

            showJavaRoadmap();

            break;

        case "python":

            showPythonRoadmap();

            break;

        case "datascience":

            showDataScienceRoadmap();

            break;

        case "aiml":

            showAIMLRoadmap();

            break;

        case "cyber":

            showCyberRoadmap();

            break;

        default:

            roadmapContainer.innerHTML = `
                <h2>No Roadmap Found</h2>
            `;

    }

}
// ======================================
// Frontend Roadmap
// ======================================

function showFrontendRoadmap() {

    roadmapContainer.innerHTML = `

    <h2>Frontend Developer Roadmap</h2>

    <div class="timeline">

        <div class="timeline-item">

            <span class="badge">Step 1</span>

            <h3>HTML & CSS</h3>

            <p>Learn HTML5, CSS3, Flexbox, Grid, Responsive Design and Semantic HTML.</p>

            <div class="skill-list">

                <span class="skill">HTML5</span>

                <span class="skill">CSS3</span>

                <span class="skill">Flexbox</span>

                <span class="skill">Grid</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 2</span>

            <h3>JavaScript</h3>

            <p>Master JavaScript ES6+, DOM, Events, Fetch API, Async/Await.</p>

            <div class="skill-list">

                <span class="skill">JavaScript</span>

                <span class="skill">DOM</span>

                <span class="skill">ES6</span>

                <span class="skill">API</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 3</span>

            <h3>Framework</h3>

            <p>Learn React.js, Routing, State Management and Component Design.</p>

            <div class="skill-list">

                <span class="skill">React</span>

                <span class="skill">Hooks</span>

                <span class="skill">Redux</span>

                <span class="skill">Router</span>

            </div>

        </div>

    </div>

    `;

}

// ======================================
// Backend Roadmap
// ======================================

function showBackendRoadmap() {

    roadmapContainer.innerHTML = `

    <h2>Backend Developer Roadmap</h2>

    <div class="timeline">

        <div class="timeline-item">

            <span class="badge">Step 1</span>

            <h3>Node.js</h3>

            <p>Learn Node.js fundamentals, npm and package management.</p>

            <div class="skill-list">

                <span class="skill">Node.js</span>

                <span class="skill">NPM</span>

                <span class="skill">Modules</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 2</span>

            <h3>Express.js</h3>

            <p>Build REST APIs, Routing, Middleware and Authentication.</p>

            <div class="skill-list">

                <span class="skill">Express</span>

                <span class="skill">REST API</span>

                <span class="skill">JWT</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 3</span>

            <h3>Database</h3>

            <p>Learn MongoDB, Mongoose, CRUD Operations and Aggregation.</p>

            <div class="skill-list">

                <span class="skill">MongoDB</span>

                <span class="skill">Mongoose</span>

                <span class="skill">CRUD</span>

            </div>

        </div>

    </div>

    `;

}
// ======================================
// Full Stack Roadmap
// ======================================

function showFullStackRoadmap() {

    roadmapContainer.innerHTML = `

    <h2>Full Stack Developer Roadmap</h2>

    <div class="timeline">

        <div class="timeline-item">

            <span class="badge">Step 1</span>

            <h3>Frontend Development</h3>

            <p>Learn HTML, CSS, JavaScript and React.js to build modern user interfaces.</p>

            <div class="skill-list">

                <span class="skill">HTML</span>
                <span class="skill">CSS</span>
                <span class="skill">JavaScript</span>
                <span class="skill">React</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 2</span>

            <h3>Backend Development</h3>

            <p>Learn Node.js, Express.js, REST APIs and Authentication.</p>

            <div class="skill-list">

                <span class="skill">Node.js</span>
                <span class="skill">Express</span>
                <span class="skill">JWT</span>
                <span class="skill">REST API</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 3</span>

            <h3>Database & Deployment</h3>

            <p>Learn MongoDB, Git, GitHub and deploy your applications.</p>

            <div class="skill-list">

                <span class="skill">MongoDB</span>
                <span class="skill">Git</span>
                <span class="skill">GitHub</span>
                <span class="skill">Deployment</span>

            </div>

        </div>

    </div>

    `;

}

// ======================================
// Java Developer Roadmap
// ======================================

function showJavaRoadmap() {

    roadmapContainer.innerHTML = `

    <h2>Java Developer Roadmap</h2>

    <div class="timeline">

        <div class="timeline-item">

            <span class="badge">Step 1</span>

            <h3>Core Java</h3>

            <p>Learn Java syntax, OOP, Collections, Exception Handling and File Handling.</p>

            <div class="skill-list">

                <span class="skill">Java</span>
                <span class="skill">OOP</span>
                <span class="skill">Collections</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 2</span>

            <h3>Advanced Java</h3>

            <p>Learn JDBC, Servlets, JSP and Maven.</p>

            <div class="skill-list">

                <span class="skill">JDBC</span>
                <span class="skill">Servlet</span>
                <span class="skill">JSP</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 3</span>

            <h3>Spring Boot</h3>

            <p>Build REST APIs using Spring Boot, Spring Security and Hibernate.</p>

            <div class="skill-list">

                <span class="skill">Spring Boot</span>
                <span class="skill">Hibernate</span>
                <span class="skill">REST API</span>

            </div>

        </div>

    </div>

    `;

}

// ======================================
// Python Developer Roadmap
// ======================================

function showPythonRoadmap() {

    roadmapContainer.innerHTML = `

    <h2>Python Developer Roadmap</h2>

    <div class="timeline">

        <div class="timeline-item">

            <span class="badge">Step 1</span>

            <h3>Python Basics</h3>

            <p>Learn Python syntax, loops, functions, OOP and file handling.</p>

            <div class="skill-list">

                <span class="skill">Python</span>
                <span class="skill">OOP</span>
                <span class="skill">Functions</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 2</span>

            <h3>Frameworks</h3>

            <p>Learn Flask or Django for backend web development.</p>

            <div class="skill-list">

                <span class="skill">Flask</span>
                <span class="skill">Django</span>
                <span class="skill">REST API</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 3</span>

            <h3>Database & Deployment</h3>

            <p>Learn MySQL, PostgreSQL, Git and deployment on cloud platforms.</p>

            <div class="skill-list">

                <span class="skill">MySQL</span>
                <span class="skill">Git</span>
                <span class="skill">Cloud</span>

            </div>

        </div>

    </div>

    `;

}
// ======================================
// Data Science Roadmap
// ======================================

function showDataScienceRoadmap() {

    roadmapContainer.innerHTML = `

    <h2>Data Science Roadmap</h2>

    <div class="timeline">

        <div class="timeline-item">

            <span class="badge">Step 1</span>

            <h3>Python & Mathematics</h3>

            <p>Learn Python, Statistics, Probability and Linear Algebra.</p>

            <div class="skill-list">

                <span class="skill">Python</span>
                <span class="skill">Statistics</span>
                <span class="skill">Probability</span>
                <span class="skill">Linear Algebra</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 2</span>

            <h3>Data Analysis</h3>

            <p>Learn NumPy, Pandas, Data Visualization and SQL.</p>

            <div class="skill-list">

                <span class="skill">NumPy</span>
                <span class="skill">Pandas</span>
                <span class="skill">SQL</span>
                <span class="skill">Matplotlib</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 3</span>

            <h3>Machine Learning</h3>

            <p>Learn Scikit-Learn, Model Building and Data Projects.</p>

            <div class="skill-list">

                <span class="skill">Scikit-Learn</span>
                <span class="skill">Machine Learning</span>
                <span class="skill">Projects</span>

            </div>

        </div>

    </div>

    `;

}

// ======================================
// AI / Machine Learning Roadmap
// ======================================

function showAIMLRoadmap() {

    roadmapContainer.innerHTML = `

    <h2>AI / Machine Learning Roadmap</h2>

    <div class="timeline">

        <div class="timeline-item">

            <span class="badge">Step 1</span>

            <h3>Programming Foundation</h3>

            <p>Learn Python, Mathematics, Statistics and Data Structures.</p>

            <div class="skill-list">

                <span class="skill">Python</span>
                <span class="skill">Math</span>
                <span class="skill">Statistics</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 2</span>

            <h3>Machine Learning</h3>

            <p>Study Regression, Classification, Clustering and Model Evaluation.</p>

            <div class="skill-list">

                <span class="skill">Scikit-Learn</span>
                <span class="skill">Regression</span>
                <span class="skill">Classification</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 3</span>

            <h3>Deep Learning</h3>

            <p>Learn TensorFlow, PyTorch, CNN, RNN and Generative AI.</p>

            <div class="skill-list">

                <span class="skill">TensorFlow</span>
                <span class="skill">PyTorch</span>
                <span class="skill">Deep Learning</span>

            </div>

        </div>

    </div>

    `;

}

/// ======================================
// Cyber Security Roadmap
// ======================================

function showCyberRoadmap() {

    roadmapContainer.innerHTML = `

    <h2>Cyber Security Roadmap</h2>

    <div class="timeline">

        <div class="timeline-item">

            <span class="badge">Step 1</span>

            <h3>Networking Fundamentals</h3>

            <p>Learn Computer Networks, TCP/IP, OSI Model, DNS, HTTP/HTTPS and Linux basics.</p>

            <div class="skill-list">

                <span class="skill">Networking</span>
                <span class="skill">TCP/IP</span>
                <span class="skill">OSI Model</span>
                <span class="skill">Linux</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 2</span>

            <h3>Security Fundamentals</h3>

            <p>Understand Cryptography, Firewalls, Authentication, Vulnerabilities and OWASP Top 10.</p>

            <div class="skill-list">

                <span class="skill">Cryptography</span>
                <span class="skill">Firewalls</span>
                <span class="skill">OWASP</span>
                <span class="skill">Authentication</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 3</span>

            <h3>Ethical Hacking</h3>

            <p>Learn Penetration Testing, Kali Linux, Wireshark, Burp Suite and Security Auditing.</p>

            <div class="skill-list">

                <span class="skill">Kali Linux</span>
                <span class="skill">Wireshark</span>
                <span class="skill">Burp Suite</span>
                <span class="skill">Pen Testing</span>

            </div>

        </div>

        <div class="timeline-item">

            <span class="badge">Step 4</span>

            <h3>Projects & Certifications</h3>

            <p>Practice on TryHackMe, Hack The Box and prepare for Security+, CEH or CISSP certifications.</p>

            <div class="skill-list">

                <span class="skill">TryHackMe</span>
                <span class="skill">Hack The Box</span>
                <span class="skill">Security+</span>
                <span class="skill">CEH</span>

            </div>

        </div>

    </div>

    `;

}
// ======================================
// Save Roadmap to MongoDB
// ======================================

async function saveRoadmap(career){

    try{

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/roadmap/save",{

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                "Authorization":`Bearer ${token}`

            },

            body:JSON.stringify({

                career:career

            })

        });

        const data = await response.json();

        console.log("Roadmap Saved:",data);

    }

    catch(error){

        console.error("Roadmap Error:",error);

    }

}