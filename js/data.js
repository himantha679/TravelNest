/* ============================================================
   TravelNest - Destination Data
   All destination information is stored here as a JavaScript
   array of objects. Each page imports this file.
   ============================================================ */

const destinations = [
    {
        id: 1,
        name: "Paris",
        country: "France",
        continent: "Europe",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop&auto=format",
        description: "Paris, the City of Light, is one of the most romantic and culturally rich cities in the world. Famous for its iconic architecture, world-class art museums, and incredible cuisine, Paris offers something special for every type of traveller. From the towering Eiffel Tower to the charming streets of Montmartre, every corner tells a story.",
        attractions: ["Eiffel Tower", "The Louvre Museum", "Notre-Dame Cathedral", "Champs-Élysées", "Palace of Versailles"],
        costs: [
            { category: "Accommodation", budget: "£40/night", moderate: "£100/night", luxury: "£300+/night" },
            { category: "Meals (per day)", budget: "£15", moderate: "£35", luxury: "£100+" },
            { category: "Transport (per day)", budget: "£5", moderate: "£15", luxury: "£50+" },
            { category: "Attractions (per day)", budget: "£10", moderate: "£25", luxury: "£60+" }
        ],
        travelType: ["cultural", "relaxation"],
        budgetRange: ["medium", "high"],
        quote: "Paris is always a good idea."
    },
    {
        id: 2,
        name: "Tokyo",
        country: "Japan",
        continent: "Asia",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop&auto=format",
        description: "Tokyo is a city where ancient traditions and cutting-edge technology exist side by side. From serene temples and peaceful gardens to neon-lit streets and futuristic technology, Tokyo is a city of fascinating contrasts. It has one of the best food scenes in the world and is endlessly exciting to explore.",
        attractions: ["Senso-ji Temple", "Shibuya Crossing", "Tokyo Skytree", "Shinjuku Gyoen Garden", "Akihabara District"],
        costs: [
            { category: "Accommodation", budget: "£35/night", moderate: "£90/night", luxury: "£250+/night" },
            { category: "Meals (per day)", budget: "£10", moderate: "£30", luxury: "£80+" },
            { category: "Transport (per day)", budget: "£6", moderate: "£12", luxury: "£30+" },
            { category: "Attractions (per day)", budget: "£5", moderate: "£20", luxury: "£50+" }
        ],
        travelType: ["cultural", "adventure"],
        budgetRange: ["medium"],
        quote: "Tokyo is the future made real."
    },
    {
        id: 3,
        name: "Bali",
        country: "Indonesia",
        continent: "Asia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop&auto=format",
        description: "Bali is a tropical paradise known for its lush green rice terraces, ancient temples, and stunning beaches. It is a favourite for those seeking both adventure and total relaxation. The island has a unique spiritual culture, vibrant arts scene, and incredibly warm and welcoming locals.",
        attractions: ["Tegalalang Rice Terraces", "Uluwatu Temple", "Seminyak Beach", "Sacred Monkey Forest", "Mount Batur Volcano"],
        costs: [
            { category: "Accommodation", budget: "£15/night", moderate: "£50/night", luxury: "£150+/night" },
            { category: "Meals (per day)", budget: "£5", moderate: "£15", luxury: "£50+" },
            { category: "Transport (per day)", budget: "£3", moderate: "£10", luxury: "£30+" },
            { category: "Attractions (per day)", budget: "£5", moderate: "£15", luxury: "£40+" }
        ],
        travelType: ["relaxation", "nature", "adventure"],
        budgetRange: ["low", "medium"],
        quote: "Bali is not just a destination, it is a feeling."
    },
    {
        id: 4,
        name: "New York",
        country: "United States",
        continent: "North America",
        image: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=600&h=400&fit=crop&auto=format",
        description: "New York City, the city that never sleeps, is one of the most iconic destinations in the world. From the bright lights of Times Square to the peaceful paths of Central Park, New York is endlessly diverse. It is a global hub for culture, fashion, food, and entertainment.",
        attractions: ["Statue of Liberty", "Central Park", "Times Square", "The Metropolitan Museum of Art", "Brooklyn Bridge"],
        costs: [
            { category: "Accommodation", budget: "£80/night", moderate: "£180/night", luxury: "£500+/night" },
            { category: "Meals (per day)", budget: "£20", moderate: "£50", luxury: "£150+" },
            { category: "Transport (per day)", budget: "£5", moderate: "£20", luxury: "£80+" },
            { category: "Attractions (per day)", budget: "£10", moderate: "£30", luxury: "£100+" }
        ],
        travelType: ["cultural", "adventure"],
        budgetRange: ["medium", "high"],
        quote: "If you can make it there, you can make it anywhere."
    },
    {
        id: 5,
        name: "Cape Town",
        country: "South Africa",
        continent: "Africa",
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop&auto=format",
        description: "Cape Town is one of Africa's most beautiful cities, set dramatically at the foot of Table Mountain. It offers a stunning mix of landscapes, gorgeous beaches, and rich cultural heritage. Cape Town is a paradise for outdoor lovers, foodies, and anyone who appreciates breathtaking natural scenery.",
        attractions: ["Table Mountain National Park", "Boulders Beach Penguins", "Cape Point", "Robben Island", "V&A Waterfront"],
        costs: [
            { category: "Accommodation", budget: "£20/night", moderate: "£60/night", luxury: "£180+/night" },
            { category: "Meals (per day)", budget: "£8", moderate: "£20", luxury: "£60+" },
            { category: "Transport (per day)", budget: "£3", moderate: "£12", luxury: "£35+" },
            { category: "Attractions (per day)", budget: "£5", moderate: "£15", luxury: "£40+" }
        ],
        travelType: ["adventure", "nature"],
        budgetRange: ["low", "medium"],
        quote: "Cape Town is where the mountain meets the ocean."
    },
    {
        id: 6,
        name: "Rio de Janeiro",
        country: "Brazil",
        continent: "South America",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c71e?w=600&h=400&fit=crop&auto=format",
        description: "Rio de Janeiro is a vibrant city full of colour, music, and energy. Home to the famous Christ the Redeemer statue and the beautiful Copacabana beach, Rio captures the soul with its natural beauty and lively culture. The city is famous for its Carnival festival, samba rhythms, and warm hospitality.",
        attractions: ["Christ the Redeemer", "Copacabana Beach", "Sugarloaf Mountain", "Tijuca National Park", "Lapa Arches"],
        costs: [
            { category: "Accommodation", budget: "£20/night", moderate: "£55/night", luxury: "£160+/night" },
            { category: "Meals (per day)", budget: "£6", moderate: "£18", luxury: "£55+" },
            { category: "Transport (per day)", budget: "£3", moderate: "£10", luxury: "£30+" },
            { category: "Attractions (per day)", budget: "£5", moderate: "£20", luxury: "£50+" }
        ],
        travelType: ["adventure", "cultural"],
        budgetRange: ["low", "medium"],
        quote: "Rio is where the mountains meet the sea."
    },
    {
        id: 7,
        name: "Sydney",
        country: "Australia",
        continent: "Oceania",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
        description: "Sydney is Australia's most famous city and a world-class destination. Its iconic harbour, stunning beaches, and relaxed outdoor lifestyle make it one of the most desirable cities in the world. Sydney has a diverse food scene, rich indigenous culture, and endless activities for visitors of all ages.",
        attractions: ["Sydney Opera House", "Bondi Beach", "Sydney Harbour Bridge", "The Rocks Historic Area", "Taronga Zoo"],
        costs: [
            { category: "Accommodation", budget: "£50/night", moderate: "£120/night", luxury: "£350+/night" },
            { category: "Meals (per day)", budget: "£15", moderate: "£35", luxury: "£100+" },
            { category: "Transport (per day)", budget: "£5", moderate: "£15", luxury: "£50+" },
            { category: "Attractions (per day)", budget: "£10", moderate: "£25", luxury: "£70+" }
        ],
        travelType: ["relaxation", "adventure"],
        budgetRange: ["medium", "high"],
        quote: "Sydney shines from every angle."
    },
    {
        id: 8,
        name: "Dubai",
        country: "United Arab Emirates",
        continent: "Asia",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&auto=format",
        description: "Dubai is a dazzling city of superlatives — the tallest buildings, the largest malls, and the most spectacular experiences. It has transformed from a small trading port into one of the world's most glamorous destinations. Dubai blends traditional Arabian culture with ultra-modern luxury like nowhere else on earth.",
        attractions: ["Burj Khalifa", "The Dubai Mall", "Palm Jumeirah", "Dubai Creek and Souks", "Desert Safari Experience"],
        costs: [
            { category: "Accommodation", budget: "£60/night", moderate: "£150/night", luxury: "£500+/night" },
            { category: "Meals (per day)", budget: "£15", moderate: "£40", luxury: "£150+" },
            { category: "Transport (per day)", budget: "£5", moderate: "£20", luxury: "£80+" },
            { category: "Attractions (per day)", budget: "£10", moderate: "£40", luxury: "£120+" }
        ],
        travelType: ["relaxation", "adventure"],
        budgetRange: ["high"],
        quote: "Dubai — where dreams become skyscrapers."
    },
    {
        id: 9,
        name: "Barcelona",
        country: "Spain",
        continent: "Europe",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
        description: "Barcelona is a city full of art, stunning architecture, and Mediterranean charm. Home to the masterpieces of Antoni Gaudí, the lively La Rambla boulevard, and some of the best beaches in Europe, Barcelona delights all the senses. The food, nightlife, and cultural heritage here are all world-class.",
        attractions: ["Sagrada Família", "Park Güell", "La Rambla Boulevard", "Gothic Quarter", "Camp Nou Stadium"],
        costs: [
            { category: "Accommodation", budget: "£35/night", moderate: "£90/night", luxury: "£250+/night" },
            { category: "Meals (per day)", budget: "£12", moderate: "£28", luxury: "£80+" },
            { category: "Transport (per day)", budget: "£4", moderate: "£12", luxury: "£35+" },
            { category: "Attractions (per day)", budget: "£8", moderate: "£20", luxury: "£60+" }
        ],
        travelType: ["cultural", "relaxation"],
        budgetRange: ["medium"],
        quote: "Barcelona — where architecture tells stories."
    },
    {
        id: 10,
        name: "Machu Picchu",
        country: "Peru",
        continent: "South America",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop&auto=format",
        description: "Machu Picchu is one of the world's most awe-inspiring ancient sites, perched high in the Andes Mountains of Peru. This 15th-century Inca citadel is a UNESCO World Heritage Site and one of the New Seven Wonders of the World. The journey to reach it is just as memorable as the destination itself.",
        attractions: ["Sun Gate (Inti Punku)", "Temple of the Sun", "Classic Inca Trail Hike", "Huayna Picchu Mountain", "Sacred Plaza"],
        costs: [
            { category: "Accommodation", budget: "£15/night", moderate: "£45/night", luxury: "£120+/night" },
            { category: "Meals (per day)", budget: "£5", moderate: "£15", luxury: "£40+" },
            { category: "Transport (per day)", budget: "£5", moderate: "£15", luxury: "£40+" },
            { category: "Attractions (per day)", budget: "£15", moderate: "£25", luxury: "£50+" }
        ],
        travelType: ["adventure", "cultural"],
        budgetRange: ["low", "medium"],
        quote: "Machu Picchu — a city floating in the clouds."
    },
    {
        id: 11,
        name: "Santorini",
        country: "Greece",
        continent: "Europe",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop&auto=format",
        description: "Santorini is one of the most beautiful islands in the world, famous for its whitewashed buildings with blue-domed rooftops overlooking the stunning Aegean Sea. The island offers breathtaking sunsets, volcanic beaches, and delicious local cuisine. It is a perfect destination for romance and pure relaxation.",
        attractions: ["Oia Village Sunset", "Red Beach", "Akrotiri Archaeological Site", "Caldera Viewpoints", "Fira Town"],
        costs: [
            { category: "Accommodation", budget: "£45/night", moderate: "£120/night", luxury: "£400+/night" },
            { category: "Meals (per day)", budget: "£15", moderate: "£35", luxury: "£100+" },
            { category: "Transport (per day)", budget: "£5", moderate: "£15", luxury: "£40+" },
            { category: "Attractions (per day)", budget: "£5", moderate: "£20", luxury: "£60+" }
        ],
        travelType: ["relaxation", "cultural"],
        budgetRange: ["medium", "high"],
        quote: "Santorini — where every view is a painting."
    },
    {
        id: 12,
        name: "Maldives",
        country: "Maldives",
        continent: "Asia",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop&auto=format",
        description: "The Maldives is a tropical paradise in the Indian Ocean, made up of over 1,000 beautiful coral islands. It is world-famous for its overwater bungalows, crystal-clear turquoise lagoons, and abundant marine life. The Maldives is the ultimate destination for those seeking pure luxury and stunning natural beauty.",
        attractions: ["Overwater Bungalow Stays", "Snorkelling and Scuba Diving", "Male City Tour", "Dolphin Watching Cruise", "Underwater Restaurant"],
        costs: [
            { category: "Accommodation", budget: "£100/night", moderate: "£250/night", luxury: "£800+/night" },
            { category: "Meals (per day)", budget: "£20", moderate: "£60", luxury: "£200+" },
            { category: "Transport (per day)", budget: "£20", moderate: "£50", luxury: "£150+" },
            { category: "Attractions (per day)", budget: "£10", moderate: "£30", luxury: "£100+" }
        ],
        travelType: ["relaxation", "nature"],
        budgetRange: ["high"],
        quote: "The Maldives — paradise found."
    }
];

/* ============================================================
   Travel Quotes for the Home Page Hero Section
   ============================================================ */
const travelQuotes = [
    { text: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
    { text: "Travel is the only thing you can buy that makes you richer.", author: "Anonymous" },
    { text: "Adventure is worthwhile in itself.", author: "Amelia Earhart" },
    { text: "To travel is to live.", author: "Hans Christian Andersen" },
    { text: "Life is short and the world is wide.", author: "Simon Raven" },
    { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
    { text: "Travel makes one modest. You see what a tiny place you occupy in the world.", author: "Gustave Flaubert" },
    { text: "The journey not the arrival matters.", author: "T.S. Eliot" }
];
