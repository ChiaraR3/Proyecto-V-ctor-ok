"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, City, Country
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
api = Blueprint('api', __name__)

@api.route("/countries", methods=["GET"])
def list_countries():
    countries = Country.query.all()
    return jsonify(list(map(lambda country : country.serialize(), countries))),200

@api.route("/countries/create", methods=["POST"])
def create_country():
    json = request.get_json()    

    if json is None:
        return jsonify("No JSON")
    
    name = json.get("name")
    country = Country(name=name)
    return jsonify(country.serialize()),200