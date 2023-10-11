import logging
import datetime
from logging.handlers import RotatingFileHandler

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://spm@localhost:8889/SBRP_G2T8"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_recycle": 299}

db = SQLAlchemy(app)

CORS(app)

app.logger.setLevel(logging.INFO)
handler = RotatingFileHandler("app.log", maxBytes=10000, backupCount=1)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)

ct = datetime.datetime.now()


class StaffDetails(db.Model):
    __tablename__ = "STAFF_DETAILS"

    staff_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    dept = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    biz_address = db.Column(db.String(255), nullable=False)
    sys_role = db.Column(db.Enum("staff", "hr", "manager", "inactive"), nullable=False)

    def __init__(
        self, staff_id, fname, lname, dept, email, phone, biz_address, sys_role
    ):
        self.staff_id = staff_id
        self.fname = fname
        self.lname = lname
        self.dept = dept
        self.email = email
        self.phone = phone
        self.biz_address = biz_address
        self.sys_role = sys_role

    def json(self):
        return {
            "staff_id": self.staff_id,
            "fname": self.fname,
            "lname": self.lname,
            "dept": self.dept,
            "email": self.email,
            "phone": self.phone,
            "biz_address": self.biz_address,
            "sys_role": self.sys_role,
        }


class RoleDetails(db.Model):
    __tablename__ = "ROLE_DETAILS"

    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(50), nullable=False)
    role_description = db.Column(db.String(50000), nullable=False)
    role_status = db.Column(db.Enum("active", "inactive"), nullable=False)

    def __init__(self, role_id, role_name, role_description, role_status):
        self.role_id = role_id
        self.role_name = role_name
        self.role_description = role_description
        self.role_status = role_status

    def json(self):
        return {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "role_description": self.role_description,
            "role_status": self.role_status,
        }


class SkillDetails(db.Model):
    __tablename__ = "SKILL_DETAILS"

    skill_id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(50), nullable=False)
    skill_status = db.Column(db.Enum("active", "inactive"), nullable=False)

    def __init__(self, skill_id, skill_name, skill_status):
        self.skill_id = skill_id
        self.skill_name = skill_name
        self.skill_status = skill_status

    def json(self):
        return {
            "skill_id": self.skill_id,
            "skill_name": self.skill_name,
            "skill_status": self.skill_status,
        }


class StaffReportingOfficer(db.Model):
    __tablename__ = "STAFF_REPORTING_OFFICER"

    staff_id = db.Column(db.Integer, primary_key=True)
    RO_id = db.Column(
        db.Integer, db.ForeignKey("STAFF_DETAILS.staff_id"), primary_key=True
    )

    def __init__(self, staff_id, RO_id):
        self.staff_id = staff_id
        self.RO_id = RO_id

    def json(self):
        return {"staff_id": self.staff_id, "RO_id": self.RO_id}


class StaffRoles(db.Model):
    __tablename__ = "STAFF_ROLES"

    staff_id = db.Column(db.Integer, primary_key=True)
    staff_role = db.Column(
        db.Integer, db.ForeignKey("ROLE_DETAILS.role_id"), primary_key=True
    )
    role_type = db.Column(db.Enum("primary", "secondary"), nullable=False)
    sr_status = db.Column(db.Enum("active", "inactive"), nullable=False)

    def __init__(self, staff_id, staff_role, role_type, sr_status):
        self.staff_id = staff_id
        self.staff_role = staff_role
        self.role_type = role_type
        self.sr_status = sr_status

    def json(self):
        return {
            "staff_id": self.staff_id,
            "staff_role": self.staff_role,
            "role_type": self.role_type,
            "sr_status": self.sr_status,
        }


class StaffSkills(db.Model):
    __tablename__ = "STAFF_SKILLS"

    staff_id = db.Column(
        db.Integer, db.ForeignKey("STAFF_DETAILS.staff_id"), primary_key=True
    )
    skill_id = db.Column(
        db.Integer, db.ForeignKey("SKILL_DETAILS.skill_id"), primary_key=True
    )
    ss_status = db.Column(db.Enum("active", "inactive"), nullable=False)

    def __init__(self, staff_id, skill_id, ss_status):
        self.staff_id = staff_id
        self.skill_id = skill_id
        self.ss_status = ss_status

    def json(self):
        return {
            "staff_id": self.staff_id,
            "skill_id": self.skill_id,
            "ss_status": self.ss_status,
        }


class RoleSkills(db.Model):
    __tablename__ = "ROLE_SKILLS"

    role_id = db.Column(
        db.Integer, db.ForeignKey("ROLE_DETAILS.role_id"), primary_key=True
    )
    skill_id = db.Column(
        db.Integer, db.ForeignKey("SKILL_DETAILS.skill_id"), primary_key=True
    )

    def __init__(self, role_id, skill_id, rs_status):
        self.role_id = role_id
        self.skill_id = skill_id

    def json(self):
        return {"role_id": self.role_id, "skill_id": self.skill_id}


class RoleListings(db.Model):
    __tablename__ = "ROLE_LISTINGS"

    role_listing_id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(
        db.Integer, db.ForeignKey("ROLE_DETAILS.role_id"), nullable=False)

    role_listing_desc = db.Column(db.String(50000))
    role_listing_source = db.Column(
        db.Integer, db.ForeignKey("STAFF_DETAILS.staff_id"), nullable=False
    )
    role_listing_open = db.Column(db.DateTime, nullable=False)
    role_listing_close = db.Column(db.DateTime, nullable=False)
    role_listing_creator = db.Column(
        db.Integer, db.ForeignKey("STAFF_DETAILS.staff_id"), nullable=False
    )
    role_listing_ts_create = db.Column(db.TIMESTAMP, nullable=False)
    role_listing_updater = db.Column(
        db.Integer, db.ForeignKey("STAFF_DETAILS.staff_id"), nullable=False
    )
    role_listing_ts_update = db.Column(db.TIMESTAMP, nullable=False)
    role_listing_type = db.Column(db.Enum("open", "closed"), nullable=False)
    role_listing_department = db.Column(db.String(50), nullable=False)
    role_listing_salary = db.Column(db.Integer, nullable=False)
    role_listing_location = db.Column(db.String(500), nullable=False)

    def __init__(
        self,
        role_listing_id,
        role_id,
        role_listing_desc,
        role_listing_source,
        role_listing_open,
        role_listing_close,
        role_listing_creator,
        role_listing_ts_create,
        role_listing_updater,
        role_listing_ts_update,
        role_listing_type,
        role_listing_department,
        role_listing_salary,
        role_listing_location,
    ):
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
        self.role_listing_type = role_listing_type
        self.role_listing_department = role_listing_department
        self.role_listing_salary = role_listing_salary
        self.role_listing_location = role_listing_location

    def json(self):
        return {
            "role_listing_id": self.role_listing_id,
            "role_id": self.role_id,
            "role_listing_desc": self.role_listing_desc,
            "role_listing_source": self.role_listing_source,
            "role_listing_open": self.role_listing_open,
            "role_listing_close": self.role_listing_close,
            "role_listing_creator": self.role_listing_creator,
            "role_listing_ts_create": self.role_listing_ts_create,
            "role_listing_updater": self.role_listing_updater,
            "role_listing_ts_update": self.role_listing_ts_update,
            "role_listing_type": self.role_listing_type,
            "role_listing_department": self.role_listing_department,
            "role_listing_salary": self.role_listing_salary,
            "role_listing_location": self.role_listing_location,
        }


class RoleApplications(db.Model):
    __tablename__ = "ROLE_APPLICATIONS"

    role_app_id = db.Column(db.Integer, primary_key=True)
    role_listing_id = db.Column(
        db.Integer, db.ForeignKey("ROLE_LISTINGS.role_listing_id"), nullable=False
    )
    staff_id = db.Column(
        db.Integer, db.ForeignKey("STAFF_DETAILS.staff_id"), nullable=False
    )
    role_app_status = db.Column(db.Enum("withdrawn", "applied"), nullable=False)
    role_app_ts_create = db.Column(db.TIMESTAMP, nullable=False)

    def __init__(
        self,
        role_listing_id,
        staff_id,
        role_app_status,
        role_app_ts_create,
    ):
        self.role_listing_id = role_listing_id
        self.staff_id = staff_id
        self.role_app_status = role_app_status
        self.role_app_ts_create = role_app_ts_create

    def json(self):
        return {
            "role_app_id": self.role_app_id,
            "role_listing_id": self.role_listing_id,
            "staff_id": self.staff_id,
            "role_app_status": self.role_app_status,
            "role_app_ts_create": self.role_app_ts_create,
        }

class LoginDetails(db.Model):
    __tablename__ = "LOGIN_DETAILS"

    staff_id = db.Column(db.Integer, db.ForeignKey("STAFF_DETAILS.staff_id"), primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    sys_role = db.Column(db.ForeignKey("STAFF_DETAILS.sys_role"), nullable=False)

    def __init__(self, staff_id, username, password, sys_role):
        self.staff_id = staff_id
        self.username = username
        self.password = password
        self.sys_role = sys_role

    def json(self):
        return {
            "staff_id": self.staff_id,
            "username": self.username,
            "password": self.password,
            "sys_role": self.sys_role,
        }

@app.route("/login/<string:username>/<string:password>")
def login(username, password):
    login_details = LoginDetails.query.filter_by(username=username, password=password).first()
    if login_details:
        return jsonify(
            {
                "code": 200,
                "data": login_details.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Invalid username or password"
        }
    ), 404

@app.route(
    "/rolelistings"
)  # This one is for HR, to get all role listings, including open, closed, expired, etc
def get_all():
    rolelistings = RoleListings.query.all()
    if len(rolelistings):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "rolelistings": [rolelisting.json() for rolelisting in rolelistings]
                },
            }
        )
    return jsonify({"code": 404, "message": "There are no role listings."}), 404

@app.route("/roledetails")  # This one is for HR, to get all role listings, including open, closed, expired, etc
def get_all_role_details():
    roleDetails = RoleDetails.query.all()
    if len(roleDetails):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "roleDetails": [roleDetails.json() for rolelisting in roleDetails]
                },
            }
        )
    return jsonify({"code": 404, "message": "There are no role details."}), 404


@app.route("/rolelistings_open")  # This is for staff, to see all open role listings
def get_all_open():
    rolelistings = RoleListings.query.filter_by(role_listing_open=True).all()
    if len(rolelistings):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "rolelistings": [rolelisting.json() for rolelisting in rolelistings]
                },
            }
        )
    return jsonify({"code": 404, "message": "There are no open role listings."}), 404


@app.route(
    "/create_role_listing/<int:role_listing_id>", methods=["POST"]
)  # This is for HR to create a new role listing
def create_role_listing(role_listing_id):
    if RoleListings.query.filter_by(role_listing_id=role_listing_id).first():
        return (
            jsonify(
                {
                    "code": 400,
                    "data": {"role_listing_id": role_listing_id},
                    "message": "Role already exists.",
                }
            ),
            400,
        )

    # data = request.get_json()  # HTTP JSON
    # rolelisting = RoleListings(role_listing_id, **data)
    desc = request.json.get("desc")
    appStartDate= request.json.get("appStartDate")
    appEndDate = request.json.get("appEndDate")

    appStartDate = datetime.strptime(appStartDate, '%Y-%m-%dT%H:%M')
    today = datetime.now()
    if appStartDate < today:
        return jsonify({
            "code": 400,
            "data": {
                "message": "DateTime cannot be in the past"
            }
        }), 400
    
    appEndDate = datetime.strptime(appEndDate, '%Y-%m-%dT%H:%M')
    if appEndDate < appStartDate:
        return jsonify({
            "code": 400,
            "data": {
                "message": "Application end date cannot be before start date"
            }
        }), 400
    
    rolelisting = RoleListings(
        role_listing_id = 1, 
        role_id = 234511581,
        role_listing_desc = desc,
        role_listing_source = 1,
        role_listing_open = appStartDate,
        role_listing_close = appEndDate,
        role_listing_creator = 1,
        role_listing_ts_create = ct.timestamp(),
        role_listing_updater = 1, 
        role_listing_ts_update = ct.timestamp()
    )

    try:
        db.session.add(rolelisting)
        db.session.commit()
    except Exception as e:
        logging.error(str(e))
        return (
            jsonify(
                {
                    "code": 500,
                    "data": {"role_listing_id": role_listing_id},
                    "message": "An error occurred creating the role.",
                }
            ),
            500,
        )

    return jsonify({"code": 201, "data": rolelisting.json()}), 201


@app.route(
    "/update_role_listing/<int:role_listing_id>", methods=["PUT"]
)  # This is for HR to update an existing role listing
def update_role_listing(role_listing_id):
    rolelisting = RoleListings.query.filter_by(role_listing_id=role_listing_id).first()
    if not rolelisting:
        return (
            jsonify(
                {
                    "code": 404,
                    "data": {"role_listing_id": role_listing_id},
                    "message": "Role listing not found.",
                }
            ),
            404,
        )

    data = request.get_json()
    if data["role_id"]:
        rolelisting.role_id = data["role_id"]
    if data["role_listing_desc"]:
        rolelisting.role_listing_desc = data["role_listing_desc"]
    if data["role_listing_source"]:
        rolelisting.role_listing_source = data["role_listing_source"]
    if data["role_listing_open"]:
        rolelisting.role_listing_open = data["role_listing_open"]
    if data["role_listing_close"]:
        rolelisting.role_listing_close = data["role_listing_close"]
    if data["role_listing_creator"]:
        rolelisting.role_listing_creator = data["role_listing_creator"]
    if data["role_listing_ts_create"]:
        rolelisting.role_listing_ts_create = data["role_listing_ts_create"]
    if data["role_listing_updater"]:
        rolelisting.role_listing_updater = data["role_listing_updater"]
    if data["role_listing_ts_update"]:
        rolelisting.role_listing_ts_update = data["role_listing_ts_update"]

    try:
        db.session.commit()
        return jsonify({"code": 200, "data": rolelisting.json()}), 200
    except Exception as e:
        logging.error(str(e))
        return (
            jsonify(
                {
                    "code": 500,
                    "data": {"role_listing_id": role_listing_id},
                    "message": "An error occurred while updating the role listing.",
                }
            ),
            500,
        )


@app.route(
    "/view_role_applicant_skills/<int:staff_id>"
)  # This is for HR to view the skills of a role applicant
def view_role_applicant_skills(staff_id):
    # Check if the applicant exists in STAFF_DETAILS
    applicant = StaffDetails.query.get(staff_id)
    if not applicant:
        return jsonify({"code": 404, "message": "Applicant not found."}), 404

    applicant_skills = (
        db.session.query(SkillDetails.skill_name)
        .join(StaffSkills, StaffSkills.skill_id == SkillDetails.skill_id)
        .join(StaffDetails, StaffDetails.staff_id == StaffSkills.staff_id)
        .join(RoleApplications, RoleApplications.staff_id == StaffDetails.staff_id)
        .all()
    )
    if len(applicant_skills):
        skill_names = [skill[0] for skill in applicant_skills]
        return jsonify({"code": 200, "data": {"applicant_skills": skill_names}})
    return jsonify({"code": 404, "message": "There are no skills."}), 404


@app.route(
    "/apply_for_role", methods=["POST"]
)  # This is for staff to apply for a role
def apply_for_role():
    data = request.get_json()

    # Extract role_listing_id and staff_id from the request data
    role_listing_id = data.get("role_listing_id")
    staff_id = data.get("staff_id")

    # Check if staff already applied for the role. If they already applied, prevent them from applying again
    existing_application = RoleApplications.query.filter_by(
        role_listing_id=role_listing_id, staff_id=staff_id
    ).first()
    if existing_application:
        return (
            jsonify(
                {
                    "code": 400,
                    "data": {"role_listing_id": role_listing_id, "staff_id": staff_id},
                    "message": "You already applied for the role.",
                }
            ),
            400,
        )

    # Create a new role application
    role_application = RoleApplications(**data)

    try:
        db.session.add(role_application)
        db.session.commit()
    except Exception as e:
        logging.error(str(e))
        return (
            jsonify(
                {
                    "code": 500,
                    "data": {"role_listing_id": role_listing_id, "staff_id": staff_id},
                    "message": "An error occurred creating the role application.",
                }
            ),
            500,
        )

    return jsonify({"code": 201, "data": role_application.json()}), 201


@app.route(
    "/withdraw_role_application/<int:role_app_id>/<int:staff_id>", methods=["PUT"]
)  # This is for staff to withdraw their application for a role
def withdraw_role_application(role_app_id, staff_id):
    data = request.get_json()

    # Extract role_listing_id and staff_id from the request data
    role_listing_id = data.get("role_listing_id")
    staff_id = data.get("staff_id")

    # Check if existing application. If not, no application to withdraw from
    existing_application = RoleApplications.query.filter_by(
        role_listing_id=role_listing_id, staff_id=staff_id
    ).first()
    if not existing_application:
        return (
            jsonify(
                {
                    "code": 400,
                    "data": {"role_listing_id": role_listing_id, "staff_id": staff_id},
                    "message": "Error. No application exists.",
                }
            ),
            400,
        )

    if data["role_app_id"]:
        existing_application.role_app_id = data["role_app_id"]
    if data["role_listing_id"]:
        existing_application.role_listing_id = data["role_listing_id"]
    if data["staff_id"]:
        existing_application.staff_id = data["staff_id"]
    if data["role_app_status"]:
        existing_application.role_app_status = data["role_app_status"]
    if data["role_app_ts_create"]:
        existing_application.role_app_ts_create = data["role_app_ts_create"]

    try:
        db.session.commit()
        return jsonify({"code": 200, "data": existing_application.json()}), 200
    except Exception as e:
        logging.error(str(e))
        return (
            jsonify(
                {
                    "code": 500,
                    "data": {"role_app_id": role_app_id, "staff_id": staff_id},
                    "message": "An error occurred while withdrawing from role application.",
                }
            ),
            500,
        )


"""
@app.route("/view_role_skill_match/<int:staff_id>/<int:role_listing_id>") #This is for staff to view the skills they lack for a role
def view_role_skill_match(staff_id, role_listing_id):
    # Check if the staff and role listing exist
    staff_id = StaffDetails.query.get(staff_id)
    role_listing_id = RoleListings.query.get(role_listing_id)
    
    if not staff_id or not role_listing_id:
        return jsonify(
            {
                "code": 404,
                "message": "Staff or role listing not found."
            }
        ), 404
    
    # Query to retrieve the skills needed for the role listing
    role_skills = db.session.query(SkillDetails.skill_name) \
    .join(RoleSkills, RoleSkills.skill_id == SkillDetails.skill_id) \
    .join(RoleDetails, RoleDetails.role_id == RoleSkills.role_id) \
    .join(RoleListings, RoleListings.role_id == RoleDetails.role_id) \
    .all()
    
    # Query to retrieve the staff's skills
    staff_skills = db.session.query(SkillDetails.skill_name) \
    .join(StaffSkills, StaffSkills.skill_id == SkillDetails.skill_id) \
    .join(StaffDetails, StaffDetails.staff_id == StaffSkills.staff_id) \
    .all()

    role_skill_names = [skill[0] for skill in role_skills]
    staff_skill_names = [skill[0] for skill in staff_skills]

     # Identify skills lacking in the staff's skill set
    lacking_skills = list(set(role_skill_names) - set(staff_skill_names))

    return jsonify(
        {
            "code": 200,
            "data": {
                "staff_id": staff_id,
                "role_listing_id": role_listing_id,
                "role_skills": role_skill_names,
                "staff_skills": staff_skill_names,
                "lacking_skills": lacking_skills
            }
        }
    ), 200
"""
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
