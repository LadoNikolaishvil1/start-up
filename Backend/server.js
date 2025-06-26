import express from "express";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
  {
    userType: "influencer",
    username: "travel_with_anna",
    email: "anna.influencer@example.com",
    password: "hashed_password_123",
    socialHandle: "@travel_with_anna",
    category: "Travel",
    followers: 85400,
    bio: "Exploring the world one photo at a time 🌍",
    profilePicture:
      "https://tse1.mm.bing.net/th?id=OIP.DNSbdYCjSZX5xkEj41a3YAHaHa&pid=Api&P=0&h=220",
    location: "Barcelona, Spain",
    website: "https://travelwithanna.com",
    interests: ["photography", "sustainable travel", "backpacking"],
    lookingFor: ["Brand Deals", "Adventure Gear Sponsors"],
    createdAt: "2025-06-01T10:15:00Z",
  },
  {
    userType: "company",
    username: "eco_sips",
    email: "marketing@ecosips.com",
    password: "secure_password_456",
    socialHandle: "@eco_sips",
    category: "Eco Products",
    bio: "Sustainable drinkware for a greener planet 🌱",
    profilePicture:
      "https://tse1.mm.bing.net/th?id=OIP.DNSbdYCjSZX5xkEj41a3YAHaHa&pid=Api&P=0&h=220",
    location: "Portland, USA",
    website: "https://ecosips.com",
    interests: ["green living", "plastic-free", "eco marketing"],
    lookingFor: ["Micro Influencers", "Eco-conscious creators"],
    createdAt: "2025-05-15T08:30:00Z",
  },
  {
    userType: "influencer",
    username: "fitness.luke",
    email: "luke.fit@example.com",
    password: "fitpass789",
    socialHandle: "@fitness.luke",
    category: "Fitness",
    followers: 120000,
    bio: "Daily workouts and motivation 💪",
    profilePicture:
      "https://tse1.mm.bing.net/th?id=OIP.DNSbdYCjSZX5xkEj41a3YAHaHa&pid=Api&P=0&h=220",
    location: "London, UK",
    website: "https://lukefitness.com",
    interests: ["HIIT", "nutrition", "brand sponsorships"],
    lookingFor: ["Apparel Brands", "Fitness Equipment Collabs"],
    createdAt: "2025-06-10T13:45:00Z",
  },
];

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Start-Up Website Backend!");
});

app.get("/api", (req, res) => {
  res.json({
    message: "This is the API endpoint for the Start-Up Website Backend.",
    status: "success",
  });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});
