from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

CORS(app)

class RoleListings(db.Model):
    __tablename__ = 'ROLE_LISTINGS'

    role_listing_id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('ROLE_DETAILS.role_id'), nullable=False)
    role_listing_desc = db.Column(db.String(50000))
    role_listing_source = db.Column(db.Integer, db.ForeignKey('STAFF_DETAILS.role_listing_source'), nullable=False)
    role_listing_open = db.Column(db.DateTime, nullable=False)
    role_listing_close = db.Column(db.DateTime, nullable=False)
    role_listing_creator = db.Column(db.Integer, db.ForeignKey('STAFF_DETAILS.role_listing_creator'), nullable=False)
    role_listing_ts_create = db.Column(db.TIMESTAMP, nullable=False)
    role_listing_updater = db.Column(db.Integer, db.ForeignKey('STAFF_DETAILS.role_listing_updater'), nullable=False)
    role_listing_ts_update = db.Column(db.TIMESTAMP, nullable=False)

    def __init__(self, role_listing_id, role_id, role_listing_desc, role_listing_source, role_listing_open, role_listing_close, role_listing_creator, role_listing_ts_create, role_listing_updater, role_listing_ts_update):
        self.role_listing_id = role_listing_id
        self.role_id = role_id
        self.role_listing_desc = role_listing_desc
        self.role_listing_source = role_listing_source
        self.role_listing_open = role_listing_open
        self.role_listing_close = role_listing_close
        self.role_listing_creator = role_listing_creator
        self.role_listing_ts_create = role_listing_ts_create
        self.role_listing_updater = role_listing_updater
        self.role_listing_ts_update = role_listing_ts_update

    def json(self):
        return {"role_listing_id": self.role_listing_id, "role_id": self.role_id, "role_listing_desc": self.role_listing_desc, "role_listing_source": self.role_listing_source, "role_listing_open": self.role_listing_open, "role_listing_close": self.role_listing_close, "role_listing_creator": self.role_listing_creator, "role_listing_ts_create": self.role_listing_ts_create, "role_listing_updater": self.role_listing_updater, "role_listing_ts_update": self.role_listing_ts_update}
    
@app.route("/rolelistings") #This one is for HR, to get all role listings, including open, closed, expired, etc
def get_all():
    rolelistings = RoleListings.query.all()
    if len(rolelistings):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "rolelistings": [rolelisting.json() for rolelisting in rolelistings]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no role listings."
        }
    ), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)