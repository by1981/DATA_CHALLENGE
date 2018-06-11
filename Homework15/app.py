# import necessary libraries
import numpy as np
import pandas as pd
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    )
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, MetaData, Table
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Session

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///belly_button_biodiversity.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Samples = Base.classes.samples
Otu = Base.classes.otu
Samples_Metadata = Base.classes.samples_metadata
session = Session(engine)

@app.route('/otu')
def otu():
    # define SQL query
    sql_query = "SELECT lowest_taxonomic_unit_found FROM otu"
    # convert query to DF
    df = pd.read_sql_query(sql_query, session.bind)
    # return the OTU descriptions list
    return jsonify(list(df["lowest_taxonomic_unit_found"]))
       
@app.route('/names')
def names():
    # define SQL query
    sql_query = "SELECT * FROM samples"
    # convert query to DF
    df = pd.read_sql_query(sql_query, session.bind)
    df.drop("otu_id", axis=1, inplace=True)
    # return the OTU descriptions list
    return jsonify(list(df.columns))
       
@app.route('/metadata/<sim>')
def metadata(sim):
    sel = [Samples_Metadata.SAMPLEID, Samples_Metadata.ETHNICITY,
           Samples_Metadata.GENDER, Samples_Metadata.AGE,
           Samples_Metadata.LOCATION, Samples_Metadata.BBTYPE]
    results = session.query(*sel).filter(Samples_Metadata.SAMPLEID == sim[3:]).all()
    sample_metadata = {}
    for result in results:
        sample_metadata["SAMPLEID"] = result[0]
        sample_metadata["ETHNICITY"] = result[1]
        sample_metadata["GENDER"] = result[2]
        sample_metadata["AGE"] = result[3]
        sample_metadata["LOCATION"] = result[4]
        sample_metadata["BBTYPE"] = result[5]
    sample_metadata
    return jsonify(sample_metadata)

@app.route('/wfreq/<sim>')
def wfreq(sim):
    results = session.query(Samples_Metadata.WFREQ).filter(Samples_Metadata.SAMPLEID == sim[3:]).all()
    sample_metadata = {}
    for result in results:
        sample_metadata["WFREQ"] = result[0]
    # return results    
    return jsonify(sample_metadata["WFREQ"])
# dataforpiechart=[]
@app.route('/samples/<sim>')
def samples(sim):
    sql_query1= "SELECT * FROM samples"
    df = pd.read_sql_query(sql_query1, session.bind)
    val=df[sim]
    df.drop("otu_id", axis=1, inplace=True)
    val1=(df[sim].sort_values(ascending =True))
    ind=sorted(range(len(val)), key=lambda k: val[k])
    return jsonify(list(ind),list(val1))


@app.route('/')
def home():
   return render_template("index.html")

if __name__ == "__main__":
    app.run()
