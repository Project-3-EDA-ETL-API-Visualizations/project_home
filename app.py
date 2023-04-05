
from flask import Flask, jsonify, render_template, send_from_directory
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, sql
import os
import json 

app = Flask(__name__)

alltables=create_engine("sqlite:///data/all_tables.db")

#  1.Define what to do when a user hits the /api/missions route
@app.route("/api/missions")
def mission():
    connection=alltables.connect()
    missions=pd.read_sql('select * from missions_data', con=connection)
    connection.close()
    return missions.to_json(orient="records")

# 2.Define what to do when a user hits the /api/estancias route
@app.route("/api/estancias")
def estancias():
    connection=alltables.connect()
    estancias=pd.read_sql('select * from estancias_data', con=connection)
    connection.close()
    return estancias.to_json(orient="records")

# 3.Define what to do when a user hits the /api/asistancias route
@app.route("/api/asistencias")
def asistencias():
    connection=alltables.connect()
    asistencias=pd.read_sql('select * from asistencias_data', con=connection)
    connection.close()
    return asistencias.to_json(orient="records")

# 4.Define what to do when a user hits the /api/geojson/federal route   
@app.route("/api/geojson/federal")
def federal():
    print("inside federal")
    with open(os.path.join("./Resources","Federal.geojson")) as f:
        data = json.load(f)
    return data

# 5.Define what to do when a user hits the /api/geojson/historical route
@app.route("/api/geojson/historical")
def historical():
    print("inside federal")
    with open(os.path.join("./Resources","Historical.geojson")) as f:
        data = json.load(f)
    return data

# 6. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return render_template('index.html')

@app.route("/home")
def home():
    print("Server received request for 'Home' page...")
    return render_template('index2.html')

if __name__ == "__main__":
    app.run(debug=True)


