/**
 * SportSphere — Customer Booking Engine v3
 * + Pickleball & Padel centers
 * + Cross-session persistent bookings via window.storage API
 */

// ══════════════════════════════════════════
// DATA — 31 Centers (added pickleball/padel)
// ══════════════════════════════════════════
const CENTERS = [
    // ── COLOMBO ──
    { id:1,  name:"Sugathadasa Indoor Stadium",      city:"Colombo",      location:"Sugathadasa, Colombo 10",          sports:["Badminton","Volleyball","Basketball","Table Tennis"], emoji:"🏟️", price:1500, rating:4.8, indoor:true,  img:"https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=60" },
    { id:2,  name:"Colts Cricket Grounds",           city:"Colombo",      location:"Maitland Place, Colombo 7",        sports:["Cricket"],                                            emoji:"🏏", price:5000, rating:4.6, indoor:false, img:"https://images.unsplash.com/photo-1624891182453-91187498322c?w=600&auto=format&fit=crop&q=60" },
    { id:3,  name:"Nondescripts Cricket Club",       city:"Colombo",      location:"Maitland Crescent, Colombo 7",     sports:["Cricket","Tennis"],                                   emoji:"🎾", price:4500, rating:4.5, indoor:false, img:"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop&q=60" },
    { id:4,  name:"Thurstan College Ground",         city:"Colombo",      location:"Thurstan Road, Colombo 3",         sports:["Football","Cricket"],                                 emoji:"⚽", price:2500, rating:4.3, indoor:false, img:"https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&auto=format&fit=crop&q=60" },
    { id:5,  name:"Racquet Club Colombo",            city:"Colombo",      location:"Racecourse Ave, Colombo 7",        sports:["Tennis","Badminton","Squash","Padel"],                emoji:"🎾", price:2000, rating:4.6, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:6,  name:"SSC Grounds",                    city:"Colombo",      location:"Maitland Place, Colombo 7",        sports:["Cricket","Tennis","Swimming"],                        emoji:"🏅", price:4000, rating:4.7, indoor:false, img:"https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&auto=format&fit=crop&q=60" },
    { id:7,  name:"Arena Futsal Colombo",            city:"Colombo",      location:"Baseline Road, Colombo 9",         sports:["Futsal"],                                             emoji:"🥅", price:3500, rating:4.7, indoor:true,  img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:8,  name:"Splash Aquatic Centre",           city:"Colombo",      location:"Biyagama Road, Kelaniya",          sports:["Swimming"],                                           emoji:"🏊", price:1200, rating:4.5, indoor:true,  img:"https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&auto=format&fit=crop&q=60" },
    { id:9,  name:"Urban Futsal Park",               city:"Colombo",      location:"Kotte Road, Sri Jayawardenepura",  sports:["Futsal","Basketball"],                                emoji:"🥅", price:3000, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60" },
    { id:10, name:"Colombo Badminton Arena",         city:"Colombo",      location:"Jawatte Road, Colombo 5",          sports:["Badminton","Table Tennis"],                           emoji:"🏸", price:1000, rating:4.3, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:26, name:"Colombo Padel Club",              city:"Colombo",      location:"Flower Road, Colombo 3",           sports:["Padel","Pickleball"],                                 emoji:"🏓", price:2800, rating:4.7, indoor:true,  img:"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop&q=60" },
    { id:27, name:"Smash Point Pickleball",          city:"Colombo",      location:"Reid Avenue, Colombo 7",           sports:["Pickleball","Badminton"],                             emoji:"🏓", price:1500, rating:4.5, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:28, name:"Ceylon Padel Arena",              city:"Colombo",      location:"Nawala Road, Rajagiriya",          sports:["Padel"],                                              emoji:"🎾", price:3200, rating:4.6, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    // ── KANDY ──
    { id:11, name:"Kandy Esplanade Grounds",         city:"Kandy",        location:"Esplanade Road, Kandy",            sports:["Football","Rugby","Cricket"],                         emoji:"🏉", price:3000, rating:4.7, indoor:false, img:"https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=600&auto=format&fit=crop&q=60" },
    { id:12, name:"Kandy SC Swimming Pool",          city:"Kandy",        location:"Sirimavo Bandaranaike Mw, Kandy",  sports:["Swimming"],                                           emoji:"🏊", price:800,  rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&auto=format&fit=crop&q=60" },
    { id:13, name:"Kandy Indoor Futsal Arena",       city:"Kandy",        location:"Peradeniya Road, Kandy",           sports:["Futsal","Badminton"],                                 emoji:"🥅", price:2500, rating:4.3, indoor:true,  img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:14, name:"Kandy Table Tennis Club",         city:"Kandy",        location:"Dalada Veediya, Kandy",            sports:["Table Tennis","Badminton"],                           emoji:"🏓", price:500,  rating:4.1, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:29, name:"Kandy Pickleball Courts",         city:"Kandy",        location:"Ampitiya Road, Kandy",             sports:["Pickleball","Padel"],                                 emoji:"🏓", price:1200, rating:4.2, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    // ── GALLE ──
    { id:15, name:"Galle International Stadium",    city:"Galle",        location:"Galle Fort Road, Galle",           sports:["Cricket"],                                            emoji:"🏏", price:6000, rating:4.9, indoor:false, img:"https://images.unsplash.com/photo-1540747913346-19212a4b3819?w=600&auto=format&fit=crop&q=60" },
    { id:16, name:"Galle Futsal Zone",              city:"Galle",        location:"Wakwella Road, Galle",             sports:["Futsal","Volleyball"],                                emoji:"🥅", price:2000, rating:4.2, indoor:true,  img:"https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&auto=format&fit=crop&q=60" },
    { id:30, name:"Galle Padel & Pickleball Hub",   city:"Galle",        location:"Closenberg Road, Galle",           sports:["Padel","Pickleball","Tennis"],                        emoji:"🎾", price:2500, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop&q=60" },
    // ── JAFFNA ──
    { id:17, name:"Jaffna Central Ground",          city:"Jaffna",       location:"Stanley Road, Jaffna",             sports:["Football","Volleyball","Basketball"],                  emoji:"⚽", price:1500, rating:4.2, indoor:false, img:"https://images.unsplash.com/photo-1474307028463-8e4be8a8cec1?w=600&auto=format&fit=crop&q=60" },
    { id:18, name:"Jaffna Indoor Sports Hall",      city:"Jaffna",       location:"KKS Road, Jaffna",                 sports:["Badminton","Table Tennis","Volleyball"],              emoji:"🏸", price:700,  rating:4.0, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    // ── NEGOMBO ──
    { id:19, name:"Negombo Sports Complex",         city:"Negombo",      location:"St. Joseph's Street, Negombo",     sports:["Swimming","Badminton","Volleyball"],                  emoji:"🏊", price:1200, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60" },
    { id:20, name:"Negombo Beach Futsal",           city:"Negombo",      location:"Lewis Place Beach, Negombo",       sports:["Futsal","Volleyball"],                                emoji:"🥅", price:1800, rating:4.1, indoor:false, img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:31, name:"Negombo Pickleball Club",        city:"Negombo",      location:"Poruthota Road, Negombo",          sports:["Pickleball"],                                         emoji:"🏓", price:1000, rating:4.0, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    // ── OTHER CITIES ──
    { id:21, name:"Kurunegala Wayamba Ground",      city:"Kurunegala",   location:"Kurunegala Town",                  sports:["Cricket","Football","Rugby"],                         emoji:"🏏", price:3500, rating:4.3, indoor:false, img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=60" },
    { id:22, name:"Matara Uyanwatte Stadium",       city:"Matara",       location:"Uyanwatte, Matara",                sports:["Cricket","Football"],                                 emoji:"🏟️", price:2000, rating:4.1, indoor:false, img:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=60" },
    { id:23, name:"Anuradhapura Indoor Arena",      city:"Anuradhapura", location:"New Town, Anuradhapura",           sports:["Futsal","Badminton","Basketball","Table Tennis"],     emoji:"🏀", price:1000, rating:4.0, indoor:true,  img:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60" },
    { id:24, name:"Ratnapura Sports Center",        city:"Ratnapura",    location:"Ratnapura Town",                   sports:["Badminton","Volleyball"],                             emoji:"🏸", price:900,  rating:3.9, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:25, name:"Trincomalee Beach Volleyball",   city:"Trincomalee",  location:"Beach Road, Trincomalee",          sports:["Volleyball","Football"],                              emoji:"🏐", price:800,  rating:4.2, indoor:false, img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
];

const TIME_SLOTS = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

const CENTER_SLOTS = {};
CENTERS.forEach(c => {
    CENTER_SLOTS[c.id] = TIME_SLOTS.map(t => ({ time: t, taken: Math.random() < 0.28 }));
});

function isRangeFree(centerId, startIdx, hours) {
    const slots = CENTER_SLOTS[centerId];
    for (let i = startIdx; i < startIdx + hours; i++) {
        if (i >= TIME_SLOTS.length || slots[i].taken) return false;
    }
    return true;
}

// ══════════════════════════════════════════
// PERSISTENT BOOKING STORAGE
// Uses window.storage (cross-session) with
// localStorage as fallback for local dev.
// ══════════════════════════════════════════
const STORAGE_KEY = "ss_bookings_v4";

async function loadBookings() {
    try {
        if (window.storage) {
            const result = await window.storage.get(STORAGE_KEY);
            return result ? JSON.parse(result.value) : [];
        }
    } catch (_) {}
    // fallback
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch(_) { return []; }
}

async function saveBookings(bookings) {
    try {
        if (window.storage) {
            await window.storage.set(STORAGE_KEY, JSON.stringify(bookings));
        }
    } catch (_) {}
    // always mirror to localStorage as backup
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings)); } catch(_) {}
}

// ── In-memory bookings (loaded async on init) ──
let myBookings = [];

let activeSport  = "All";
let activeIndoor = "All";
let selectedCenter   = null;
let selectedStartIdx = null;
let selectedHours    = 1;

// ══════════════════════════════════════════
// FILTERS
// ══════════════════════════════════════════
window.filterSport = function(sport, el) {
    activeSport = sport;
    document.querySelectorAll(".sport-pill").forEach(p => p.classList.remove("active"));
    el.classList.add("active");
    renderCenters();
};

window.filterIndoor = function(type, el) {
    activeIndoor = type;
    document.querySelectorAll(".indoor-pill").forEach(p => p.classList.remove("active"));
    el.classList.add("active");
    renderCenters();
};

// ══════════════════════════════════════════
// RENDER CENTERS GRID
// ══════════════════════════════════════════
window.renderCenters = function() {
    const search = (document.getElementById("center-search")?.value || "").toLowerCase();
    const city   = document.getElementById("city-filter")?.value || "";

    const filtered = CENTERS.filter(c => {
        const matchSport  = activeSport === "All" || c.sports.includes(activeSport);
        const matchSearch = !search || c.name.toLowerCase().includes(search) || c.city.toLowerCase().includes(search) || c.location.toLowerCase().includes(search);
        const matchCity   = !city || c.city === city;
        const matchIndoor = activeIndoor === "All" || (activeIndoor === "Indoor" ? c.indoor : !c.indoor);
        return matchSport && matchSearch && matchCity && matchIndoor;
    });

    const grid = document.getElementById("centers-grid");
    if (!grid) return;

    if (!filtered.length) {
        grid.innerHTML = `<div class="no-results"><i class="fas fa-search" style="font-size:3rem;color:var(--accent-primary);margin-bottom:1rem;"></i><p>No centers found. Try a different filter.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(c => {
        const slots = CENTER_SLOTS[c.id];
        const avail = slots.filter(s => !s.taken).length;
        const full  = avail === 0;
        const stars = "★".repeat(Math.round(c.rating)) + "☆".repeat(5 - Math.round(c.rating));
        const indoorBadge = c.indoor
            ? `<span class="indoor-tag"><i class="fas fa-warehouse"></i> Indoor</span>`
            : `<span class="indoor-tag outdoor"><i class="fas fa-sun"></i> Outdoor</span>`;

        return `
        <div class="center-card glass fade-up" onclick="openBookingModal(${c.id})">
            <div class="center-card-img" style="background-image:url('${c.img}')">
                <span class="avail-tag ${full ? "full" : ""}">${full ? "Fully Booked" : avail + " slots free"}</span>
                ${indoorBadge}
            </div>
            <div class="center-card-body">
                <div class="center-card-header">
                    <span class="center-emoji">${c.emoji}</span>
                    <div>
                        <h3 class="center-name">${c.name}</h3>
                        <p class="center-loc"><i class="fas fa-map-marker-alt"></i> ${c.location}</p>
                    </div>
                </div>
                <div class="center-sports-tags">
                    ${c.sports.map(s => `<span class="center-sport-tag">${s}</span>`).join("")}
                </div>
                <div class="center-card-footer">
                    <div>
                        <div class="center-price">Rs. ${c.price.toLocaleString()} <span>/ hr</span></div>
                        <div class="center-stars">${stars} <small>${c.rating}</small></div>
                    </div>
                    <button class="btn btn-primary book-now-btn" onclick="event.stopPropagation(); openBookingModal(${c.id})">
                        ${full ? "Waitlist" : "Book Now"}
                    </button>
                </div>
            </div>
        </div>`;
    }).join("");

    document.querySelectorAll(".fade-up:not(.visible)").forEach(el => {
        window.fadeObserver && window.fadeObserver.observe(el);
    });
};

// ══════════════════════════════════════════
// BOOKING MODAL
// ══════════════════════════════════════════
window.openBookingModal = function(centerId) {
    selectedCenter   = CENTERS.find(c => c.id === centerId);
    selectedStartIdx = null;
    selectedHours    = 1;

    const modal   = document.getElementById("booking-modal");
    const content = document.getElementById("modal-content");
    const today   = new Date().toISOString().split("T")[0];

    content.innerHTML = `
        <div class="modal-header">
            <h2><i class="fas fa-calendar-check"></i> Book a Slot</h2>
            <div class="modal-center-badge">
                <span>${selectedCenter.emoji}</span>
                <div>
                    <strong>${selectedCenter.name}</strong>
                    <small><i class="fas fa-map-marker-alt"></i> ${selectedCenter.location}</small>
                </div>
            </div>
        </div>

        <div class="modal-form-grid">
            <div class="form-group">
                <label><i class="fas fa-user"></i> Your Name</label>
                <input class="modal-input" id="m-name" type="text" placeholder="Full name"/>
            </div>
            <div class="form-group">
                <label><i class="fas fa-phone"></i> Phone Number</label>
                <input class="modal-input" id="m-phone" type="tel" placeholder="07X XXX XXXX"/>
            </div>
            <div class="form-group">
                <label><i class="fas fa-futbol"></i> Sport</label>
                <select class="modal-input" id="m-sport">
                    ${selectedCenter.sports.map(s => `<option value="${s}">${s}</option>`).join("")}
                </select>
            </div>
            <div class="form-group">
                <label><i class="fas fa-calendar"></i> Date</label>
                <input class="modal-input" id="m-date" type="date" min="${today}" value="${today}" onchange="updateSlotGrid()"/>
            </div>
        </div>

        <div class="form-group" style="margin-top:1.5rem;">
            <label><i class="fas fa-hourglass-half"></i> Duration</label>
            <div class="duration-picker">
                <button class="dur-btn" onclick="changeDuration(-1)"><i class="fas fa-minus"></i></button>
                <div class="dur-display">
                    <span id="dur-num">1</span>
                    <small id="dur-label">hour</small>
                </div>
                <button class="dur-btn" onclick="changeDuration(1)"><i class="fas fa-plus"></i></button>
            </div>
            <p class="dur-hint">Up to 6 hours. Price multiplies per hour.</p>
        </div>

        <div class="form-group" style="margin-top:1.5rem;">
            <label><i class="fas fa-clock"></i> Select Start Time
                <small style="color:var(--text-secondary);font-weight:400;margin-left:8px;">— shaded blocks show your full booking range</small>
            </label>
            <div class="slots-grid" id="slots-grid"></div>
        </div>

        <div class="form-group" style="margin-top:1.5rem;">
            <label><i class="fas fa-users"></i> Number of Players</label>
            <select class="modal-input" id="m-players">
                ${Array.from({length:20},(_,i)=>i+1).map(n=>`<option value="${n}">${n} Player${n>1?"s":""}</option>`).join("")}
            </select>
        </div>

        <div class="booking-summary">
            <div class="summary-row"><span>Rate</span><span>Rs. ${selectedCenter.price.toLocaleString()} / hr</span></div>
            <div class="summary-row"><span>Duration</span><span id="sum-dur">1 hour</span></div>
            <div class="summary-row"><span>Time Slot</span><span id="sum-time">— pick a start time</span></div>
            <div class="summary-row total"><span>Total</span><span id="sum-total" style="color:var(--accent-primary)">Rs. ${selectedCenter.price.toLocaleString()}</span></div>
        </div>

        <button class="btn btn-primary confirm-booking-btn" id="confirm-btn" onclick="confirmBooking()" disabled>
            <i class="fas fa-lock"></i> Select a start time to continue
        </button>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    updateSlotGrid();
};

window.changeDuration = function(delta) {
    const next = selectedHours + delta;
    if (next < 1 || next > 6) return;
    selectedHours = next;
    document.getElementById("dur-num").textContent = selectedHours;
    document.getElementById("dur-label").textContent = selectedHours === 1 ? "hour" : "hours";
    if (selectedStartIdx !== null && !isRangeFree(selectedCenter.id, selectedStartIdx, selectedHours)) {
        selectedStartIdx = null;
    }
    updateSlotGrid();
    updateSummary();
};

window.updateSlotGrid = function() {
    const grid = document.getElementById("slots-grid");
    if (!grid) return;
    const slots = CENTER_SLOTS[selectedCenter.id];

    grid.innerHTML = TIME_SLOTS.map((t, i) => {
        const isTaken   = slots[i].taken;
        const canStart  = !isTaken && isRangeFree(selectedCenter.id, i, selectedHours);
        const isStart   = selectedStartIdx !== null && i === selectedStartIdx;
        const isInRange = selectedStartIdx !== null && i > selectedStartIdx && i < selectedStartIdx + selectedHours;

        let cls = "slot-chip ";
        if (isTaken)        cls += "slot-taken";
        else if (isStart)   cls += "slot-start";
        else if (isInRange) cls += "slot-in-range";
        else if (!canStart) cls += "slot-blocked";
        else                cls += "slot-free";

        const endTime = TIME_SLOTS[i + selectedHours] || "Close";
        const tooltip = isTaken ? "Already booked" : !canStart ? "Not enough consecutive free slots" : `${t} – ${endTime}`;

        return `
        <button class="${cls}"
            onclick="${canStart ? `pickStart(${i})` : ""}"
            ${!canStart ? "disabled" : ""}
            title="${tooltip}">
            ${t}
            <small>${isTaken ? "Taken" : isStart ? "START" : isInRange ? "···" : !canStart ? "—" : "Free"}</small>
        </button>`;
    }).join("");

    updateSummary();
};

window.pickStart = function(idx) {
    selectedStartIdx = idx;
    updateSlotGrid();
    updateSummary();
    const endTime = TIME_SLOTS[idx + selectedHours] || "Close";
    const cb = document.getElementById("confirm-btn");
    if (cb) {
        cb.disabled = false;
        cb.innerHTML = `<i class="fas fa-check-circle"></i> Confirm: ${TIME_SLOTS[idx]} – ${endTime} · ${selectedHours}h · Rs. ${(selectedCenter.price * selectedHours).toLocaleString()}`;
    }
};

window.updateSummary = function() {
    const durEl  = document.getElementById("sum-dur");
    const timeEl = document.getElementById("sum-time");
    const totEl  = document.getElementById("sum-total");
    if (!durEl) return;
    durEl.textContent = `${selectedHours} hour${selectedHours > 1 ? "s" : ""}`;
    if (selectedStartIdx !== null) {
        const end = TIME_SLOTS[selectedStartIdx + selectedHours] || "Close";
        timeEl.textContent = `${TIME_SLOTS[selectedStartIdx]} – ${end}`;
    } else {
        timeEl.textContent = "— pick a start time";
    }
    totEl.textContent = `Rs. ${(selectedCenter.price * selectedHours).toLocaleString()}`;
};

// ══════════════════════════════════════════
// CONFIRM BOOKING
// ══════════════════════════════════════════
window.confirmBooking = async function() {
    const name    = document.getElementById("m-name").value.trim();
    const phone   = document.getElementById("m-phone").value.trim();
    const sport   = document.getElementById("m-sport").value;
    const date    = document.getElementById("m-date").value;
    const players = document.getElementById("m-players").value;

    if (!name)                     { showToast("⚠️ Please enter your name"); return; }
    if (!phone)                    { showToast("⚠️ Please enter your phone number"); return; }
    if (selectedStartIdx === null) { showToast("⚠️ Please select a start time"); return; }
    if (!/^0\d{9}$/.test(phone.replace(/\s/g, ""))) {
        showToast("⚠️ Enter a valid Sri Lankan number (e.g. 0771234567)"); return;
    }

    const startTime = TIME_SLOTS[selectedStartIdx];
    const endTime   = TIME_SLOTS[selectedStartIdx + selectedHours] || "Close";
    const total     = selectedCenter.price * selectedHours;
    const ref       = "SS" + Date.now().toString().slice(-7);

    const booking = {
        id: ref,
        centerId:     selectedCenter.id,
        center:       selectedCenter.name,
        location:     selectedCenter.location,
        emoji:        selectedCenter.emoji,
        sport, date, startTime, endTime,
        hours:        selectedHours,
        name, phone, players,
        pricePerHour: selectedCenter.price,
        total,
        status:       "Confirmed",
        bookedAt:     new Date().toLocaleString()
    };

    // Disable confirm button to prevent double-tap
    const cb = document.getElementById("confirm-btn");
    if (cb) { cb.disabled = true; cb.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Saving...`; }

    myBookings.unshift(booking);
    await saveBookings(myBookings);

    // Mark slots as taken
    for (let i = selectedStartIdx; i < selectedStartIdx + selectedHours; i++) {
        if (CENTER_SLOTS[selectedCenter.id][i]) CENTER_SLOTS[selectedCenter.id][i].taken = true;
    }

    document.getElementById("modal-content").innerHTML = `
        <div class="booking-success">
            <div class="success-anim">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p>Your court at <strong>${selectedCenter.name}</strong> is reserved.</p>
            <div class="booking-ref-box">
                <small>Reference Number</small>
                <strong>${ref}</strong>
            </div>
            <div class="booking-summary" style="margin-top:1.5rem;">
                <div class="summary-row"><span>Sport</span><span>${sport}</span></div>
                <div class="summary-row"><span>Date</span><span>${date}</span></div>
                <div class="summary-row"><span>Time</span><span>${startTime} – ${endTime}</span></div>
                <div class="summary-row"><span>Duration</span><span>${selectedHours} hour${selectedHours > 1 ? "s" : ""}</span></div>
                <div class="summary-row"><span>Players</span><span>${players}</span></div>
                <div class="summary-row total"><span>Total</span><span style="color:var(--accent-primary)">Rs. ${total.toLocaleString()}</span></div>
            </div>
            <div style="display:flex;gap:1rem;margin-top:2rem;justify-content:center;flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="closeBookingModal();renderMyBookings();document.getElementById('mybookings').scrollIntoView({behavior:'smooth'})">
                    <i class="fas fa-list"></i> View My Bookings
                </button>
                <button class="btn btn-outline" onclick="closeBookingModal();renderCenters();">
                    <i class="fas fa-search"></i> Book Another
                </button>
            </div>
        </div>`;

    showToast("🎉 Booking saved!");
    renderCenters();
    renderMyBookings();
};

window.closeBookingModal = function() {
    document.getElementById("booking-modal").classList.remove("open");
    document.body.style.overflow = "";
    selectedCenter   = null;
    selectedStartIdx = null;
    selectedHours    = 1;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("booking-modal")?.addEventListener("click", function(e) {
        if (e.target === this) closeBookingModal();
    });
});

// ══════════════════════════════════════════
// MY BOOKINGS
// ══════════════════════════════════════════
window.renderMyBookings = function() {
    const container = document.getElementById("my-bookings-list");
    if (!container) return;

    if (!myBookings.length) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-calendar-times" style="font-size:3rem;color:var(--accent-primary);margin-bottom:1rem;"></i>
                <p>No bookings yet.</p>
                <a href="#book" class="btn btn-primary" style="margin-top:1.5rem;display:inline-flex;">
                    <i class="fas fa-bolt"></i> Book Your First Court
                </a>
            </div>`;
        return;
    }

    container.innerHTML = myBookings.map(b => `
        <div class="booking-item glass fade-up" id="bi-${b.id}">
            <div class="booking-item-icon">${b.emoji}</div>
            <div class="booking-item-info">
                <h4>${b.center}</h4>
                <p>
                    <i class="fas fa-map-marker-alt"></i> ${b.location} &nbsp;·&nbsp;
                    <i class="fas fa-trophy"></i> ${b.sport} &nbsp;·&nbsp;
                    <i class="fas fa-calendar"></i> ${b.date}
                </p>
                <p style="margin-top:0.4rem;">
                    <i class="fas fa-clock"></i> ${b.startTime} – ${b.endTime} &nbsp;·&nbsp;
                    <i class="fas fa-hourglass-half"></i> ${b.hours}h &nbsp;·&nbsp;
                    <i class="fas fa-users"></i> ${b.players} players
                </p>
                <p style="margin-top:0.4rem;">
                    <i class="fas fa-user"></i> ${b.name} &nbsp;·&nbsp;
                    <i class="fas fa-phone"></i> ${b.phone} &nbsp;·&nbsp;
                    <i class="fas fa-tag"></i> Rs. ${b.total.toLocaleString()}
                </p>
                <div style="margin-top:0.8rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                    <span class="booking-ref-tag">REF: ${b.id}</span>
                    <span class="booking-status-badge">✓ ${b.status}</span>
                    <span style="font-size:0.68rem;color:var(--text-secondary);">Booked: ${b.bookedAt}</span>
                </div>
            </div>
            <button class="cancel-booking-btn" onclick="cancelBooking('${b.id}')">
                <i class="fas fa-times"></i> Cancel
            </button>
        </div>`).join("");
};

window.cancelBooking = async function(id) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    myBookings = myBookings.filter(b => b.id !== id);
    await saveBookings(myBookings);
    renderMyBookings();
    showToast("Booking cancelled.");
};

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
window.showToast = function(msg) {
    const t = document.getElementById("toast-msg");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3000);
};

// ══════════════════════════════════════════
// INIT — load bookings then render
// ══════════════════════════════════════════
document.addEventListener("DOMContentLoaded", async () => {
    myBookings = await loadBookings();
    renderCenters();
    renderMyBookings();
});
