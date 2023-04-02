
from flask import Flask
from pprint import pprint
import pandas as pd
import flask

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
#Import dependencies
# from pymongo import MongoClient
#  # Create an instance of MongoClient
# mongo = MongoClient(port=27017)

##https://wonder.cdc.gov/mcd-icd10-provisional.html
##https://wonder.cdc.gov/nndss-annual-summary.html
##https://wonder.cdc.gov/controller/datarequest/D157;jsessionid=E78A21844EF96E56C2C9990D9F8F


app = Flask(__name__)
death_causes = pd.read_csv('death rates (2).txt', delimiter="\t")


# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return death_causes.to_json(orient='records')


# 4. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return flask.render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)




