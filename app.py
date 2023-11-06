import logging
from datetime import datetime
from logging.handlers import RotatingFileHandler
import datetime
import requests
import random
import string

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS


app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("dbURL")


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
        db.Integer, db.ForeignKey("ROLE_DETAILS.role_id"), nullable=False
    )

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

    staff_id = db.Column(
        db.Integer, db.ForeignKey("STAFF_DETAILS.staff_id"), primary_key=True
    )
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
    login_details = LoginDetails.query.filter_by(
        username=username, password=password
    ).first()
    if login_details:
        return jsonify({"code": 200, "data": login_details.json()}), 200
    return jsonify({"code": 404, "message": "Invalid username or password"}), 404


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

@app.route("/staffdetails")
def get_all_staff():
    staffs = StaffDetails.query.all()
    if len(staffs):
        return jsonify(
            {
                "code": 200,
                "data": {"staff": [staff.json() for staff in staffs]},
            }
        )
    return jsonify({"code": 404, "message": "There are no staff."}), 404

@app.route("/roledetails")
def get_all_roles():
    roles = RoleDetails.query.all()
    if len(roles):
        return jsonify(
            {
                "code": 200,
                "data": {"roles": [role.json() for role in roles]},
            }
        )
    return jsonify({"code": 404, "message": "There are no roles."}), 404


@app.route("/listingdetailsall")
def get_all_listing_details():
    extra_details = []
    less_details = []
    final_list = []
    input_format = "%a, %d %b %Y %H:%M:%S %Z"

    listings_all_info = [role for role in RoleListings.query.all()]
    listings_less_info = RoleDetails.query.all()

    for i in range(len(listings_all_info)):
        extra_details.append(listings_all_info[i].json())
        less_details.append(listings_less_info[i].json())

    for role_dict in less_details:
        role_list = {}
        role_id = role_dict["role_id"]

        for role_dict_2 in extra_details:
            if role_dict_2["role_id"] == role_id:
                role_list["id"] = role_dict_2["role_id"]
                role_list["listing_id"] = role_dict_2["role_listing_id"]
                role_list["name"] = role_dict["role_name"]
                role_list["description"] = role_dict["role_description"]
                role_list["status"] = role_dict["role_status"]
                role_list["department"] = role_dict_2["role_listing_department"]
                role_list["source"] = role_dict_2["role_listing_source"]
                role_list["open_date"] = role_dict_2["role_listing_open"]
                role_list["close_date"] = role_dict_2["role_listing_close"]
                role_list["creator_id"] = role_dict_2["role_listing_creator"]
                role_list["updater_id"] = role_dict_2["role_listing_updater"]
                role_list["location"] = role_dict_2["role_listing_location"]
                role_list["salary"] = role_dict_2["role_listing_salary"]

                final_list.append(role_list)

    return jsonify({"code": 200, "data": {"final_list": final_list}}), 200


@app.route("/roledetailsall")
def get_all_role_details():
    final_list = []
    role_list = []
    role_details = RoleDetails.query.all()

    for i in range(len(role_details)):
        role_list.append(role_details[i].json())

    for role_details in role_list:
        role_list = {}

        role_list["role_id"] = role_details["role_id"]
        role_list["name"] = role_details["role_name"]
        role_list["description"] = role_details["role_description"]
        role_list["status"] = role_details["role_status"]

        final_list.append(role_list)

    return jsonify({"code": 200, "data": {"final_list": final_list}}), 200


@app.route("/listing/<int:role_listing_id>")
def get_listing_details(role_listing_id):
    # I want to call an endpoint that returns the role listing details - /listingdetailsall - and then return the details of the role listing with the role_listing_id

    # Get all the role listing details
    all_listings = requests.get(
        "http://127.0.0.1:5000/listingdetailsall"
    ).json()  # This is a list of dictionaries

    # Get the role listing details with the role_listing_id
    for listing in all_listings["data"]["final_list"]:
        if listing["listing_id"] == role_listing_id:
            return jsonify({"code": 200, "data": listing})
        
@app.route("/get_role_listing/<int:role_listing_id>")
def get_role_listing(role_listing_id):
    # I want to call an endpoint that returns the role listing details - /listingdetailsall - and then return the details of the role listing with the role_listing_id

    # Get all the role listing details
    all_listings = requests.get(
        "http://127.0.0.1:5000/rolelistings"
    ).json()  # This is a list of dictionaries

    # Get the role listing details with the role_listing_id
    if not all_listings:    
       return jsonify({"code": 404, "message": "Role listing not found."}), 404
    else:
        for listing in all_listings["data"]['rolelistings']:
            print("Listing: ", listing)
            print(role_listing_id)
            if listing["role_id"] == role_listing_id:
                return jsonify({"code": 200, "data": listing})
    


@app.route("/details/<int:role_id>")
def get_role_details_by_id(role_id):
    # I want to call an endpoint that returns the role listing details - /listingdetailsall - and then return the details of the role listing with the role_listing_id

    # Get all the role listing details
    all_role_details = requests.get(
        "http://127.0.0.1:5000/roledetailsall"
    ).json()  # This is a list of dictionaries

    # Get the role listing details with the role_listing_id
    for role_detail in all_role_details["data"]["final_list"]:

        if role_detail["role_id"] == role_id:
            return jsonify(
                {
                    "code": 200,
                    "data": role_detail
                }
            )
        


@app.route("/openingsbydept")
def get_openings_by_dept():
    # Get all the role listing details
    all_listings = requests.get(
        "http://127.0.0.1:5000/listingdetailsall"
    ).json()  # This is a list of dictionaries

    # get all unique departments
    departments = []
    for listing in all_listings["data"]["final_list"]:
        if listing["department"] not in departments:
            departments.append(listing["department"])

    # get the number of openings for each department
    openings_by_dept = []
    for department in departments:
        openings = {}
        openings["name"] = department
        openings["openings"] = 0
        for listing in all_listings["data"]["final_list"]:
            if listing["department"] == department:
                openings["openings"] += 1
        openings_by_dept.append(openings)

    return jsonify({"code": 200, "data": openings_by_dept}), 200


@app.route("/rolelistings_open")  # This is for staff, to see all open role listings
def get_all_open():
    rolelistings = RoleListings.query.filter_by(role_listing_type="open").all()
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

def generate_random_role_listing_id():
    while True:
        # Generate a random ID, for example, a 10-character integer 

        random_id = random.randint(1, 100000)
        
        # random_id = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
        

        # Check if the generated ID already exists in the database
        if not RoleListings.query.filter_by(role_listing_id=random_id).first():
            return random_id


@app.route("/create_role_listing/<int:role_id>/<int:staff_id>", methods=["POST"])  # This is for HR to create a new role listing
def create_role_listing(role_id, staff_id):

    new_role_listing_id = generate_random_role_listing_id()

    if RoleListings.query.filter_by(role_listing_id=new_role_listing_id).first():
        return (
            jsonify(
                {
                    "code": 400,
                    "data": {"role_listing_id": new_role_listing_id},
                    "message": "Role already exists.",
                }
            ),
            400,
        )
    
    print(request.json)
    
    listing_desc = request.json.get("listing_desc")
    appStartDate= request.json.get("appStartDate")
    appEndDate = request.json.get("appEndDate")
    appStartDate = datetime.datetime.strptime(appStartDate, "%Y-%m-%d")
    appEndDate = datetime.datetime.strptime(appEndDate, "%Y-%m-%d")
    role_listing_type = request.json.get("listing_type")
    print(role_listing_type)
    role_listing_type = role_listing_type.lower()

    role_listing_department = request.json.get("department")
    role_listing_salary = request.json.get("salary")
    role_listing_salary = int(role_listing_salary)
    role_listing_location = request.json.get("location")
    role_listing_source_manager = request.json.get("role_listing_source")

    today = datetime.datetime.now()
    if appStartDate.date() < today.date():
        return (
            jsonify(
                {"code": 400, "data": {"message": "DateTime cannot be in the past"}}
            ),
            400,
        )


    if appEndDate.date() < appStartDate.date():
        return (
            jsonify(
                {
                    "code": 400,
                    "data": {
                        "message": "Application end date cannot be before start date"
                    },
                }
            ),
            400,
        )

    rolelisting = RoleListings(
        role_listing_id = new_role_listing_id, 
        role_id = role_id,
        role_listing_desc = listing_desc,
        role_listing_source = role_listing_source_manager,
        role_listing_open = appStartDate,
        role_listing_close = appEndDate,
        role_listing_creator = staff_id,
        role_listing_ts_create = datetime.datetime.now(),
        role_listing_updater = staff_id, 
        role_listing_ts_update = datetime.datetime.now(),
        role_listing_type = role_listing_type,
        role_listing_department = role_listing_department,
        role_listing_salary = role_listing_salary,
        role_listing_location = role_listing_location
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
                    "data": {"role_listing_id": new_role_listing_id},
                    "message": "An error occurred creating the role.",
                }
            ),
            500,
        )

    return jsonify({"code": 201, "data": rolelisting.json()}), 201


@app.route("/update_role_listing/<int:role_listing_id>", methods=["PUT"])  # This is for HR to update an existing role listing
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
    print(data)
    today = datetime.datetime.now()
    if data["role_listing_desc"]:
        rolelisting.role_listing_desc = data["role_listing_desc"]
    if data["role_listing_open"]:
        rolelistingopen = datetime.datetime.strptime(data["role_listing_open"], "%Y-%m-%d")
        if rolelistingopen.date() < today.date():
            return (
                jsonify(
                    {"code": 400, "data": {"message": "DateTime cannot be in the past"}}
                ),
                400,
            )
        else:
            rolelisting.role_listing_open = rolelistingopen
    if data["role_listing_close"]:
        rolelistingclose = datetime.datetime.strptime(data["role_listing_close"], "%Y-%m-%d")
        if rolelistingclose.date() < rolelistingopen.date():
            return (
                jsonify(
                    {
                        "code": 400,
                        "data": {
                            "message": "Application end date cannot be before start date"
                        },
                    }
                ),
                400,
            )
        else:
            rolelisting.role_listing_close = rolelistingclose
    if data["role_listing_updater"]:
        rolelisting.role_listing_updater = data["role_listing_updater"]
    rolelisting.role_listing_ts_update = datetime.datetime.now()
    if data["role_listing_type"]:
        rolelisting.role_listing_type = data["role_listing_type"]
    if data["role_listing_department"]:
        rolelisting.role_listing_department = data["role_listing_department"]
    if data["role_listing_source"]:
        rolelisting.role_listing_source = data["role_listing_source"]
    if data["role_listing_salary"]:
        rolelisting.role_listing_salary = data["role_listing_salary"]
    if data["role_listing_location"]:
        rolelisting.role_listing_location = data["role_listing_location"]

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

@app.route("/get_all_managers")
def get_all_managers():
    """
    Returns a JSON object containing details of all the managers in the database.
    If there are no managers, returns a JSON object with a 404 status code and a message.
    """
    managers = StaffDetails.query.filter_by(sys_role="manager")
    if not managers:
        return jsonify({"code": 404, "message": "There are no managers."}), 404
    
    # simplify the above logic and return all
    managers_list = [manager.json() for manager in managers]
    
    return jsonify(managers_list)

@app.route(
    "/get_role_applicant_skills/<int:role_listing_id>"
)  # This is for HR to view all role applicants' skills for a particular role
def get_role_applicant_skills(role_listing_id):
    # Join the necessary tables to retrieve role applications and applicant information
    role_applications = (
        db.session.query(
            RoleApplications,
            StaffDetails.fname,
            StaffDetails.lname,
            StaffDetails.email,
            RoleApplications.role_app_ts_create,
        )
        .join(StaffDetails, StaffDetails.staff_id == RoleApplications.staff_id)
        .filter(
            RoleApplications.role_listing_id == role_listing_id,
            RoleApplications.role_app_status == "applied",
        )
        .all()
    )

    if not role_applications:
        return jsonify({"code": 404, "message": "There are no role applications."}), 404
    # For each role application, retrieve the skills of the staff
    role_applications_data = []
    for role_app, fname, lname, email, role_app_ts_create in role_applications:
        staff_skills = (
            db.session.query(SkillDetails.skill_name)
            .join(StaffSkills, StaffSkills.skill_id == SkillDetails.skill_id)
            .filter(
                StaffSkills.staff_id == role_app.staff_id,
                StaffSkills.ss_status == "active",
                SkillDetails.skill_status == "active",
            )
            .all()
        )

        skills = [skill.skill_name for skill in staff_skills]

        role_app_data = {
            "fname": fname,
            "lname": lname,
            "email": email,
            "role_app_ts_create": role_app_ts_create,
            "skills": skills,
        }
        role_applications_data.append(role_app_data)

    return jsonify({"code": 200, "data": role_applications_data}), 200


@app.route(
    "/get_role_details/<int:role_listing_id>"
)  # This is for HR to view the details of a role
def get_role_details(role_listing_id):
    # Join the necessary tables to retrieve role details
    role_details = (
        db.session.query(
            RoleListings,
            RoleListings.role_listing_desc,
            RoleListings.role_listing_source,
            RoleListings.role_listing_open,
            RoleListings.role_listing_close,
            RoleListings.role_listing_type,
            RoleListings.role_listing_department,
            RoleListings.role_listing_salary,
            RoleListings.role_listing_location,
            RoleDetails.role_name,
            RoleDetails.role_description,
            RoleDetails.role_status,
            StaffDetails.fname,
            StaffDetails.lname,
            RoleListings.role_listing_source
        )
        .join(RoleDetails, RoleDetails.role_id == RoleListings.role_id)
        .join(StaffDetails, StaffDetails.staff_id == RoleListings.role_listing_source)
        .filter(RoleListings.role_listing_id == role_listing_id)
        .first()
    )

    if not role_details:
        return jsonify({"code": 404, "message": "Role not found."}), 404

    role_skills = (
    db.session.query(SkillDetails.skill_name)
    .join(RoleSkills, RoleSkills.skill_id == SkillDetails.skill_id)
    .filter(RoleSkills.role_id == role_details.RoleListings.role_id)
    .all()
    )

    skills_list = [skill[0] for skill in role_skills]
    
    role_details_data = {
        "role_listing_desc": role_details.role_listing_desc,
        "role_listing_open": role_details.role_listing_open,
        "role_listing_close": role_details.role_listing_close,
        "role_listing_type": role_details.role_listing_type,
        "role_listing_department": role_details.role_listing_department,
        "role_listing_salary": role_details.role_listing_salary,
        "role_listing_location": role_details.role_listing_location,
        "role_name": role_details.role_name,
        "role_description": role_details.role_description,
        "role_status": role_details.role_status,
        "name": role_details.fname + " " + role_details.lname,
        "role_listing_source": role_details.role_listing_source,
        "skills": skills_list
    }

    return jsonify({"code": 200, "data": role_details_data}), 200


@app.route("/apply_for_role", methods=["POST"])  # This is for staff to apply for a role
def apply_for_role():
    data = request.get_json()

    # Extract role_listing_id and staff_id from the request data
    role_listing_id = data.get("listing_id")
    staff_id = data.get("staff_id")
    role_app_status = "applied"
    role_app_ts_create = datetime.datetime.now()

    final_data = [role_listing_id, staff_id, role_app_status, role_app_ts_create]
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
    role_application = RoleApplications(final_data[0], final_data[1], final_data[2], final_data[3])

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


# Get required skills(skill_name) for a given role_id
@app.route("/get_required_skills/<int:role_id>", methods=["GET"])
def get_required_skills(role_id):
    try:
        # Query the database to retrieve skill_name for the given role_id
        skills = (
            db.session.query(SkillDetails.skill_name)
            .join(RoleSkills, SkillDetails.skill_id == RoleSkills.skill_id)
            .filter(RoleSkills.role_id == role_id)
            .all()
        )

        skill_names = [skill[0] for skill in skills]

        if skill_names:
            return jsonify({"code": 200, "data": {"skills": skill_names}})
        else:
            return jsonify({"code": 404, "message": "Skills not found"}), 404

    except Exception as e:
        return (
            jsonify(
                {
                    "code": 500,
                    "message": "An error occurred while retrieving skills",
                    "error": str(e),
                }
            ),
            500,
        )


# Get skills for staff based on staff_id
@app.route("/get_staff_skills/<int:staff_id>", methods=["GET"])
def get_staff_skills(staff_id):
    try:

        # Query the database to retrieve skills for the given staff_id
        #skills = db.session.query(SkillDetails.skill_name).join(
            #StaffSkills, SkillDetails.skill_id == StaffSkills.skill_id
        #).filter(StaffSkills.staff_id == staff_id, StaffSkills.ss_status == 'active').all() # Filter out inactive skills from staff skills NOT skill details

        skills = (
            db.session.query(SkillDetails.skill_name)
            .join(StaffSkills, SkillDetails.skill_id == StaffSkills.skill_id)
            .filter(StaffSkills.staff_id == staff_id)
            .all()
        )
        print(skills)

        if skills:
            skill_names = [
                skill[0] for skill in skills
            ]  # Extract skill names from the result
            return jsonify(
                {"code": 200, "data": {"staff_id": staff_id, "skills": skill_names}}
            )
        else:
            return (
                jsonify(
                    {"code": 404, "message": "Staff member not found or has no skills"}
                ),
                404,
            )

    except Exception as e:
        return (
            jsonify(
                {
                    "code": 500,
                    "message": "An error occurred while retrieving staff skills",
                    "error": str(e),
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
@app.route("/get_application_status/<int:staff_id>/<int:role_listing_id>", methods=["GET"])
def get_application_status(staff_id, role_listing_id):
    try:
        # Query the database to retrieve the application status for the given staff_id and role_listing_id
        application_status = (
            db.session.query(RoleApplications.role_app_status)
            .filter(
                RoleApplications.staff_id == staff_id,
                RoleApplications.role_listing_id == role_listing_id,
            )
            .first()
        )
        print(application_status)

        if application_status:
            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "staff_id": staff_id,
                        "role_listing_id": role_listing_id,
                        "application_status": application_status[0],
                    },
                }
            ), 200
        else:
            return (
                jsonify(
                    {
                        "code": 404,
                        "message": "Staff or role listing not found or no application found.",
                    }
                ),
                
            ), 400

    except Exception as e:
        return (
            jsonify(
                {
                    "code": 500,
                    "message": "An error occurred while retrieving application status",
                    "error": str(e),
                }
            ),
            500,
        )


# Get applied applications for a staff id 
@app.route("/get_applied_applications/<int:staff_id>", methods=["GET"])
def get_applied_applications(staff_id):
    try:
        # Query the database to retrieve the application status for the given staff_id and role_listing_id
        applied_applications = (
            db.session.query(RoleApplications.role_listing_id)
            .filter(
                RoleApplications.staff_id == staff_id,
                RoleApplications.role_app_status == "applied",
            )
            .all()
        )
        print(applied_applications)

        if applied_applications:
            applied_applications_list = [
                application[0] for application in applied_applications
            ]
            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "staff_id": staff_id,
                        "applied_applications": applied_applications_list,
                    },
                }
            ), 200
        else:
            return (
                jsonify(
                    {
                        "code": 404,
                        "message": "Staff or role listing not found or no application found.",
                    }
                ),
                404,
            )

    except Exception as e:
        return (
            jsonify(
                {
                    "code": 500,
                    "message": "An error occurred while retrieving application status",
                    "error": str(e),
                }
            ),
            500,
        )
 



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
