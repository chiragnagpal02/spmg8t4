from flask import Blueprint, request, jsonify, render_template

tryme = Blueprint('tryme', __name__, url_prefix='/tryme')



@tryme.route('/')
def index():
    """
    A decorator that defines the route for the index page.
    Returns a string that says "Hello, tryme!".
    """
    return "Hello, tryme!"