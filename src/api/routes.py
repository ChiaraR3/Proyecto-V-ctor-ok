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

    if json is None or json == "":
        return jsonify("No JSON")
    return json

    name = json.get("name")
    country = Country(name=name)
    db.session.add(country)
    db.session.commit()
    return jsonify(country.serialize()),200

@api.route("/countries/<int:country_id>/cities", methods=["GET"])
def list_cities_for_each_country(country_id):
    country = Country.query.get(country_id)
    return jsonify(list(map(lambda city : city.serialize(), country.cities))),200

@api.route("/countries/<int:country_id>/cities/create", methods=["POST"])
def create_city_in_country(country_id):
    json = request.get_json()    

    if json is None or json == "":
        return jsonify("No JSON")
    return json

    name = json.get("name")
    country = Country.query.get(country_id)
    city = City(name=name)

    country.cities.append(city)
    db.session.add(city)
    db.session.commit()

    return jsonify(city.serialize()),200