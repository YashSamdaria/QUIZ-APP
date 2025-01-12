from flask import Flask
from database import get_db
from flask_cors import CORS  # Import the CORS extension
from flask import request, jsonify

# Initialize Flask app
app = Flask(__name__)
CORS(app)

db = get_db()

@app.route('/')
def home():
    return "Welcome to the Quiz App!"


@app.route('/admin/add-question', methods=['POST'])
def add_question():
    try:
        # Get the JSON data sent from the frontend
        new_question = request.get_json()

        # Access your MongoDB collection (e.g., "questions")
        questions_collection = db["questions"]

        # Insert the new question into the database
        result = questions_collection.insert_one(new_question)

        # Return a success response
        return jsonify({"message": "Question added successfully", "id": str(result.inserted_id)}), 201

    except Exception as e:
        # Handle any errors that may occur
        return jsonify({"error": str(e)}), 400

@app.route('/result', methods=['POST'])
def result():
    try:
        # Get the JSON data sent from the frontend
        score = request.get_json()
        score_collection = db["score"]
        result = score_collection.insert_one(score)

        # Return a success response
        return jsonify({"message": "Question added successfully", "id": str(result.inserted_id)}), 201

    except Exception as e:
        # Handle any errors that may occur
        return jsonify({"error": str(e)}), 400

@app.route('/admin/login', methods=['POST'])
def admin_login():
    try:
        # Get the JSON data sent from the frontend
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Connect to the users collection in MongoDB
        user_collection = db["users"]
        user = user_collection.find_one({"email": email})

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Validate the password directly
        if user["password"] == password:
            return jsonify({"message": "Login successful."}), 200
        else:
            return jsonify({"error": "Invalid password"}), 401

    except Exception as e:
        # Handle any errors that may occur
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/questions', methods=['GET'])
def questions():
    try:
        questions_collection = db["questions"]  # Replace with your collection name
        
        # Use aggregation to get 10 random questions
        random_questions = list(questions_collection.aggregate([
            {"$sample": {"size": 10}}  # Randomly select 10 questions
        ]))
        
        # Convert _id to string from object
        for question in random_questions:
            question['_id'] = str(question['_id']) 

        return jsonify(random_questions), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error if something goes wrong

@app.route('/view-score', methods=['GET'])
def get_scores():
    try:
        user_scores_collection = db["score"]  # Replace with your collection name
        # Fetch all user scores from the MongoDB collection
        users_scores = list(user_scores_collection.find({}, {"_id": 0}).sort("score", -1))
        # Return the fetched scores as JSON
        return jsonify(users_scores), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error if something goes wrong


if __name__ == "__main__":
    app.run(debug=True)
