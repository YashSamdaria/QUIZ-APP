from flask import Flask
from database import get_db  # Import the function to get the database object
from flask_cors import CORS  # Import the CORS extension to handle cross-origin requests
from flask import request, jsonify  # Import request for handling HTTP requests and jsonify for JSON responses

# Initialize the Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the app
CORS(app)

# Get the MongoDB database object
db = get_db()

# Route for the home page
@app.route('/')
def home():
    """
    Home route to confirm the application is running.
    """
    return "Welcome to the Quiz App!"


@app.route('/admin/add-question', methods=['POST'])
def add_question():
    """
    Endpoint to add a new question to the database and ensure the genre is unique.
    """
    try:
        # Parse the JSON data sent from the frontend
        new_question = request.get_json()
        
        # Add the current date to the question
     #   new_question['date'] = datetime.datetime.now()  # Add the current timestamp to the question

        # Access the "questions" collection and the "genres" collection
        questions_collection = db["questions"]
        genres_collection = db["genres"]

        # Check if the genre already exists in the genres collection
        genre = new_question.get("genre")
        if not genre:
            genre = "Random"

        if genre:
            # Insert the genre into the genres collection if it doesn't exist
            existing_genre = genres_collection.find_one({"genre": genre})
            if not existing_genre:
                genres_collection.insert_one({"genre": genre})
            

        # Insert the new question into the "questions" collection
        result = questions_collection.insert_one(new_question)

        # Return a success response with the inserted document ID
        return jsonify({"message": "Question added successfully", "id": str(result.inserted_id)}), 201

    except Exception as e:
        # Handle any errors that occur
        return jsonify({"error": str(e)}), 400

@app.route('/result', methods=['POST'])
def result():
    """
    Endpoint to save a user's quiz result to the database.
    """
    try:
        # Parse the JSON data sent from the frontend
        score = request.get_json()

        # Log the incoming request to inspect the data
        print("Received score:", score)

        # Check if the required fields are present
        if not score or "score" not in score or "total" not in score or "genre" not in score:
            return jsonify({"error": "Missing required fields"}), 400


        # Access the "score" collection in the database
        score_collection = db["score"]
        
        # Insert the score into the database
        result = score_collection.insert_one(score)

        # Return a success response with the inserted document ID
        return jsonify({"message": "Score added successfully", "id": str(result.inserted_id)}), 201

    except Exception as e:
        # Handle any errors that occur and log them
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 400

# Route for admin login
@app.route('/admin/login', methods=['POST'])
def admin_login():
    """
    Endpoint for admin login.
    """
    try:
        # Parse the JSON data sent from the frontend
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        # Validate email and password are provided
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Access the "users" collection in the database
        user_collection = db["users"]

        # Find the user by email
        user = user_collection.find_one({"email": email})

        # Check if the user exists
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Validate the password
        if user["password"] == password:
            return jsonify({"message": "Login successful."}), 200
        else:
            return jsonify({"error": "Invalid password"}), 401

    except Exception as e:
        # Handle any errors that occur
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/<genre>/questions', methods=['GET'])
def get_questions_by_genre(genre):
    """
    Endpoint to fetch questions by genre (genre passed as part of the URL).
    If the genre is 'Random', fetch 10 random questions from any genre.
    """
    try:
        # Access the "questions" collection in the database
        questions_collection = db["questions"]
        #genre = genre.lower()
        # Check if the genre is 'Random'
        if genre.lower() == "random":
            # Fetch 10 random questions from any genre
            questions = list(questions_collection.aggregate([
                {"$sample": {"size": 10}}
            ]))
        else:
            # Fetch 10 random questions for the specified genre, sorted by date
            questions = list(questions_collection.aggregate([{
"$match": {
            "genre": {
                "$regex": f"^{genre}$",  # Use the genre variable as a regex pattern
                "$options": "i"         # Make the match case-insensitive
            }
        }
    },
    {"$sort": {"date": -1}},  # Sort by the most recent first
    {"$sample": {"size": 10}}  # Get 10 random questions
]))

        # Convert ObjectId to string for JSON serialization
        for question in questions:
            question['_id'] = str(question['_id'])

        return jsonify(questions), 200

    except Exception as e:
        # Handle any errors that occur
        return jsonify({"error": str(e)}), 500


# Route to view all user scores
@app.route('/view-score', methods=['GET'])
def get_scores():
    """
    Endpoint to fetch all user scores, sorted by score in descending order.
    """
    try:
        # Access the "score" collection in the database
        user_scores_collection = db["score"]

        # Fetch all scores and sort them by score in descending order
        user_scores = list(user_scores_collection.find({}, {"_id": 0}).sort("score", -1).limit(15))

        return jsonify(user_scores), 200

    except Exception as e:
        # Handle any errors that occur
        return jsonify({"error": str(e)}), 500


# Route to view all genres
@app.route('/genres', methods=['GET'])
def genres():
    """
    Endpoint to fetch all genres from the database.
    """
    try:
        # Access the "genres" collection in the database
        genres_collection = db["genres"]

        # Fetch all genres and return them as a list
        genres = list(genres_collection.find({}, {"_id": 0, "genre": 1}))  # Fetch only the 'genre' field

        # Extract genre names from the fetched documents
        genre_list = [genre["genre"] for genre in genres]

        return jsonify({"genres": genre_list}), 200

    except Exception as e:
        # Handle any errors that occur
        return jsonify({"error": str(e)}), 500


# Run the Flask application
if __name__ == "__main__":
    app.run(debug=True)
