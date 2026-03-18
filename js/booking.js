/**
 * SportSphere — Customer Booking Engine v3
 * + Pickleball & Padel centers
 * + Cross-session persistent bookings via window.storage API
 */

// ══════════════════════════════════════════
// DATA — 61 Centers (added more pickleball centers across Sri Lanka)
// ══════════════════════════════════════════
const CENTERS = [
    // ── COLOMBO ──
    { id:1,  name:"Sugathadasa Indoor Stadium",      city:"Colombo",      location:"Sugathadasa, Colombo 10",          sports:["Badminton","Volleyball","Basketball","Table Tennis"], emoji:"🏟️", price:1500, rating:4.8, indoor:true,  img:"https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=60" },
    { id:2,  name:"Colts Cricket Grounds",           city:"Colombo",      location:"Maitland Place, Colombo 7",        sports:["Cricket"],                                            emoji:"🏏", price:5000, rating:4.6, indoor:false, img:"assets/colts_cricket.png" },
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
    { id:32, name:"Club Fusion Boralesgamuwa",       city:"Colombo",      location:"Dehiwala Road, Boralesgamuwa",     sports:["Futsal","Cricket","Badminton"],                        emoji:"🥅", price:3500, rating:4.6, indoor:true,  img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:33, name:"CFC Dehiwala",                   city:"Colombo",      location:"Dehiwala-Mount Lavinia",           sports:["Futsal"],                                             emoji:"🥅", price:3000, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60" },
    { id:34, name:"Kick Off Futsal",                city:"Colombo",      location:"Battaramulla",                     sports:["Futsal"],                                             emoji:"🥅", price:3800, rating:4.7, indoor:true,  img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:35, name:"Futsal World",                   city:"Colombo",      location:"Darley Road, Colombo 10",          sports:["Futsal"],                                             emoji:"🥅", price:4000, rating:4.5, indoor:true,  img:"https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&auto=format&fit=crop&q=60" },
    { id:36, name:"The Racecourse Futsal",          city:"Colombo",      location:"Colombo 7",                        sports:["Futsal"],                                             emoji:"🥅", price:4500, rating:4.8, indoor:false, img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:42, name:"Super Sport Badminton Nawala",    city:"Colombo",      location:"Nawala Road, Nawala",              sports:["Badminton"],                                         emoji:"🏸", price:1200, rating:4.6, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:43, name:"Mercantile Badminton (MBA)",      city:"Colombo",      location:"Maitland Place, Colombo 7",        sports:["Badminton"],                                         emoji:"🏸", price:1500, rating:4.7, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:44, name:"Zimantra Badminton",              city:"Colombo",      location:"Koswatta Road, Battaramulla",      sports:["Badminton"],                                         emoji:"🏸", price:1800, rating:4.8, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:45, name:"Austasia Sports Club",           city:"Colombo",      location:"Thalawathugoda",                   sports:["Badminton","Swimming","Squash"],                      emoji:"🏅", price:1400, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&auto=format&fit=crop&q=60" },
    { id:52, name:"Pickleball Park Colombo",          city:"Colombo",      location:"Reid Avenue, Colombo 7",           sports:["Pickleball"],                                         emoji:"🏓", price:1600, rating:4.6, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:53, name:"Elite Pickleball Club",           city:"Colombo",      location:"Thimbirigasyaya, Colombo 5",       sports:["Pickleball","Tennis"],                                emoji:"🏓", price:1800, rating:4.8, indoor:true,  img:"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop&q=60" },
    { id:58, name:"The Pickle Island",               city:"Colombo",      location:"Arcade Independence / Excel World", sports:["Pickleball"],                                         emoji:"🏓", price:1800, rating:4.7, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:59, name:"Pickle Colombo",                  city:"Colombo",      location:"6 Flower Terrace, Colombo 3",      sports:["Pickleball"],                                         emoji:"🏓", price:2000, rating:4.8, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:60, name:"Misfits Arena",                   city:"Colombo",      location:"Boralesgamuwa",                    sports:["Pickleball"],                                         emoji:"🏓", price:1500, rating:4.5, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:61, name:"Pipinya Pickleball Club",         city:"Colombo",      location:"670 Galle Road, Moratuwa",         sports:["Pickleball"],                                         emoji:"🏓", price:1400, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    // ── KANDY ──
    { id:11, name:"Kandy Esplanade Grounds",         city:"Kandy",        location:"Esplanade Road, Kandy",            sports:["Football","Rugby","Cricket"],                         emoji:"🏉", price:3000, rating:4.7, indoor:false, img:"https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=600&auto=format&fit=crop&q=60" },
    { id:12, name:"Kandy SC Swimming Pool",          city:"Kandy",        location:"Sirimavo Bandaranaike Mw, Kandy",  sports:["Swimming"],                                           emoji:"🏊", price:800,  rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&auto=format&fit=crop&q=60" },
    { id:13, name:"Kandy Indoor Futsal Arena",       city:"Kandy",        location:"Peradeniya Road, Kandy",           sports:["Futsal","Badminton"],                                 emoji:"🥅", price:2500, rating:4.3, indoor:true,  img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:14, name:"Kandy Table Tennis Club",         city:"Kandy",        location:"Dalada Veediya, Kandy",            sports:["Table Tennis","Badminton"],                           emoji:"🏓", price:500,  rating:4.1, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:29, name:"Kandy Pickleball Courts",         city:"Kandy",        location:"Ampitiya Road, Kandy",             sports:["Pickleball","Padel"],                                 emoji:"🏓", price:1200, rating:4.2, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:37, name:"Kandy Futsal Center",             city:"Kandy",        location:"Katugastota, Kandy",               sports:["Futsal"],                                             emoji:"🥅", price:2200, rating:4.5, indoor:true,  img:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60" },
    { id:46, name:"Trinity College Badminton",       city:"Kandy",        location:"D.S. Senanayake Street, Kandy",    sports:["Badminton"],                                         emoji:"🏸", price:1000, rating:4.8, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:47, name:"Axion Sports Complex",           city:"Kandy",        location:"Ambatenna, Kandy",                 sports:["Badminton"],                                         emoji:"🏸", price:900,  rating:4.3, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:54, name:"Hill Country Pickleball",         city:"Kandy",        location:"Peradeniya Road, Kandy",           sports:["Pickleball"],                                         emoji:"🏓", price:1300, rating:4.5, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    // ── GALLE ──
    { id:15, name:"Galle International Stadium",    city:"Galle",        location:"Galle Fort Road, Galle",           sports:["Cricket"],                                            emoji:"🏏", price:6000, rating:4.9, indoor:false, img:"https://images.unsplash.com/photo-1540747913346-19212a4b3819?w=600&auto=format&fit=crop&q=60" },
    { id:16, name:"Galle Futsal Zone",              city:"Galle",        location:"Wakwella Road, Galle",             sports:["Futsal","Volleyball"],                                emoji:"🥅", price:2000, rating:4.2, indoor:true,  img:"https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&auto=format&fit=crop&q=60" },
    { id:30, name:"Galle Padel & Pickleball Hub",   city:"Galle",        location:"Closenberg Road, Galle",           sports:["Padel","Pickleball","Tennis"],                        emoji:"🎾", price:2500, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop&q=60" },
    { id:38, name:"Galle Futsal Hub",               city:"Galle",        location:"Karapitiya, Galle",                sports:["Futsal"],                                             emoji:"🥅", price:1800, rating:4.3, indoor:true,  img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:48, name:"C & S Badminton Complex",        city:"Galle",        location:"Galle Town, Galle",                sports:["Badminton"],                                         emoji:"🏸", price:1100, rating:4.7, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:55, name:"Southern Pickleball Arena",       city:"Galle",        location:"Karapitiya, Galle",                sports:["Pickleball","Badminton"],                             emoji:"🏓", price:1400, rating:4.3, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    // ── JAFFNA ──
    { id:17, name:"Jaffna Central Ground",          city:"Jaffna",       location:"Stanley Road, Jaffna",             sports:["Football","Volleyball","Basketball"],                  emoji:"⚽", price:1500, rating:4.2, indoor:false, img:"https://images.unsplash.com/photo-1474307028463-8e4be8a8cec1?w=600&auto=format&fit=crop&q=60" },
    { id:18, name:"Jaffna Indoor Sports Hall",      city:"Jaffna",       location:"KKS Road, Jaffna",                 sports:["Badminton","Table Tennis","Volleyball"],              emoji:"🏸", price:700,  rating:4.0, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:39, name:"Jaffna Futsal Point",            city:"Jaffna",       location:"Chundikuli, Jaffna",               sports:["Futsal"],                                             emoji:"🥅", price:1200, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&auto=format&fit=crop&q=60" },
    { id:56, name:"Jaffna Pickleball Court",         city:"Jaffna",       location:"Hospital Road, Jaffna",            sports:["Pickleball"],                                         emoji:"🏓", price:1100, rating:4.2, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    // ── NEGOMBO ──
    { id:19, name:"Negombo Sports Complex",         city:"Negombo",      location:"St. Joseph's Street, Negombo",     sports:["Swimming","Badminton","Volleyball"],                  emoji:"🏊", price:1200, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60" },
    { id:20, name:"Negombo Beach Futsal",           city:"Negombo",      location:"Lewis Place Beach, Negombo",       sports:["Futsal","Volleyball"],                                emoji:"🥅", price:1800, rating:4.1, indoor:false, img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:31, name:"Negombo Pickleball Club",        city:"Negombo",      location:"Poruthota Road, Negombo",          sports:["Pickleball"],                                         emoji:"🏓", price:1000, rating:4.0, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:49, name:"Shuttlers Badminton Academy",    city:"Negombo",      location:"Negombo Road, Negombo",            sports:["Badminton","Table Tennis"],                           emoji:"🏸", price:900,  rating:4.5, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:50, name:"Winners Badminton Academy",      city:"Negombo",      location:"Katuwapitiya, Negombo",            sports:["Badminton"],                                         emoji:"🏸", price:850,  rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60" },
    { id:57, name:"Coastal Pickleball",              city:"Negombo",      location:"Lewis Place, Negombo",             sports:["Pickleball","Padel"],                                 emoji:"🏓", price:1200, rating:4.4, indoor:true,  img:"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop&q=60" },
    // ── OTHER CITIES ──
    { id:21, name:"Kurunegala Wayamba Ground",      city:"Kurunegala",   location:"Kurunegala Town",                  sports:["Cricket","Football","Rugby"],                         emoji:"🏏", price:3500, rating:4.3, indoor:false, img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=60" },
    { id:40, name:"Kurunegala Futsal Arena",        city:"Kurunegala",   location:"Puttalam Road, Kurunegala",        sports:["Futsal"],                                             emoji:"🥅", price:2000, rating:4.6, indoor:true,  img:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60" },
    { id:51, name:"Wayamba Badminton Center",       city:"Kurunegala",   location:"Kurunegala Town",                  sports:["Badminton"],                                         emoji:"🏸", price:800,  rating:4.2, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:22, name:"Matara Uyanwatte Stadium",       city:"Matara",       location:"Uyanwatte, Matara",                sports:["Cricket","Football"],                                 emoji:"🏟️", price:2000, rating:4.1, indoor:false, img:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=60" },
    { id:41, name:"Matara Futsal Zone",             city:"Matara",       location:"Rahula Road, Matara",              sports:["Futsal"],                                             emoji:"🥅", price:1500, rating:4.2, indoor:true,  img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
    { id:23, name:"Anuradhapura Indoor Arena",      city:"Anuradhapura", location:"New Town, Anuradhapura",           sports:["Futsal","Badminton","Basketball","Table Tennis"],     emoji:"🏀", price:1000, rating:4.0, indoor:true,  img:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60" },
    { id:24, name:"Ratnapura Sports Center",        city:"Ratnapura",    location:"Ratnapura Town",                   sports:["Badminton","Volleyball"],                             emoji:"🏸", price:900,  rating:3.9, indoor:true,  img:"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=60" },
    { id:25, name:"Trincomalee Beach Volleyball",   city:"Trincomalee",  location:"Beach Road, Trincomalee",          sports:["Volleyball","Football"],                              emoji:"🏐", price:800,  rating:4.2, indoor:false, img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60" },
];

const TIME_SLOTS = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

// Load persistent slot data or initialize with random
const SLOT_STORAGE_KEY = "ss_slots_v4";
let CENTER_SLOTS = {};

async function loadSlots() {
    let localData = {};
    try {
        if (window.storage && typeof window.storage.get === 'function') {
            const result = await window.storage.get(SLOT_STORAGE_KEY);
            if (result && result.value) localData = JSON.parse(result.value);
        } else {
            const saved = localStorage.getItem(SLOT_STORAGE_KEY);
            if (saved) localData = JSON.parse(saved);
        }
    } catch (e) {
        console.warn("Slot loading failed, using defaults:", e);
        localData = {};
    }

    // Ensure EVERY center in the current system has slots
    if (typeof CENTERS !== 'undefined') {
        CENTERS.forEach(c => {
            if (!localData[c.id]) {
                localData[c.id] = TIME_SLOTS.map(t => ({ time: t, taken: Math.random() < 0.28 }));
            }
        });
    }

    CENTER_SLOTS = localData;
    await saveSlots();
}

async function saveSlots() {
    if (window.storage) {
        await window.storage.set(SLOT_STORAGE_KEY, JSON.stringify(CENTER_SLOTS));
    }
    localStorage.setItem(SLOT_STORAGE_KEY, JSON.stringify(CENTER_SLOTS));
}

// Global Refresh Helper
window.refreshSlots = async function() {
    await loadSlots();
    renderCenters();
};


// Load custom centers from centers dashboard
const CUSTOM_CENTERS_KEY = "ss_custom_centers_v4";
function loadCustomCenters() {
    const saved = JSON.parse(localStorage.getItem(CUSTOM_CENTERS_KEY) || "[]");
    saved.forEach(custom => {
        // Find if this center already exists by ID or by Name
        const idx = CENTERS.findIndex(c => c.id === custom.id || c.name.toLowerCase() === custom.name.toLowerCase());
        
        if (idx !== -1) {
            // Replace existing with custom data (Owner overrides system defaults)
            CENTERS[idx] = { ...CENTERS[idx], ...custom };
        } else {
            // New unique center
            CENTERS.push(custom);
        }

        // Initialize slots if missing
        if (!CENTER_SLOTS[custom.id]) {
            CENTER_SLOTS[custom.id] = TIME_SLOTS.map(t => ({ time: t, taken: false }));
        }
    });
}
loadCustomCenters();
saveSlots();

function getCenterHoursForDate(center, date) {
    let open = center.openTime || "06:00";
    let close = center.closeTime || "22:00";

    if (center.customSchedules && Array.isArray(center.customSchedules)) {
        const exception = center.customSchedules.find(s => {
            if (s.start && s.end) {
                return date >= s.start && date <= s.end;
            }
            return s.start === date;
        });
        if (exception) {
            open = exception.open;
            close = exception.close;
        }
    }
    return { open, close };
}

function isRangeFree(centerId, startIdx, hours) {
    const slots = CENTER_SLOTS[centerId];
    const center = CENTERS.find(c => String(c.id) === String(centerId));
    const dateInput = document.getElementById("m-date");
    const date = dateInput ? dateInput.value : new Date().toISOString().split("T")[0];
    
    const { close } = getCenterHoursForDate(center, date);

    for (let i = startIdx; i < startIdx + hours; i++) {
        if (i >= TIME_SLOTS.length || slots[i].taken) return false;
        if (TIME_SLOTS[i] >= close) return false;
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
    // fallback
    try { 
        const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(items) ? items.filter(b => b && typeof b === 'object') : [];
    } catch(_) { return []; }
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

window.updateGroundMap = function(name) {
    const mapIframe = document.getElementById('grounds-iframe');
    const mapSection = document.getElementById('grounds-map');
    if (mapIframe) {
        const query = encodeURIComponent(name + ", Sri Lanka");
        mapIframe.src = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// ══════════════════════════════════════════
// RENDER CENTERS GRID
// ══════════════════════════════════════════
window.renderCenters = function() {
    const search = (document.getElementById("center-search")?.value || "").toLowerCase();
    const city   = document.getElementById("city-filter")?.value || "";

    const filtered = CENTERS.filter(c => {
        const cSports = c.sports || [];
        const matchSport  = activeSport === "All" || cSports.includes(activeSport);
        const matchSearch = !search || c.name.toLowerCase().includes(search) || c.city.toLowerCase().includes(search) || (c.location && c.location.toLowerCase().includes(search));
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
        const slots = (CENTER_SLOTS && CENTER_SLOTS[c.id]) ? CENTER_SLOTS[c.id] : [];
        const avail = slots.filter(s => !s.taken).length;
        const full  = slots.length > 0 && avail === 0;
        const stars = "★".repeat(Math.round(c.rating || 0)) + "☆".repeat(5 - Math.round(c.rating || 0));
        const indoorBadge = c.indoor
            ? `<span class="indoor-tag"><i class="fas fa-warehouse"></i> Indoor</span>`
            : `<span class="indoor-tag outdoor"><i class="fas fa-sun"></i> Outdoor</span>`;
        const cImg = c.img || "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600";
        const cSportsList = c.sports || [];

        return `
        <div class="center-card glass fade-up visible" style="opacity:1; transform:none;" onclick="openBookingModal('${c.id}')">
            <div class="center-card-img" style="background-image:url('${cImg}')">
                <span class="avail-tag ${full ? "full" : ""}">${full ? "Fully Booked" : avail + " slots free"}</span>
                ${indoorBadge}
            </div>
            <div class="center-card-body">
                <div class="center-card-header">
                    <span class="center-emoji">${c.emoji || '🏟️'}</span>
                    <div>
                        <h3 class="center-name">${c.name || 'Sports Center'}</h3>
                        <p class="center-loc"><i class="fas fa-map-marker-alt"></i> ${c.location || 'Sri Lanka'}</p>
                    </div>
                </div>
                <div class="center-sports-tags">
                    ${cSportsList.map(s => `<span class="center-sport-tag">${s}</span>`).join("")}
                </div>
                <div class="center-card-footer">
                    <div>
                        <div style="font-size: 0.65rem; color: #8b5cf6; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 2px;">
                            ID: ${(() => {
                                let raw = String(c.id);
                                if (raw.startsWith('SS-CTR-')) return raw;
                                if (raw.startsWith('custom-')) return raw.replace('custom-', 'SS-CTR-');
                                return 'SS-CTR-' + raw.padStart(6, '0').slice(-6);
                            })()}
                        </div>
                        <div class="center-price">Rs. ${(c.price || 0).toLocaleString()} <span>/ hr</span></div>
                        <div class="center-stars">${stars} <small>${c.rating || 'N/A'}</small></div>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button class="btn btn-outline" style="padding: 9px 12px; font-size: 0.82rem;" title="Locate on Map" onclick="event.stopPropagation(); updateGroundMap('${c.name}')">
                            <i class="fas fa-location-dot" style="margin:0"></i>
                        </button>
                        <button class="btn btn-primary book-now-btn" onclick="event.stopPropagation(); openBookingModal('${c.id}')">
                            ${full ? "Waitlist" : "Book"}
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join("");

    // Initialize potential new fade elements
    document.querySelectorAll(".fade-up:not(.visible)").forEach(el => {
        if (window.fadeObserver) window.fadeObserver.observe(el);
        else { el.classList.add('visible'); el.style.opacity = "1"; el.style.transform = "none"; }
    });
};

// ══════════════════════════════════════════
// BOOKING MODAL
// ══════════════════════════════════════════
window.openBookingModal = function(centerId) {
    selectedCenter   = CENTERS.find(c => String(c.id) === String(centerId));
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
        </div>

        <div class="modal-form-grid" style="margin-top: 1rem;">
            <div class="form-group">
                <label><i class="fas fa-futbol"></i> Sport</label>
                <select class="modal-input" id="m-sport">
                    ${selectedCenter.sports.map(s => `<option value="${s}">${s}</option>`).join("")}
                </select>
            </div>
            <div class="form-group">
                <label><i class="fas fa-calendar-alt"></i> Date</label>
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

    const dateInput = document.getElementById("m-date");
    const date = dateInput ? dateInput.value : new Date().toISOString().split("T")[0];
    const { open, close } = getCenterHoursForDate(selectedCenter, date);

    grid.innerHTML = TIME_SLOTS.map((t, i) => {
        // Only show slots within center hours for THIS date
        if (t < open || t >= close) return "";

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

        const nextSlot = TIME_SLOTS[i + 1] || close;
        const tooltip = isTaken ? "Already booked" : !canStart ? "Invalid time or duration" : `${t} – ${nextSlot}`;

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
        bookedAt:     new Date().toLocaleString(),
        bookedAtTimestamp: Date.now()
    };

    // Instead of saving directly, open payment modal
    openPaymentModal(booking);
};

window.openPaymentModal = function(booking) {
    const modal = document.getElementById("payment-modal");
    const content = document.getElementById("payment-content");
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="modal-header">
            <h2><i class="fas fa-shield-alt"></i> Secure Payment</h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem;">Complete your transaction for <strong>${booking.center}</strong></p>
        </div>

        <div style="background: rgba(139, 92, 246, 0.05); padding: 15px; border-radius: 12px; margin: 20px 0; border: 1px solid rgba(139, 92, 246, 0.2);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.9rem; color: var(--text-secondary);">Total to pay:</span>
                <strong style="font-size: 1.2rem; color: white;">Rs. ${booking.total.toLocaleString()}</strong>
            </div>
        </div>

        <div class="payment-methods">
            <div class="payment-method active" onclick="this.parentElement.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active')); this.classList.add('active')">
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" style="height: 32px; width: auto; display: block; margin: 0 auto; transition: none;">
            </div>
            <div class="payment-method" onclick="this.parentElement.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active')); this.classList.add('active')">
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" style="height: 32px; width: auto; display: block; margin: 0 auto; transition: none;">
            </div>
        </div>

        <div class="form-group">
            <label style="font-size: 0.8rem; color: var(--text-secondary);">Card Number</label>
            <input type="text" class="payment-card-input" placeholder="0000 0000 0000 0000" maxlength="19" oninput="this.value = this.value.replace(/\\D/g, '').replace(/(.{4})/g, '$1 ').trim()">
        </div>

        <div style="display: flex; gap: 15px; margin-top: 15px;">
            <div style="flex: 1;">
                <label style="font-size: 0.8rem; color: var(--text-secondary);">Expiry Date</label>
                <input type="text" class="payment-card-input" placeholder="MM / YY" maxlength="5">
            </div>
            <div style="flex: 1;">
                <label style="font-size: 0.8rem; color: var(--text-secondary);">CVC</label>
                <input type="password" class="payment-card-input" placeholder="***" maxlength="3">
            </div>
        </div>

        <button class="btn btn-primary" id="pay-btn" onclick="processMockPayment(${JSON.stringify(booking).replace(/"/g, '&quot;')})" style="width: 100%; margin-top: 25px; height: 50px;">
            Pay Now (Rs. ${booking.total.toLocaleString()})
        </button>

        <button class="btn btn-outline" onclick="payLater(${JSON.stringify(booking).replace(/"/g, '&quot;')})" style="width: 100%; margin-top: 10px; height: 50px; font-size: 0.85rem; border-color: rgba(255,255,255,0.1);">
            <i class="fas fa-clock"></i> Pay Later (at Venue)
        </button>

        <div class="payment-security">
            <i class="fas fa-lock"></i> SSL Secured Transaction
            <span style="margin: 0 5px;">|</span>
            <i class="fas fa-check-circle"></i> PCI Compliant
        </div>

        <button onclick="document.getElementById('payment-modal').classList.remove('open')" style="background: none; border: none; color: var(--text-secondary); font-size: 0.8rem; margin-top: 15px; width: 100%; cursor: pointer;">
            Cancel & Go Back
        </button>
    `;

    modal.classList.add("open");
};

window.processMockPayment = function(booking) {
    const btn = document.getElementById("pay-btn");
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Verifying with bank...`;

    // Simulate network delay
    setTimeout(() => {
        btn.innerHTML = `<i class="fas fa-check-circle"></i> Processing Success...`;
        setTimeout(async () => {
            document.getElementById("payment-modal").classList.remove("open");
            booking.status = "Paid & Confirmed";
            await finishBooking(booking);
        }, 1000);
    }, 2000);
};

window.payLater = async function(booking) {
    document.getElementById("payment-modal").classList.remove("open");
    
    // Show the 7-day notification
    showToast("📋 Booked! Please pay at the venue within 7 days.");
    
    booking.status = "Booked (Pay at Venue)";
    await finishBooking(booking);
};

window.finishBooking = async function(booking) {
    const ref = booking.id;
    const sport = booking.sport;
    const date = booking.date;
    const startTime = booking.startTime;
    const endTime = booking.endTime;
    const players = booking.players;
    const total = booking.total;

    myBookings.unshift(booking);
    await saveBookings(myBookings);

    // Mark slots as taken
    for (let i = selectedStartIdx; i < selectedStartIdx + selectedHours; i++) {
        if (CENTER_SLOTS[selectedCenter.id][i]) CENTER_SLOTS[selectedCenter.id][i].taken = true;
    }
    await saveSlots();

    document.getElementById("modal-content").innerHTML = `
        <div class="booking-success">
            <div class="success-anim">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p>Your court at <strong>${selectedCenter.name || 'Arena'}</strong> is reserved.</p>
            ${(booking.status || '').includes('Pay at Venue') ? 
                `<p style="color: #fbbf24; font-size: 0.9rem; margin-top: -0.5rem;"><i class="fas fa-info-circle"></i> Reminder: Settlement required within 7 days.</p>` : 
                `<p style="color: #10b981; font-size: 0.9rem; margin-top: -0.5rem;"><i class="fas fa-check-double"></i> Transaction completed successfully.</p>`
            }
            <div class="booking-ref-box">
                <small>Reference Number</small>
                <strong>${ref || 'N/A'}</strong>
            </div>
            <div class="booking-summary" style="margin-top:1.5rem;">
                <div class="summary-row"><span>Sport</span><span>${sport || 'N/A'}</span></div>
                <div class="summary-row"><span>Date</span><span>${date || 'N/A'}</span></div>
                <div class="summary-row"><span>Time</span><span>${startTime} – ${endTime}</span></div>
                <div class="summary-row"><span>Duration</span><span>${selectedHours} hour${selectedHours > 1 ? "s" : ""}</span></div>
                <div class="summary-row"><span>Players</span><span>${players || 1}</span></div>
                <div class="summary-row total"><span>Amount Due</span><span style="color:var(--accent-primary)">Rs. ${(total || 0).toLocaleString()}</span></div>
                <div class="summary-row" style="border-top: 1px solid rgba(255,255,255,0.05); margin-top: 5px; padding-top: 5px;">
                    <span>Status</span>
                    <span style="color: ${(booking.status || '').includes('Paid') ? '#10b981' : '#fbbf24'}">${booking.status || 'Confirmed'}</span>
                </div>
            </div>
            <div style="display:flex;gap:1rem;margin-top:2rem;justify-content:center;flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="closeBookingModal();renderMyBookings();showTab('bookings')" style="min-width: 160px;">
                    <i class="fas fa-list"></i> View Bookings
                </button>
                <button class="btn btn-outline" onclick="downloadReceipt('${booking.id}')" style="min-width: 160px; border-color: #ef4444; color: white;">
                    <i class="fas fa-file-pdf" style="color: #ef4444;"></i> Download Receipt
                </button>
                <button class="btn btn-outline" onclick="closeBookingModal();renderCenters();" style="min-width: 160px;">
                    <i class="fas fa-search"></i> Book Another
                </button>
            </div>
        </div>`;

    showToast("🎉 Booking & Payment saved!");
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
                <button onclick="showTab('explore')" class="btn btn-primary" style="margin-top:1.5rem;display:inline-flex; border:none; cursor:pointer;">
                    <i class="fas fa-bolt"></i> Book Your First Court
                </button>
            </div>`;
        return;
    }

    const bookingsToRender = myBookings.filter(b => b && typeof b === 'object');
    
    container.innerHTML = bookingsToRender.map(b => {
        const bStatus = b.status || 'Confirmed';
        const isPaid = (bStatus || '').includes('Paid');
        const bTotal = b.total || 0;
        
        return `
        <div class="booking-item glass fade-up visible" id="bi-${b.id}" style="padding: 18px 25px; margin-bottom: 15px; display: block; opacity: 1; transform: none;">
            <div class="booking-item-info">
                <h4 style="font-size: 1.6rem; margin-bottom: 12px; display: flex; align-items: center; gap: 15px;">
                    <span style="font-size: 2.5rem; background: rgba(255,255,255,0.05); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 14px;">${b.emoji || '🏟️'}</span>
                    ${b.center || 'Sports Center'}
                </h4>
                <p style="font-size: 0.95rem; margin-bottom: 15px;">
                    <i class="fas fa-map-marker-alt"></i> ${b.location || 'Sri Lanka'} &nbsp;·&nbsp;
                    <i class="fas fa-trophy"></i> ${b.sport || 'Sports'} &nbsp;·&nbsp;
                    <i class="fas fa-calendar"></i> ${b.date || 'Today'}
                </p>
                <div style="margin-top:0.8rem; font-size: 0.9rem; color: var(--text-secondary); background: rgba(255,255,255,0.03); padding: 12px 18px; border-radius: 12px; display: inline-flex; gap: 15px; flex-wrap: wrap;">
                    <span><i class="fas fa-clock" style="color: var(--accent-primary);"></i> ${b.startTime || '--:--'} – ${b.endTime || '--:--'}</span>
                    <span><i class="fas fa-user" style="color: var(--accent-primary);"></i> ${b.name || 'User'}</span>
                    <strong style="color: white;"><i class="fas fa-tag" style="color: var(--accent-primary);"></i> Rs. ${bTotal.toLocaleString()}</strong>
                </div>
                
                <!-- Rating UI -->
                <div class="booking-rating-box" style="margin-top: 1.5rem;">
                    <span style="font-size: 0.85rem; margin-right: 12px;">Rate your experience:</span>
                    <div class="stars-input" data-bid="${b.id}" style="font-size: 1.2rem;">
                        ${[1,2,3,4,5].map(num => `
                            <i class="${(b.userRating || 0) >= num ? 'fas' : 'far'} fa-star" 
                               onclick="setRating('${b.id}', ${num})" 
                               style="cursor:pointer; color: ${(b.userRating || 0) >= num ? '#f59e0b' : 'var(--text-secondary)'}; margin-right: 5px;"></i>
                        `).join("")}
                    </div>
                </div>

                <div style="margin-top:1.5rem;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
                    <span class="booking-ref-tag" style="padding: 6px 12px; font-size: 0.8rem;">REF: ${b.id || 'N/A'}</span>
                    <span class="booking-status-badge" style="padding: 6px 15px; font-size: 0.8rem; background: ${isPaid ? 'rgba(34,197,94,0.15)' : 'rgba(251,146,60,0.15)'}; color: ${isPaid ? '#22c55e' : '#fbbf24'}; border-color: ${isPaid ? 'rgba(34,197,94,0.3)' : 'rgba(251,146,60,0.3)'}">
                        ${isPaid ? '✓' : '🕒'} ${bStatus}
                    </span>
                    <button class="btn btn-outline" style="padding: 8px 18px; font-size: 0.85rem; border-color: var(--accent-primary); color: white;" onclick="downloadReceipt('${b.id}')">
                        <i class="fas fa-file-pdf" style="color: #ef4444; margin-right: 8px;"></i> Download Receipt (PDF)
                    </button>
                </div>
            </div>
            ${(() => {
                const now = Date.now();
                const bookedAt = b.bookedAtTimestamp || 0;
                const hoursSinceBooking = (now - bookedAt) / (1000 * 60 * 60);
                const canCancel = hoursSinceBooking < 24;

                if (canCancel) {
                    return `
                        <button class="cancel-booking-btn" onclick="cancelBooking('${b.id}')" 
                                style="margin-left: auto; padding: 10px 22px; font-size: 0.85rem; border: 1.5px solid #ef4444; color: #ef4444; background: rgba(239,68,68,0.08); border-radius: 99px; transition: all 0.3s ease;"
                                onmouseover="this.style.background='rgba(239,68,68,0.2)'; this.style.transform='scale(1.02)';"
                                onmouseout="this.style.background='rgba(239,68,68,0.08)'; this.style.transform='scale(1)';">
                            <i class="fas fa-times-circle"></i> Cancel and Refund
                        </button>
                    `;
                } else {
                    return `
                        <div style="width: fit-content; margin-left: auto; color: #ef4444; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9; border: 1px solid rgba(239,68,68,0.3); padding: 10px 18px; border-radius: 99px; background: rgba(239,68,68,0.08); cursor: not-allowed; display: flex; align-items: center; gap: 6px;" title="Cancellations are only permitted within 24 hours of booking.">
                             <i class="fas fa-ban"></i> Non-Refundable
                        </div>
                    `;
                }
            })()}
        </div>`}).join("");
};

window.cancelBooking = async function(id) {
    const booking = myBookings.find(b => b.id === id);
    if (!booking) return;

    const now = Date.now();
    const bookedAt = booking.bookedAtTimestamp || 0;
    const hoursSinceBooking = (now - bookedAt) / (1000 * 60 * 60);

    if (hoursSinceBooking >= 24) {
        showToast("❌ Cancellation expired! (24-hour limit exceeded)");
        return;
    }

    const isPaid = (booking.status || '').includes('Paid');
    const msg = isPaid 
        ? "This booking is PAID. Would you like to cancel and request a refund to your original payment method? (Within 24hr window)"
        : "Are you sure you want to cancel this booking?";

    if (!confirm(msg)) return;
    
    myBookings = myBookings.filter(b => b.id !== id);
    await saveBookings(myBookings);
    renderMyBookings();
    
    if (isPaid) {
        showToast("✅ Refund Processing: Rs. " + booking.total.toLocaleString() + " will be returned to your card.");
    } else {
        showToast("✅ Booking cancelled successfully.");
    }
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
// ══════════════════════════════════════════
// RATING & PDF UTILS
// ══════════════════════════════════════════
window.setRating = async function(bookingId, starCount) {
    const booking = myBookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    booking.userRating = starCount;
    await saveBookings(myBookings);
    renderMyBookings();
    showToast(`⭐ Rated ${starCount} stars!`);
};

window.downloadReceipt = function(bookingId) {
    const b = myBookings.find(bk => bk.id === bookingId);
    if (!b) return;

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // --- Colors ---
        const primaryColor = [139, 92, 246]; // Indigo/Violet
        const secondaryColor = [31, 41, 55]; // Gray-800
        const accentColor = [245, 158, 11]; // Amber

        // --- Document Header ---
        doc.setFillColor(5, 7, 10);
        doc.rect(0, 0, 210, 60, 'F');
        
        // Indigo accent bar
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 3, 'F');

        // Brand Logo
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.text("SPORTSPHERE", 20, 30);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(156, 163, 175);
        doc.text("PREMIUM SPORTS VENUE MANAGEMENT", 20, 38);

        // Ribbon Label
        doc.setFillColor(...primaryColor);
        doc.rect(140, 22, 55, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("OFFICIAL RECEIPT", 167.5, 30, { align: "center" });

        // --- Addresses Section ---
        let y = 75;
        doc.setTextColor(...secondaryColor);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("ISSUED BY:", 20, y);
        
        y += 7;
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text(b.center.toUpperCase(), 20, y);
        
        y += 6;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(b.location || "Online Booking Service", 20, y);
        y += 5;
        doc.text(b.city || "Sri Lanka", 20, y);

        // --- Bill To Section ---
        y += 12;
        doc.setTextColor(...secondaryColor);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("BILL TO:", 20, y);
        
        y += 7;
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text(b.name.toUpperCase(), 20, y);
        
        y += 6;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`Phone: ${b.phone}`, 20, y);
        y += 5;
        doc.text(`Reference: #${b.id}`, 20, y);

        // --- Receipt Meta Info (Top Right Box) ---
        const boxY = 75;
        doc.setFillColor(248, 250, 252);
        doc.rect(140, boxY, 50, 25, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.rect(140, boxY, 50, 25, 'S');
        
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(8);
        doc.text("BOOKING DATE", 145, boxY + 6);
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(b.bookedAt.split(',')[0], 145, boxY + 11);
        
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(8);
        doc.text("PAYMENT STATUS", 145, boxY + 17);
        const isPaid = (b.status || '').toLowerCase().includes('paid');
        doc.setTextColor(isPaid ? 16 : 245, isPaid ? 185 : 158, isPaid ? 129 : 11);
        doc.text(b.status.toUpperCase(), 145, boxY + 22);

        // --- Itemized Table ---
        y = 145;
        doc.setFillColor(...secondaryColor);
        doc.rect(20, y, 170, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("DESCRIPTION / SERVICE", 25, y + 6.5);
        doc.text("SCHEDULE", 85, y + 6.5);
        doc.text("QTY", 145, y + 6.5);
        doc.text("TOTAL", 170, y + 6.5);

        y += 18;
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(`${b.sport} Court Reservation`, 25, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`Target Date: ${b.date}`, 25, y + 6);
        
        doc.setTextColor(30, 41, 59);
        doc.text(`${b.startTime} - ${b.endTime}`, 85, y);
        doc.text(`${b.hours} hour${b.hours > 1 ? 's' : ''}`, 145, y);
        
        doc.setFont("helvetica", "bold");
        doc.text(`Rs. ${b.total.toLocaleString()}`, 170, y);

        // Line
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(20, y + 15, 190, y + 15);

        // --- Totals ---
        y += 28;
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Subtotal", 140, y);
        doc.text(`Rs. ${b.total.toLocaleString()}`, 190, y, { align: "right" });
        
        y += 8;
        doc.text("Taxes (0%)", 140, y);
        doc.text("Rs. 0", 190, y, { align: "right" });
        
        y += 12;
        doc.setFillColor(241, 245, 249);
        doc.rect(130, y - 6, 60, 12, 'F');
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("TOTAL PAID", 135, y + 2);
        doc.text(`Rs. ${b.total.toLocaleString()}`, 185, y + 2, { align: "right" });

        // --- Footer Sections ---
        // --- Official Verified Seal (Code-drawn Red Stamp) ---
        const sealX = 50;
        const sealY = y + 15;
        doc.setDrawColor(220, 38, 38); // Official Stamp Red
        doc.setLineWidth(1.2);
        
        // Outer distressed circle effect
        doc.circle(sealX, sealY, 18, 'S');
        doc.setLineWidth(0.5);
        doc.circle(sealX, sealY, 16, 'S');
        
        // Rotated Stamp Text
        doc.setTextColor(220, 38, 38);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        
        // Draw text along a curve (simulated with rotation)
        doc.text("VERIFIED BY", sealX, sealY - 4, { align: "center", angle: 15 });
        doc.setFontSize(9);
        doc.text("SPORTSPHERE", sealX, sealY + 3, { align: "center", angle: 15 });
        
        // Optional: Add a small "official" star or icon
        doc.setFontSize(6);
        doc.text("ORIGINAL DOCUMENT", sealX, sealY + 8, { align: "center", angle: 15 });

        // Signature Line
        doc.setDrawColor(203, 213, 225);
        doc.line(130, y + 40, 190, y + 40);
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text("AUTHORIZED SIGNATORY", 143, y + 45);

        // Terms
        y = 255;
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.setFont("helvetica", "bold");
        doc.text("TERMS & CONDITIONS", 20, y);
        doc.setFont("helvetica", "normal");
        doc.text("1. This receipt is only valid for the specified date and time slot.", 20, y + 5);
        doc.text("2. Cancellations must be made at least 24 hours in advance.", 20, y + 10);
        doc.text("3. Proper sports attire and shoes are mandatory at the venue.", 20, y + 15);
        
        doc.setFont("helvetica", "italic");
        doc.text("Thank you for choosing SportSphere!", 105, 275, { align: "center" });
        
        doc.save(`Receipt_${b.id}.pdf`);
        showToast("📄 Professional PDF Receipt Downloaded!");

    } catch (e) {
        console.error("PDF Error:", e);
        showToast("❌ PDF Generation Failed. Please try again.");
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await loadSlots();
    myBookings = await loadBookings();
    renderCenters();
    renderMyBookings();
});
