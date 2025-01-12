from pymongo import MongoClient

# Set up MongoDB connection
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)

# Access the database
db = client["quiz_app"]

# Export the database object
def get_db():
    return db
