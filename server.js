
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");


const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/test", (req, res) => {
    res.send("Express is working!");
});

app.post("/test-post", (req, res) => {
    res.json({
        message: "POST request is working!"
    });
});

app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

app.get("/", (req, res) => {
    res.send("Shared Login API is running!");
});


pool.query("SELECT NOW()")
    .then(() => {
        console.log("PostgreSQL connected successfully!");

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
