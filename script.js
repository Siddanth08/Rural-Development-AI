// =============================
// GRAMEEN VIKAS AI — SCRIPTS
// =============================

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1800);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('visible');
  }
  // Active nav link
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 120;
    if (window.scrollY >= top) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
  });
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const start = performance.now();
  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = target * ease;
    el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isDecimal ? target.toFixed(1) : target;
  }
  requestAnimationFrame(update);
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Counters
      if (entry.target.classList.contains('counter')) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animate-slide-left, .animate-slide-right').forEach(el => observer.observe(el));
document.querySelectorAll('.counter').forEach(el => observer.observe(el));

// Hero stat counters
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ===== SCHEME FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.scheme-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== PILLAR MODAL DATA =====
const pillarData = {
  agri: {
    title: '🌾 Agriculture & Modern Farming',
    color: 'linear-gradient(135deg,#2d6a4f,#52b788)',
    content: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>Agriculture is the backbone of rural India, employing nearly 54% of the rural workforce. Modern farming integrates traditional wisdom with technology to boost yields sustainably.</p>
      </div>
      <div class="modal-section">
        <h4>🌿 Organic Farming</h4>
        <ul>
          <li>Eliminates chemical fertilizers and pesticides</li>
          <li>Uses compost, green manure, and bio-pesticides (e.g., Neem oil)</li>
          <li>Improves soil health over time</li>
          <li>Commands premium prices in markets (20-30% higher)</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>💡 Smart Farming Technologies</h4>
        <ul>
          <li>IoT soil sensors for moisture monitoring</li>
          <li>Drone spraying to reduce pesticide use by 50%</li>
          <li>Mobile apps for weather alerts and crop advice (e.g., Kisan Suvidha)</li>
          <li>Precision farming with GPS-guided tractors</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>💧 Best Irrigation Methods</h4>
        <ul>
          <li><strong>Drip Irrigation:</strong> 40-60% water saving, ideal for horticulture</li>
          <li><strong>Sprinkler:</strong> Good for wheat, groundnut, vegetables</li>
          <li><strong>Flood (Furrow):</strong> Traditional, suited for rice paddy</li>
          <li><strong>Solar Pumps (PM Kusum):</strong> Free daytime irrigation</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>📋 Crop Rotation Guide</h4>
        <ul>
          <li>Rice → Wheat → Mustard (North India)</li>
          <li>Cotton → Jowar → Chickpea (Deccan)</li>
          <li>Sugarcane → Onion → Tomato (Maharashtra)</li>
        </ul>
      </div>
    `
  },
  shg: {
    title: '👩 Women & SHG Empowerment',
    color: 'linear-gradient(135deg,#b5179e,#f72585)',
    content: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>Self Help Groups (SHGs) are voluntary associations of 10–20 women from similar socioeconomic backgrounds who meet regularly, save together, and lend to each other at low interest rates.</p>
      </div>
      <div class="modal-section">
        <h4>📋 How to Form an SHG</h4>
        <ol>
          <li>Gather 10–15 women from the same village/locality</li>
          <li>Hold a formation meeting, elect a President, Secretary & Treasurer</li>
          <li>Decide monthly savings amount (₹100–500 per member)</li>
          <li>Open a bank account in the SHG's name</li>
          <li>Start the Panchasutra: Regular meetings, Regular savings, Regular internal lending, Timely repayment, Proper bookkeeping</li>
        </ol>
      </div>
      <div class="modal-section">
        <h4>💰 Financial Journey</h4>
        <ul>
          <li><strong>Month 1–6:</strong> Build internal savings corpus</li>
          <li><strong>Month 6+:</strong> Apply for Revolving Fund (RF) ₹10,000–15,000 under DAY-NRLM</li>
          <li><strong>Month 12+:</strong> Eligible for bank credit linkage (up to ₹6 lakh)</li>
          <li><strong>Month 18+:</strong> Apply for Community Investment Fund (CIF)</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>💼 Top SHG Business Ideas</h4>
        <ul>
          <li>Spice processing & packaging</li>
          <li>Papad, pickle, and jam making</li>
          <li>Tailoring & embroidery</li>
          <li>Agarbatti / candle making</li>
          <li>Vegetable nursery / floriculture</li>
          <li>Goat farming / dairy</li>
          <li>Handicrafts and bamboo products</li>
        </ul>
      </div>
    `
  },
  water: {
    title: '💧 Water Conservation',
    color: 'linear-gradient(135deg,#0077b6,#00b4d8)',
    content: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>India faces a serious water crisis with groundwater levels falling alarmingly in many states. Sustainable water management is critical for agriculture and drinking water security.</p>
      </div>
      <div class="modal-section">
        <h4>🏗️ Key Conservation Structures</h4>
        <ul>
          <li><strong>Farm Ponds:</strong> Excavated pits that capture runoff for irrigation. Cost: ₹50,000–2 lakh (subsidized under MGNREGA)</li>
          <li><strong>Check Dams:</strong> Small barriers across streams to slow water flow and recharge groundwater</li>
          <li><strong>Percolation Tanks:</strong> Large structures to allow water to seep into the ground</li>
          <li><strong>Rooftop Harvesting:</strong> Collect rainwater from roofs into underground tanks (cost: ₹8,000–15,000)</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>🌧️ Rainwater Harvesting Steps</h4>
        <ol>
          <li>Lay collection pipes from rooftop to collection tank</li>
          <li>Install a first-flush diverter to discard the first dirty flow</li>
          <li>Filter through sand-gravel-charcoal filter bed</li>
          <li>Store in underground sump (min. 1,000 litres)</li>
        </ol>
      </div>
      <div class="modal-section">
        <h4>🏛️ Related Schemes</h4>
        <ul>
          <li><strong>Jal Jeevan Mission:</strong> Tap water to every rural home by 2024</li>
          <li><strong>Atal Bhujal Yojana:</strong> Groundwater management in water-stressed states</li>
          <li><strong>MGNREGA:</strong> Funds farm ponds, check dams, desilting of ponds</li>
          <li><strong>PM Krishi Sinchai Yojana:</strong> Drip & sprinkler irrigation subsidies</li>
        </ul>
      </div>
    `
  },
  energy: {
    title: '☀️ Renewable Energy in Villages',
    color: 'linear-gradient(135deg,#f77f00,#fcbf49)',
    content: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>Renewable energy is transforming rural India by providing clean, affordable power to households and farms. India aims for 500 GW of clean energy by 2030.</p>
      </div>
      <div class="modal-section">
        <h4>🔆 Solar Energy Solutions</h4>
        <ul>
          <li><strong>Rooftop Solar (1–5 kW):</strong> Powers household needs, saves ₹1,500–5,000/month on bills</li>
          <li><strong>Solar Irrigation Pumps:</strong> Free daytime pumping, subsidized 60–90% under PM Kusum</li>
          <li><strong>Solar Street Lights:</strong> Funded by village Panchayat, no electricity bill</li>
          <li><strong>Solar Cold Storage:</strong> Prevents post-harvest losses for vegetables and fruits</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>🌿 Biogas (Gobar Gas) Plants</h4>
        <ul>
          <li>Uses cow dung to produce cooking gas (methane)</li>
          <li>2-cow family needs a 2 cubic metre plant</li>
          <li>Residue (slurry) is excellent organic fertilizer</li>
          <li>Saves ₹500–800/month on LPG for a family</li>
          <li>MNRE subsidy: ₹10,000–16,000 per unit</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>🏛️ PM Kusum Scheme Details</h4>
        <ul>
          <li><strong>Component A:</strong> 10,000 MW solar power plants on barren land</li>
          <li><strong>Component B:</strong> Solar irrigation pumps (up to 7.5 HP)</li>
          <li><strong>Component C:</strong> Solarization of existing grid-connected pumps</li>
          <li><strong>Subsidy:</strong> 30% Central + 30% State = 60% (some states up to 90%)</li>
        </ul>
      </div>
    `
  },
  health: {
    title: '🏥 Rural Healthcare',
    color: 'linear-gradient(135deg,#d62828,#f07167)',
    content: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>Rural healthcare in India operates through a 3-tier system: Sub-Health Centres → Primary Health Centres (PHCs) → Community Health Centres (CHCs). ASHA workers act as the bridge between communities and the health system.</p>
      </div>
      <div class="modal-section">
        <h4>👩‍⚕️ ASHA Workers Role</h4>
        <ul>
          <li>First point of contact for health issues in the village</li>
          <li>Facilitate institutional deliveries and antenatal care</li>
          <li>Immunization tracking and record maintenance</li>
          <li>Distribute oral rehydration salts, iron tablets, contraceptives</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>🏛️ Ayushman Bharat Scheme</h4>
        <ul>
          <li><strong>Objective:</strong> Largest health insurance scheme in the world</li>
          <li><strong>Coverage:</strong> ₹5 lakh/family/year for secondary & tertiary hospitalization</li>
          <li><strong>Eligibility:</strong> SECC 2011 listed families (auto-identified)</li>
          <li><strong>How to check:</strong> Visit pmjay.gov.in or nearest empanelled hospital</li>
          <li><strong>No premium:</strong> Fully funded by Central and State Government</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>🧹 Swachh Bharat (Gramin)</h4>
        <ul>
          <li>ODF (Open Defecation Free) village certification</li>
          <li>Individual Household Latrine (IHHL) subsidy: ₹12,000</li>
          <li>Solid and liquid waste management in villages</li>
          <li>Linked to Gram Panchayat Development Plans</li>
        </ul>
      </div>
    `
  },
  digital: {
    title: '📱 Digital Rural India',
    color: 'linear-gradient(135deg,#3a0ca3,#7209b7)',
    content: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>The Digital India programme is transforming rural areas through internet connectivity, e-governance, digital literacy, and online service delivery through Common Service Centres (CSCs).</p>
      </div>
      <div class="modal-section">
        <h4>💻 Common Service Centres (CSCs)</h4>
        <ul>
          <li>5.45 lakh+ CSCs operating across India</li>
          <li>Services: Aadhaar enrollment, PAN card, passport, insurance, banking</li>
          <li>Online scheme applications: PM-KISAN, PMAY, scholarships</li>
          <li>Telemedicine, e-learning, digital payment training</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>🌐 BharatNet Project</h4>
        <ul>
          <li>Optical fibre network to all 2.5 lakh Gram Panchayats</li>
          <li>High-speed broadband at affordable prices</li>
          <li>Enables digital services, e-governance, education</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>📚 Digital Literacy (PMGDISHA)</h4>
        <ul>
          <li>PM Gramin Digital Saksharta Abhiyan</li>
          <li>Train 6 crore rural citizens in basic digital skills</li>
          <li>Skills: internet usage, digital payments, government services</li>
          <li>Free training through nearby CSC centers</li>
        </ul>
      </div>
    `
  },
  edu: {
    title: '🎓 Rural Education',
    color: 'linear-gradient(135deg,#1b4332,#40916c)',
    content: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>Education is the most powerful tool for rural transformation. India has made significant progress with rising literacy rates and school enrollment, but quality, dropout rates, and higher education access remain challenges.</p>
      </div>
      <div class="modal-section">
        <h4>🍛 Mid-Day Meal Scheme</h4>
        <ul>
          <li>Free hot cooked meals in government primary schools</li>
          <li>Reduces hunger, boosts attendance, improves nutrition</li>
          <li>Covers 11.8 crore children in 11.4 lakh schools</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>💼 Skill India Programme</h4>
        <ul>
          <li>Free vocational training in 100+ trades</li>
          <li>PMKVYsector skills: Plumbing, electrician, beautician, agriculture tech</li>
          <li>Certificate recognized by industry for employment</li>
          <li>Nearest ITI / PMKVY Training Centre: Check skillindia.gov.in</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>📱 Digital Education</h4>
        <ul>
          <li>DIKSHA app: Free digital textbooks for Classes 1–12</li>
          <li>PM eVIDYA: TV channels (SWAYAM Prabha) for rural students</li>
          <li>Free Wi-Fi in schools under Digital India</li>
          <li>National Scholarship Portal for SC/ST/OBC students</li>
        </ul>
      </div>
    `
  }
};

// ===== OPEN PILLAR MODAL =====
function openModal(key) {
  const data = pillarData[key];
  if (!data) return;
  document.getElementById('modalContent').innerHTML = `
    <div style="background:${data.color};padding:1.5rem;border-radius:14px;margin-bottom:1.5rem;">
      <h2 style="color:#fff;font-size:1.4rem;font-weight:800;">${data.title}</h2>
    </div>
    ${data.content}
  `;
  document.getElementById('pillarModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('pillarModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== SCHEME MODAL DATA =====
const schemeData = {
  pmkisan: {
    name: 'PM-KISAN — Pradhan Mantri Kisan Samman Nidhi',
    color: 'linear-gradient(135deg,#2d6a4f,#52b788)',
    objective: 'To provide direct income support of ₹6,000/year to all landholding farmer families to supplement their financial needs for procuring inputs to ensure proper crop health and appropriate yields.',
    eligibility: ['All landholding farmer families with cultivable land', 'Both small and marginal farmers', 'Excludes: Institutional landholders, former/current Ministers, MPs, MLAs, Income Tax payers, professionals with income above limits'],
    benefits: ['₹6,000 per year in 3 equal installments of ₹2,000', 'Directly credited to bank account (DBT)', 'No intermediary — 100% transparent transfer'],
    documents: ['Aadhaar Card (mandatory)', 'Bank account number and IFSC code', 'Land ownership records (Khatauni/7/12)', 'Mobile number linked to Aadhaar'],
    process: ['Visit pmkisan.gov.in', 'Click "Farmer Corner" → "New Farmer Registration"', 'Enter Aadhaar number and mobile number', 'Fill land details and bank account', 'Complete e-KYC (mandatory)', 'Submit and receive PM-KISAN ID'],
    note: 'e-KYC is mandatory every year to continue receiving installments. You can do e-KYC at the nearest CSC or via OTP on the portal.'
  },
  mgnrega: {
    name: 'MGNREGA — Mahatma Gandhi National Rural Employment Guarantee Act',
    color: 'linear-gradient(135deg,#7b2d8b,#c77dff)',
    objective: 'To enhance livelihood security in rural areas by providing at least 100 days of guaranteed wage employment per financial year to every adult member of a rural household who demands work.',
    eligibility: ['Any adult (18+) member of a rural household', 'Must be willing to do unskilled manual work', 'Must apply for a Job Card from the local Gram Panchayat'],
    benefits: ['100 days of guaranteed employment per year', 'State-specific minimum wages (₹200–350/day)', 'Work within 5 km of residence or transport allowance', 'Work must be provided within 15 days of application or unemployment allowance is paid', 'Constructive works: ponds, roads, canals, tree planting'],
    documents: ['Aadhaar Card', 'Job Card (obtained from Gram Panchayat)', 'Bank account / Post Office account'],
    process: ['Visit Gram Panchayat office', 'Apply for Job Card (free of charge)', 'Submit work demand in writing to Gram Panchayat', 'Work is allotted within 15 days', 'Wages credited within 15 days of work completion'],
    note: 'Works include farm ponds, check dams, road building, plantation — these assets remain village property. Check nrega.nic.in for your Gram Panchayat\'s status.'
  },
  pmayg: {
    name: 'PMAY-G — Pradhan Mantri Awaas Yojana (Gramin)',
    color: 'linear-gradient(135deg,#e63946,#f4a261)',
    objective: 'To provide a pucca house with basic amenities to all rural households who are houseless or living in dilapidated houses by 2024.',
    eligibility: ['Identified under SECC 2011 data', 'Houseless or living in 0-room/1-room kutcha houses', 'Priority: SC/ST, widows of defence personnel, persons with disabilities, minorities'],
    benefits: ['₹1.2 lakh per unit in plain areas', '₹1.3 lakh per unit in hilly/difficult areas', 'Convergence with MGNREGA for 90 days unskilled labour wages', 'Toilet under Swachh Bharat Mission', 'LPG connection under PMUY, electricity under SAUBHAGYA'],
    documents: ['Aadhaar Card', 'Bank account details', 'SECC 2011 identification', 'Passport-size photograph'],
    process: ['Beneficiary list prepared from SECC 2011 data (no application needed)', 'Gram Sabha verifies and approves the list', 'Beneficiary receives notification via mobile', 'Money transferred in installments linked to construction progress', 'Geo-tagged photos uploaded at each stage'],
    note: 'You cannot apply directly. Eligibility is determined by SECC 2011 data. If you believe you are eligible but not on the list, contact your Gram Panchayat or Block Development Office.'
  },
  pmfby: {
    name: 'PM Fasal Bima Yojana — Pradhan Mantri Fasal Bima Yojana',
    color: 'linear-gradient(135deg,#1d3557,#457b9d)',
    objective: 'To provide financial support to farmers suffering crop loss/damage due to unforeseen events like natural calamities, pests, and diseases.',
    eligibility: ['All farmers growing notified crops in notified areas', 'Compulsory for loanee farmers', 'Optional for non-loanee farmers'],
    benefits: ['Full sum insured without any upper limit cap', 'Low premium: 2% for Kharif, 1.5% for Rabi, 5% for horticulture', 'Quick settlement via remote sensing and drone crop cutting', 'Claim directly credited to bank account'],
    documents: ['Aadhaar Card', 'Bank account details', 'Land records (7/12 or Khatauni)', 'Sowing certificate from Patwari', 'Mobile number'],
    process: ['Visit nearest bank branch or CSC', 'Or apply online at pmfby.gov.in', 'Submit application before the cut-off date (usually 2 weeks before sowing)', 'Pay applicable premium', 'Receive policy certificate via SMS'],
    note: 'In case of crop damage, notify the insurance company or bank within 72 hours of damage. Photograph the damage. Claim is based on crop cutting experiments at village level.'
  },
  daynrlm: {
    name: 'DAY-NRLM — Deendayal Antyodaya Yojana – National Rural Livelihoods Mission',
    color: 'linear-gradient(135deg,#b5179e,#f72585)',
    objective: 'To reduce rural poverty by enabling poor households to access gainful self-employment and skilled wage employment opportunities, resulting in an appreciable improvement in their livelihoods.',
    eligibility: ['Women from rural poor households', 'Priority: SC/ST, minorities, persons with disabilities, bonded labour', 'Identified through Participatory Identification of Poor (PIP) process'],
    benefits: ['Revolving Fund (RF): ₹10,000–15,000 per SHG', 'Community Investment Fund (CIF): ₹1–3 lakh', 'Interest subvention: Loans at 7% p.a. (further subvention to 4% on timely repayment)', 'Bank linkage: ₹1–6 lakh bank loans', 'Skill training and market linkage support'],
    documents: ['Aadhaar Card of all members', 'SHG bank account details', 'SHG meeting records (minutes book)', 'Savings passbook'],
    process: ['Form SHG with 10–15 women from the same village', 'Approach local Anganwadi/ASHA worker or Block NRLM office', 'Register SHG with Gram Panchayat', 'Open bank account in SHG name', 'Maintain Panchasutra (5 principles) for 6 months', 'Apply for RF through Village Organization (VO)'],
    note: 'Contact your Block Mission Management Unit (BMMU) for support in forming and registering SHGs. Every Gram Panchayat should have a Community Resource Person (CRP) who can guide you.'
  },
  pmkusum: {
    name: 'PM Kusum — Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan',
    color: 'linear-gradient(135deg,#f77f00,#fcbf49)',
    objective: 'To add solar and other renewable energy capacity of 25,750 MW by 2022 and ensure energy security for farmers while de-dieselising the agriculture sector.',
    eligibility: ['Individual farmers', 'Farmers cooperatives, Panchayats, Water User Associations', 'All farmers with irrigated land'],
    benefits: ['Component B: Stand-alone solar pumps (up to 7.5 HP) at 30% (Central) + 30% (State) subsidy = 60% off, remaining 30% bank loan', 'Component C: Grid-connected solar pump solarization — farmer sells surplus power to DISCOM at ₹3.07/unit', 'Extra income from excess solar power generation'],
    documents: ['Aadhaar Card', 'Land ownership proof', 'Bank account details', 'Existing pump details (for Component C)'],
    process: ['Visit state DISCOM/agriculture department website', 'Register and submit application', 'Technical survey of land by DISCOM', 'Pay 10% farmer share', 'Solar pump installed by empanelled vendor', 'Net metering connection for grid-connected units'],
    note: 'Solar pump incentive limits vary by state. Check your State Agriculture or Energy Department website for exact subsidy amounts and current application status in your area.'
  },
  ayushman: {
    name: 'Ayushman Bharat — Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    color: 'linear-gradient(135deg,#d62828,#f07167)',
    objective: 'To provide health protection cover to poor and vulnerable families (approx. 10.74 crore families) for secondary and tertiary care hospitalization, thus achieving Universal Health Coverage.',
    eligibility: ['Automatically identified from SECC 2011 rural database', 'Deprivation criteria: Households with kutcha walls/roof, landless labourers, SC/ST households, manual scavengers, etc.', 'Check eligibility at pmjay.gov.in using Aadhaar / mobile / ration card number'],
    benefits: ['₹5 lakh health cover per family per year', 'Cashless and paperless treatment at empanelled hospitals', 'Covers 1,573 procedures including surgery, medical care, diagnostics', 'Pre and post-hospitalization expenses covered', 'No cap on family size or age', 'Pre-existing conditions covered from Day 1'],
    documents: ['Aadhaar Card (any family member)', 'Ration Card or any government ID', 'Ayushman Card (generated at hospital/CSC)'],
    process: ['Check eligibility at pmjay.gov.in or call 14555', 'Visit nearest empanelled hospital or CSC', 'Show Aadhaar card — hospital generates Ayushman Card on-site', 'Get admitted and receive cashless treatment', 'No payment needed for covered procedures'],
    note: 'You do NOT need to register separately. If your family is in the SECC list, you are automatically eligible. The hospital\'s Ayushman Mitra will help you avail benefits.'
  },
  kcc: {
    name: 'Kisan Credit Card — KCC Scheme',
    color: 'linear-gradient(135deg,#386641,#6a994e)',
    objective: 'To provide affordable short-term credit to farmers for meeting their agricultural needs including inputs, post-harvest expenses, produce marketing and maintenance needs of farm assets.',
    eligibility: ['Farmers (owner cultivators, tenant farmers, oral lessees)', 'Self Help Groups / Joint Liability Groups of farmers', 'Fishermen and animal husbandry farmers (extended in 2019)', 'No minimum land holding required'],
    benefits: ['Credit limit up to ₹3 lakh (higher limits for larger needs)', 'Interest rate: 4% p.a. (with 3% interest subvention on timely repayment)', 'Flexibility to borrow and repay multiple times within the limit', 'Covers crop cultivation + post-harvest + farm maintenance + household needs', 'Personal accident insurance and crop insurance included'],
    documents: ['Aadhaar Card', 'PAN Card or Form 60', 'Land records (7/12 extract or Khatauni)', 'Passport size photographs', 'Bank account details'],
    process: ['Visit nearest bank branch (all public sector banks issue KCC)', 'Fill KCC application form', 'Submit with land records and ID proof', 'Bank assesses credit limit based on land holding and crop area', 'KCC issued as a smart card with ATM/RuPay facility', 'Annual renewal at the same bank'],
    note: 'PM-KISAN beneficiaries are being automatically provided KCC. If you are a PM-KISAN beneficiary, ask your bank for KCC using the PM-KISAN PM database. Processing should take < 14 days.'
  }
};

function openSchemeModal(key) {
  const data = schemeData[key];
  if (!data) return;
  document.getElementById('schemeModalContent').innerHTML = `
    <div style="background:${data.color};padding:1.5rem;border-radius:14px;margin-bottom:1.5rem;">
      <h2 style="color:#fff;font-size:1.2rem;font-weight:800;">${data.name}</h2>
    </div>
    <div class="modal-section">
      <h4>🎯 Objective</h4>
      <p>${data.objective}</p>
    </div>
    <div class="modal-section">
      <h4>✅ Eligibility</h4>
      <ul>${data.eligibility.map(e => `<li>${e}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h4>🎁 Benefits</h4>
      <ul>${data.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h4>📄 Documents Required</h4>
      <ul>${data.documents.map(d => `<li>${d}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h4>📋 How to Apply</h4>
      <ol>${data.process.map(p => `<li>${p}</li>`).join('')}</ol>
    </div>
    <div class="modal-note">
      <strong>⚠️ Important Note:</strong> ${data.note}
    </div>
  `;
  document.getElementById('schemeModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSchemeModal() {
  document.getElementById('schemeModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== AI CHAT =====
const aiKnowledge = {
  'organic farming': `🌿 **Organic Farming** involves growing crops without synthetic chemicals.

**Key Techniques:**
• Compost & Vermicompost for soil nutrients
• Neem oil & Biopesticides for pest control
• Crop rotation to prevent soil depletion
• Green manure (growing legumes and ploughing them in)

**Benefits:**
• Reduces input costs by 30-40% over 3 years
• Soil health improves year on year
• Premium price of 20-30% over regular produce
• Healthier food for families and communities

**Government Support:** Paramparagat Krishi Vikas Yojana (PKVY) — ₹50,000/hectare subsidy for organic farming clusters`,

  'pm-kisan': `💰 **PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)**

**Benefits:** ₹6,000/year in 3 installments of ₹2,000 each

**How to Apply:**
1. Visit pmkisan.gov.in
2. Click "Farmer Corner" → New Farmer Registration
3. Enter Aadhaar & land details
4. Complete e-KYC (mandatory)

**Required:** Aadhaar Card, land records, bank account

**Important:** e-KYC must be completed every year to continue receiving installments. Do it at pmkisan.gov.in or nearest CSC.`,

  'shg': `👩 **Self Help Groups (SHGs)**

**Formation Steps:**
1. Gather 10–15 women from the same village
2. Elect President, Secretary & Treasurer
3. Decide monthly savings (₹100–500/member)
4. Open SHG bank account
5. Follow Panchasutra (5 principles)

**Financial Journey:**
• Month 1–6: Build savings
• Month 6+: Apply for Revolving Fund (₹10,000–15,000)
• Month 12+: Bank loan up to ₹6 lakh

**Top Business Ideas:** Spice processing, papad/pickle making, tailoring, agarbatti, dairy, handicrafts

**Scheme:** DAY-NRLM — Contact your Block Mission Management Unit`,

  'water conservation': `💧 **Water Conservation Techniques for Villages**

**Rainwater Harvesting:**
• Collect rooftop rainwater → storage tank (cost ₹8,000–15,000)
• First-flush diverter + sand-gravel-charcoal filter

**Farm Structures:**
• Farm Ponds: Capture runoff for irrigation (MGNREGA funded)
• Check Dams: Slow stream water, recharge groundwater
• Percolation Tanks: Allow water to seep underground

**Irrigation Efficiency:**
• Drip Irrigation: Saves 40–60% water
• Sprinkler: Good for vegetables and field crops
• Solar pumps (PM Kusum): Free daytime irrigation

**Schemes:** Jal Jeevan Mission, Atal Bhujal Yojana, PM Krishi Sinchai Yojana`,

  'black soil': `🌾 **Best Crops for Black Soil (Regur/Cotton Soil)**

Black soil is found in Maharashtra, MP, Gujarat, parts of AP & Karnataka. It holds water well and is rich in calcium, potassium & magnesium.

**Best Crops:**
• Cotton (black soil is called cotton soil for a reason!)
• Sorghum (Jowar)
• Chickpea (Chana)
• Linseed
• Sugarcane (with irrigation)
• Wheat (Rabi season)
• Oilseeds (sunflower, soybean)

**Avoid:** Paddy (too waterlogged when wet), very deep-rooted crops in shallow black soil

**Tips:** Black soil cracks in summer — plant cover crops or mulch to retain moisture`,

  'mgnrega': `🔨 **MGNREGA — How It Works**

**What You Get:**
• 100 days guaranteed employment per year
• State minimum wages (₹200–350/day)
• Work within 5 km of home

**Works Done Under MGNREGA:**
• Farm ponds and check dams
• Road construction and repair
• Tree plantation
• Canal desilting
• School/hospital compound walls

**How to Apply:**
1. Visit Gram Panchayat office
2. Get a Job Card (free, within 15 days)
3. Submit work demand in writing
4. Work allotted within 15 days
5. Wages paid within 15 days

**Track on:** nrega.nic.in — Enter your state, district, block & Gram Panchayat`,

  'drip irrigation': `🚿 **Drip Irrigation — Complete Guide**

**What It Is:** Water delivered directly to plant roots through a network of pipes and drippers — no wastage.

**Benefits:**
• Saves 40–60% water vs flood irrigation
• Reduces weed growth
• Prevents fungal diseases (no leaf wetting)
• Can be combined with fertigation (fertilizer in water)

**Setup Steps:**
1. Install mainline pipe from water source
2. Lay sub-main pipes along crop rows
3. Place drip laterals with drippers every 30–60 cm
4. Install filter and pressure regulator at source
5. Test and run for 4–6 hours/day

**Cost:** ₹30,000–80,000/acre (50–60% subsidized under PMKSY)

**Ideal for:** Sugarcane, banana, pomegranate, vegetables, fruits`,

  'dairy farming': `🐄 **Starting a Dairy Farming Unit in a Village**

**Minimum Setup (5 Cattle Unit):**
• 3 milch cows (HF/Jersey cross) + 2 buffaloes
• Shed: 80–100 sq ft per animal
• Total Investment: ₹3–5 lakh

**Daily Management:**
• Feed: 10 kg green fodder + 3 kg dry fodder + 2 kg concentrate per animal
• Water: 60–80 litres/day per animal
• Milking: Twice daily (5 am & 5 pm)
• Veterinary check: Every 3 months

**Income Estimate:**
• 5 animals × 15 litres/day = 75 litres/day
• Selling at ₹40/litre = ₹3,000/day = ₹90,000/month
• Net profit after feed: ₹30,000–40,000/month

**Schemes:** NABARD Dairy Entrepreneurship Development Scheme (DEDS) — 25–33% back-ended subsidy`
};

function getBotResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  for (const [key, response] of Object.entries(aiKnowledge)) {
    if (msg.includes(key.toLowerCase()) || key.split(' ').some(word => msg.includes(word.toLowerCase()) && word.length > 3)) {
      return response;
    }
  }
  // Default responses
  if (msg.includes('scheme') || msg.includes('yojana')) {
    return `🏛️ **Government Schemes for Rural India**

I can provide detailed information about:
• **PM-KISAN** — ₹6,000/year for farmers
• **MGNREGA** — 100 days employment guarantee
• **PMAY-Gramin** — Free housing for BPL families
• **DAY-NRLM** — SHG formation and microfinance
• **Ayushman Bharat** — ₹5 lakh health insurance
• **PM Kusum** — Solar pumps for agriculture
• **PM Fasal Bima** — Crop insurance
• **Kisan Credit Card** — Low-interest farm credit

Please ask me about any specific scheme for full details!`;
  }
  if (msg.includes('crop') || msg.includes('farming') || msg.includes('agriculture')) {
    return `🌾 **Agricultural Guidance**

I can help you with:
• Organic farming techniques and transition
• Crop selection based on soil type and season
• Irrigation methods (drip, sprinkler, solar pumps)
• Soil health management and testing
• Crop rotation strategies
• Modern smart farming technologies
• Post-harvest storage and value addition

What specific farming topic would you like to explore?`;
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste')) {
    return `🙏 Namaste! Welcome to Grameen Vikas AI!

I can help you with:
🌾 Agriculture & Farming Techniques
🏛️ Government Welfare Schemes
👩 Women Empowerment & SHGs
💧 Water Conservation
☀️ Renewable Energy
🏥 Rural Healthcare
📱 Digital India

What would you like to learn about today?`;
  }
  return `🤔 Great question! I'd be happy to help with that.

**I can provide detailed information on:**
• 🌾 Organic Farming, Crop Selection, Irrigation
• 🏛️ PM-KISAN, MGNREGA, PMAY, Ayushman Bharat
• 👩 SHG Formation, Microfinance, Women Empowerment
• 💧 Water Conservation & Rainwater Harvesting
• ☀️ Solar Energy & Biogas Solutions
• 🐄 Dairy, Poultry & Fisheries

Could you be more specific about your question? For example:
*"How does PM-KISAN work?"* or *"How to start organic farming?"*`;
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^•\s/gm, '<span style="color:var(--primary-light)">•</span> ')
    .replace(/\n/g, '<br>');
}

function addMessage(content, isUser = false) {
  const chatMessages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;
  div.innerHTML = `
    <div class="msg-avatar">${isUser ? '👤' : '🌾'}</div>
    <div class="msg-content">${isUser ? content : formatMessage(content)}</div>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
  const chatMessages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot-msg';
  div.id = 'typing';
  div.innerHTML = `
    <div class="msg-avatar">🌾</div>
    <div class="msg-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, true);
  input.value = '';
  addTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    addMessage(getBotResponse(text));
  }, 1200 + Math.random() * 800);
}

function askQuestion(q) {
  document.getElementById('chatInput').value = q;
  sendMessage();
  document.getElementById('ai').scrollIntoView({ behavior: 'smooth' });
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

// ===== CHARTS (using Canvas API) =====
function drawPieChart() {
  const canvas = document.getElementById('costChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const data = [
    { label: 'Machinery', value: 70000, color: '#52b788' },
    { label: 'Raw Materials', value: 40000, color: '#f4a261' },
    { label: 'Packaging', value: 20000, color: '#f72585' },
    { label: 'Licensing', value: 20000, color: '#7209b7' }
  ];
  const total = data.reduce((a, b) => a + b.value, 0);
  let startAngle = -Math.PI / 2;
  const cx = 150, cy = 150, r = 110;

  ctx.clearRect(0, 0, 300, 300);

  data.forEach(d => {
    const slice = (d.value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Label
    const midAngle = startAngle + slice / 2;
    const lx = cx + (r * 0.65) * Math.cos(midAngle);
    const ly = cy + (r * 0.65) * Math.sin(midAngle);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Outfit';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.round((d.value / total) * 100) + '%', lx, ly);

    startAngle += slice;
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, 50, 0, 2 * Math.PI);
  ctx.fillStyle = '#1f2937';
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px Outfit';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('₹1.5L', cx, cy);

  // Legend
  const legend = document.getElementById('costLegend');
  if (legend) {
    legend.innerHTML = data.map(d => `
      <div style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:#94a3b8;">
        <span style="width:12px;height:12px;border-radius:3px;background:${d.color};display:inline-block;"></span>
        ${d.label}: ₹${(d.value/1000).toFixed(0)}k
      </div>
    `).join('');
  }
}

function drawRevenueChart() {
  const canvas = document.getElementById('revenueChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
  const revenue = [30000, 42000, 50000, 55000, 58000, 60000];
  const costs = [38000, 40000, 42000, 43000, 44000, 45000];

  const w = 300, h = 200;
  const padL = 45, padR = 15, padT = 15, padB = 35;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;
  const maxVal = 70000;

  ctx.clearRect(0, 0, w, h);

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = padT + (chartH / 4) * i;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w - padR, y);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '9px Outfit';
    ctx.textAlign = 'right';
    ctx.fillText('₹' + Math.round(maxVal - (maxVal / 4) * i / 1000) + 'k', padL - 4, y + 3);
  }

  // Draw lines
  function drawLine(data, color, fill = false) {
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = padL + (i / (data.length - 1)) * chartW;
      const y = padT + chartH - (val / maxVal) * chartH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Dots
    data.forEach((val, i) => {
      const x = padL + (i / (data.length - 1)) * chartW;
      const y = padT + chartH - (val / maxVal) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  drawLine(revenue, '#52b788');
  drawLine(costs, '#f72585');

  // X axis labels
  months.forEach((m, i) => {
    const x = padL + (i / (months.length - 1)) * chartW;
    ctx.fillStyle = '#64748b';
    ctx.font = '10px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText(m, x, h - 5);
  });

  // Legend
  ctx.fillStyle = '#52b788';
  ctx.fillRect(padL, h - 30, 12, 4);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '9px Outfit';
  ctx.textAlign = 'left';
  ctx.fillText('Revenue', padL + 16, h - 26);

  ctx.fillStyle = '#f72585';
  ctx.fillRect(padL + 80, h - 30, 12, 4);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('Costs', padL + 96, h - 26);
}

// Initialize charts when section is visible
const chartObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      drawPieChart();
      drawRevenueChart();
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const shgSection = document.getElementById('shg');
if (shgSection) chartObserver.observe(shgSection);

// ===== MODAL STYLES (injected) =====
const modalStyles = `
  .modal-section { margin-bottom: 1.2rem; }
  .modal-section h4 { color: #fff; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
  .modal-section p { color: #94a3b8; font-size: 0.9rem; line-height: 1.7; }
  .modal-section ul, .modal-section ol { padding-left: 1.2rem; color: #94a3b8; font-size: 0.9rem; }
  .modal-section ul li, .modal-section ol li { margin-bottom: 0.4rem; line-height: 1.6; }
  .modal-note { background: rgba(244,162,97,0.1); border: 1px solid rgba(244,162,97,0.3); border-radius: 10px; padding: 1rem; font-size: 0.88rem; color: #94a3b8; }
  .modal-note strong { color: #f4a261; }
`;
const styleEl = document.createElement('style');
styleEl.textContent = modalStyles;
document.head.appendChild(styleEl);
