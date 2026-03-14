/**
 * SportSphere Smart Semantic Brain (SSB) v2.0
 * 100% Client-Side Intelligence Engine
 * Features: Real-time Slot Awareness, Sports Trivia, Service Knowledge
 */
const SSB = {
    // 1. Deep Core Knowledge System
    knowledge: {
        tips: [
            "Warm up for 10 minutes to increase blood flow and prevent cramps.",
            "Hydrate! Drink 500ml water 2 hours before playing.",
            "Badminton tip: Hold the racket like you're shaking hands—not too tight!",
            "Futsal secret: Master the 'Sole Control' to keep the ball away from defenders.",
            "Cricket advice: Keep your head still and eyes on the ball at the point of contact.",
            "Swimming Pro Tip: Exhale slowly underwater to maintain a steady rhythm."
        ],
        services: {
            health: "Our 'Health Check' calculates your BMI and Target Cardio Zones to keep you safe.",
            reports: "We generate Major PDF Reports for your fitness journey tracking.",
            memories: "Upload match photos to your private 'Cloud Memory Vault' via the User Portal.",
            payments: "We support instant online Visa/Mastercard payments and 'Pay Later' at venue.",
            ai: "I am your SSB Assistant, providing 24/7 sports guidance."
        },
        problemSolving: "We replace chaotic manual bookings with AI-driven scheduling and ensure player safety with health analytics.",
        trivia: {
            "badminton": "Badminton is the second most popular sport in the world after football!",
            "cricket": "The longest cricket match lasted 9 days and nobody won!",
            "futsal": "Ronaldinho, Messi, and Pele all started their careers playing Futsal.",
            "football": "A single football player runs about 7 miles in a 90-minute game."
        }
    },

    // 2. Intelligence Engine
    process: function(query) {
        const text = query.toLowerCase();
        
        // --- 📡 Real-time Data Sync ---
        const centers = (typeof CENTERS !== 'undefined') ? CENTERS : [];
        const slotsData = (typeof CENTER_SLOTS !== 'undefined') ? CENTER_SLOTS : {};
        const customCenters = JSON.parse(localStorage.getItem('ss_custom_centers_v4') || "[]");
        const allCenters = [...centers, ...customCenters];

        // --- 🤖 Natural Conversation Triggers ---
        if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("ආයුබෝවන්")) {
            return "Hi there! I'm your SportSphere Elite Assistant. I can check real-time slots, give health tips, or find the best sports centers for you. What's on your mind?";
        }

        if (text.includes("how are you")) {
            return "I'm running at 100% capacity and ready to help you find your next game! How can I assist you today?";
        }

        // --- ⚙️ Service & Problem Solving Info ---
        if (text.includes("service") || text.includes("what you do") || text.includes("features")) {
            return "SportSphere offers: 1. Real-time Venue Booking, 2. Health & BMI Analysis, 3. Cloud Memory Vault for photos, and 4. Elite PDF Progress Reporting. We solve the chaos of manual bookings!";
        }

        if (text.includes("health") || text.includes("bmi") || text.includes("safety")) {
            return this.knowledge.services.health + " It's our special innovation to keep athletes safe.";
        }

        if (text.includes("report") || text.includes("pdf")) {
            return this.knowledge.services.reports;
        }

        if (text.includes("memory") || text.includes("photo") || text.includes("upload")) {
            return this.knowledge.services.memories;
        }

        // --- 🏟️ Real-time Venue & Slot Checker ---
        const sportsMap = {
            "tennis": ["tennis", "tenis", "tennis court"],
            "cricket": ["cricket", "criket", "crichet"],
            "badminton": ["badminton", "badminton court", "battminton"],
            "futsal": ["futsal", "futsul", "futzal"],
            "football": ["football", "soccer", "footbal"],
            "basketball": ["basketball", "basketbal"],
            "swimming": ["swimming", "swim", "pool"],
            "rugby": ["rugby", "rugbi"],
            "padel": ["padel", "paddel"],
            "pickleball": ["pickleball", "pikleball"]
        };

        let foundSport = null;
        for (const [key, variants] of Object.entries(sportsMap)) {
            if (variants.some(v => text.includes(v))) {
                foundSport = key;
                break;
            }
        }

        if (text.includes("slot") || text.includes("time") || text.includes("free") || text.includes("available") || text.includes("වේලාව")) {
            if (foundSport) {
                const matches = allCenters.filter(v => v.sports.some(s => s.toLowerCase().includes(foundSport)));
                if (matches.length > 0) {
                    const top = matches[0];
                    const slots = slotsData[top.id] || [];
                    const freeCount = slots.filter(s => !s.taken).length;
                    
                    if (freeCount > 0) {
                        return `Good news! ${top.name} has ${freeCount} slots available for ${foundSport} today. Would you like to book one now?`;
                    } else {
                        return `Currently, ${top.name} is fully booked for ${foundSport}, but I can find another venue nearby. Shall I?`;
                    }
                }
            }
            return "Which center or sport are you checking slots for? I can check real-time availability!";
        }

        // --- 🏅 Sports Trivia & Facts ---
        if (foundSport && (text.includes("fact") || text.includes("tell me about") || text.includes("know about"))) {
            return this.knowledge.trivia[foundSport] || `I love ${foundSport}! It's one of our most popular booked activities.`;
        }

        // --- 📍 Location & Search ---
        const cities = ["colombo", "kandy", "galle", "jaffna", "negombo", "matara", "kurunegala", "gampaha", "piliyandala"];
        const foundCity = cities.find(c => text.includes(c));

        if (foundCity && foundSport) {
            const matches = allCenters.filter(v => v.city.toLowerCase() === foundCity && v.sports.some(s => s.toLowerCase().includes(foundSport)));
            if (matches.length > 0) return `I found ${matches.length} spots for ${foundSport} in ${foundCity}. The top one is ${matches[0].name}. Use our Explore section to book!`;
            return `I couldn't find any ${foundSport} places in ${foundCity} right now, but I can check other cities for you.`;
        }

        if (foundCity) {
            const matches = allCenters.filter(v => v.city.toLowerCase() === foundCity);
            return `In ${foundCity}, we have ${matches.length} elite venues like ${matches.slice(0,2).map(m=>m.name).join(' and ')}.`;
        }

        if (foundSport) {
            const matches = allCenters.filter(v => v.sports.some(s => s.toLowerCase().includes(foundSport)));
            if (matches.length > 0) {
                return `For ${foundSport}, I highly recommend ${matches[0].name} in ${matches[0].city} or ${matches[1]?.name || 'checking our list'}. They are currently available for booking!`;
            }
            return `I know about ${foundSport}, but I couldn't find a specific center for it in our current list. Try another sport?`;
        }

        // --- 💰 Pricing ---
        if (text.includes("price") || text.includes("cost") || text.includes("cheap") || text.includes("මිල")) {
            return "Our venue prices starting from Rs. 800 per hour. Elite arenas range up to Rs. 6000. Which sport fits your budget?";
        }

        // --- 💡 Tips & Help ---
        if (text.includes("tip") || text.includes("advice") || text.includes("help") || text.includes("උදව්")) {
            return "Pro Tip: " + this.knowledge.tips[Math.floor(Math.random() * this.knowledge.tips.length)];
        }

        // --- 🌍 Fallback (Smart Guess) ---
        return "I can help you with real-time slots, venue locations, health safety tips, or general sports facts. Try asking 'Is there a free slot for badminton?'";
    }
};
