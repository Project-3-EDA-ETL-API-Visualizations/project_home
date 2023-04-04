
from flask import Flask, jsonify, render_template, send_from_directory
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, sql
import os
import json 
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
# engines = create_engine("mysql+pymysql://user:pw@host/db", pool_pre_ping=True)

app = Flask(__name__)



# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return mdf.to_json()


# 4. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return render_template('index.html')

@app.route("/api/missions")
def mission():
    engine=create_engine('sqlite:///data/missions_data.sqlite')
    mdf = pd.read_sql('select * from missions_df', engine)
    print("Server received request for 'About' page...")
    return mdf.to_json(orient="records")

@app.route("/api/geojson/federal")
def federal():
    print("inside federal")
    with open(os.path.join("./Resources","Federal.geojson")) as f:
        data = json.load(f)
    return data

@app.route("/api/geojson/historical")
def historical():
    print("inside federal")
    with open(os.path.join("./Resources","Historical.geojson")) as f:
        data = json.load(f)
    return data

@app.route("/api/estancias")
def estancias():
    engine=create_engine('sqlite:///data/estancias_data.sqlite')
    edf = pd.read_sql('select * from estancias_df', engine)
    print("inside estancias")
    return edf.to_json(orient = "records")

if __name__ == "__main__":
    app.run(debug=True)


