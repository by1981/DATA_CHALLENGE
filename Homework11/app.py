import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
import pymysql
pymysql.install_as_MySQLdb()
import pandas as pd
import os
import matplotlib
matplotlib.use('nbagg')
from matplotlib import style
style.use('fivethirtyeight')
import matplotlib.pyplot as plt
import datetime as dt
import numpy as np
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
from flask import Flask, jsonify
from flask import request


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii_2.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement=Base.classes.measurement
Station=Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br>"
        f"/api/v1.0/<start>/<end><br/"

        
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    """Return a date and the precipitation for that day for a year """
    # Query station table
    plotting_data1=session.query(Measurement.date, Measurement.prcp).\
    group_by(Measurement.date).\
    order_by(Measurement.date.desc()).\
    filter(Measurement.date<='2017-05-01').\
    filter(Measurement.date>='2016-05-01').all()
    # Convert list of tuples into normal list
    all_results = []
    for prp in plotting_data1:
        prp_dict = {}
        prp_dict["date"] = prp.date
        prp_dict["prcp"] = prp.prcp
        all_results.append(prp_dict) 

    return jsonify(all_results)


@app.route("/api/v1.0/stations")
def stations():
    """Return a list of all station """
    # Query station table


    station_data=session.query(Station.station).all()
    all_stations=list(np.ravel(station_data))


    return jsonify(all_stations)

@app.route("/api/v1.0/tobs")
def tobs():
    """Return a list of all tobs """
    # Query station table


    tobs_data=session.query(Measurement.tobs).\
    group_by(Measurement.date).\
    order_by(Measurement.date.desc()).\
    filter(Measurement.date<='2017-05-01').\
    filter(Measurement.date>='2016-05-01').all()
    all_tobs=list(np.ravel(tobs_data))


    return jsonify( all_tobs)

min_temp=0
max_temp=0
avg_temp=0
def calc_temps(start_date, end_date):
    min_temp=session.query(func.min(Measurement.tobs)).\
    filter(Measurement.date<=end_date).\
    filter(Measurement.date>=start_date).all()
    max_temp=session.query(func.max(Measurement.tobs)).\
    filter(Measurement.date<=end_date).\
    filter(Measurement.date>=start_date).all()
    avg_temp=session.query(func.avg(Measurement.tobs)).\
    filter(Measurement.date<=end_date).\
    filter(Measurement.date>=start_date).all()
    return(min_temp, avg_temp, max_temp)

@app.route("/<start>/<end>")
def dater(start, end):
    """Return minimum, average and maximum temperature when both Start and End dates are given"""
    # Query Measurement table

    Trip_Start_Date= start
    Trip_End_Date=end
    tripstart_date = dt.datetime.strptime(Trip_Start_Date, "%Y-%m-%d")
    tripend_date = dt.datetime.strptime(Trip_End_Date, "%Y-%m-%d")
    MinAvgMaxTemp2=calc_temps(tripstart_date, tripend_date)
    ptp = list(np.ravel(MinAvgMaxTemp2))

    return jsonify(ptp)

@app.route("/<start>")
def dater2(start):
    """Return minimum, average and maximum temperature when Start date is given """
    # Query station table

    Trip_Start_Date= start
    Trip_End_Date='2017-08-23'
    tripstart_date = dt.datetime.strptime(Trip_Start_Date, "%Y-%m-%d")
    tripend_date = dt.datetime.strptime(Trip_End_Date, "%Y-%m-%d")
    MinAvgMaxTemp=calc_temps(tripstart_date, tripend_date)
    ptp = list(np.ravel(MinAvgMaxTemp))

    return jsonify(ptp)


if __name__ == '__main__':
    app.run(debug=True)

