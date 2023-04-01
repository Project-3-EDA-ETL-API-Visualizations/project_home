
from flask import Flask, jsonify, render_template
import sqlalchemy as sql
#IF YOU WANT TO USE SQL POSTGRES YOU CAN USE THIS CODE TO CONNECT TO SERVER
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func
# from flask import jsonify
# engine = create_engine(
#     "postgresql://postgres:Gallito123!@localhost:5433"
# )
# session = Session(engine)
# 2. Create an app, being sure to pass __name__

########################
#IF YOU WANT TO USE MongoDB USE THIS CODE
# Import dependencies
# from pymongo import MongoClient
#  # Create an instance of MongoClient
# mongo = MongoClient(port=27017)

app = Flask(__name__)



# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return "Welcome to my 'Home' page!"


# 4. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)

