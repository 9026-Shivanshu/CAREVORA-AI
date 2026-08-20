const analyzeBtn = document.getElementById('analyzeBtn');
const generateJDBtn = document.getElementById('generateJDBtn');
const clearJDBtn = document.getElementById('clearJDBtn');
const jobDescription = document.getElementById('jobDescription');
analyzeBtn.addEventListener('click', async () => {

  const role = document.getElementById('targetRole').value;
  const file = document.getElementById('resumeFile').files[0];

  if (!role) {
    alert('Please enter target role');
    return;
  }

  if (!file) {
    alert('Please upload resume');
    return;
  }

  const formData = new FormData();
  formData.append('role', role);
  formData.append('resume', file);
formData.append('jobDescription', jobDescription.value.trim());
  try {

    analyzeBtn.innerText = 'Analyzing...';
const token = localStorage.getItem('token');

console.log('Token:', token);

const response = await fetch('http://localhost:5000/api/ats/analyze', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

    const data = await response.json();

    analyzeBtn.innerText = 'Analyze Resume';

    if (!data.success) {
      alert(data.message);
      return;
    }

    document.getElementById('resultCard').style.display = 'block';

    document.getElementById('atsScore').innerText = data.atsScore;
document.getElementById('jobMatch').innerText =
  data.jobMatch || 0;

document.getElementById('experienceMatch').innerText =
  data.experienceMatch || 0;

document.getElementById('educationMatch').innerText =
  data.educationMatch || 0;

document.getElementById('responsibilitiesMatch').innerText =
  data.responsibilitiesMatch || 0;

document.getElementById('matchedKeywords').innerHTML =
  (data.matchedKeywords || [])
    .map(k => `<li>${k}</li>`)
    .join('');

document.getElementById('missingKeywords').innerHTML =
  (data.missingKeywords || [])
    .map(k => `<li>${k}</li>`)
    .join('');

document.getElementById('applyReadiness').innerText =
  data.applyReadiness || 'Not Available';

document.getElementById('aiSummary').innerText =
  data.summary || 'AI analysis completed.';

    document.getElementById('foundSkills').innerHTML =
      data.foundSkills.map(s => `<li>${s}</li>`).join('');

    document.getElementById('missingSkills').innerHTML =
      data.missingSkills.map(s => `<li>${s}</li>`).join('');

    document.getElementById('suggestions').innerHTML =
      data.suggestions.map(s => `<li>${s}</li>`).join('');

  } catch (err) {
    console.error(err);
    analyzeBtn.innerText = 'Analyze Resume';
    alert('ATS analysis failed');
  }
});
// ===============================
// AI JOB DESCRIPTION GENERATOR
// ===============================

generateJDBtn.addEventListener('click', async () => {
  const targetRole = document.getElementById('targetRole').value;
  const token = localStorage.getItem('token');

  if (!targetRole) {
    alert('Please select a target job role first');
    return;
  }

  if (!token) {
    alert('Please login first');
    return;
  }

  try {
    generateJDBtn.innerText = 'Generating JD...';
    generateJDBtn.disabled = true;

    const response = await fetch(
      'http://localhost:5000/api/ats/generate-jd',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          company: '',
          targetRole: targetRole,
          experience: '',
          location: '',
          skills: ''
        })
      }
    );

    const data = await response.json();
    if (!data.success) {
      alert(data.message || 'JD generation failed');
      return;
    }

    const jd = data.data;

    const formattedJD = `
Job Title: ${jd.jobTitle || ''}

Job Summary:
${jd.summary || ''}

Responsibilities:
${(jd.responsibilities || []).map(item => `• ${item}`).join('\n')}

Required Skills:
${(jd.requiredSkills || []).map(item => `• ${item}`).join('\n')}

Preferred Skills:
${(jd.preferredSkills || []).map(item => `• ${item}`).join('\n')}

Education:
${(jd.education || []).map(item => `• ${item}`).join('\n')}

Experience Requirements:
${(jd.experienceRequirements || []).map(item => `• ${item}`).join('\n')}

Certifications:
${(jd.certifications || []).map(item => `• ${item}`).join('\n')}

Keywords:
${(jd.keywords || []).join(', ')}

${jd.referenceNote || ''}
`.trim();

    jobDescription.value = formattedJD;

  } catch (error) {
    console.error('Generate JD Error:', error);
    alert('JD generation failed');
  } finally {
    generateJDBtn.innerText = '✨ Generate JD with AI';
    generateJDBtn.disabled = false;
  }
});


// ===============================
// CLEAR JOB DESCRIPTION
// ===============================

clearJDBtn.addEventListener('click', () => {
  jobDescription.value = '';
});