"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, City
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
api = Blueprint('api', __name__)

@api.route("/signup", methods=["POST"])
def signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    city = request.json.get("city", None)
    country = request.json.get("country", None)
    if name is None or email is None or password is None:
        return jsonify({"msg": "Bad email or password"}), 401
    user = User(name=name, email=email, password=password, city=city, country=country)
    
    city = City.query.filter_by(name=city).first()
    print(city)
    if (not city):
     db.session.add(city)
    
    country = Country.query.filter_by(name=country).first()
    print(country)
    if (not country):
      db.session.add(country)

    db.session.add(user)  
    db.session.commit()
    #return jsonify([]), 200
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    return jsonify({"id": user.id, "username": user.username }), 200