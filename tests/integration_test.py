import unittest
import flask_testing
from datetime import datetime
import json
from sample_app import (
    sample_app,
    db,
    LoginDetails,
    StaffDetails,
    RoleDetails,
    RoleListings,
    StaffDetails,
    SkillDetails,
    StaffSkills,
    SkillDetails,
)


class TestApp(flask_testing.TestCase):
    sample_app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"
    sample_app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {}
    sample_app.config["TESTING"] = True

    def create_app(self):
        return sample_app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


class TestCreateLoginAccount(TestApp):
    def test_get_login_account_not_found(self):
        user = LoginDetails(
            staff_id=1, username="johndoestaff", password="pass", sys_role="staff"
        )
        username = "imran"
        password = "khan"

        response = self.client.get(f"/login/{username}/{password}")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json, {"code": 404, "message": "Invalid username or password"}
        )

    
class TestStaffDetails(TestApp):
    def test_get_staff_details_not_found(self):
        response = self.client.get(f"/staff_details")
        self.assertEqual(response.status_code, 404)

    def test_get_all_managers(self):
        response = self.client.get(f"/get_all_managers")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"code": 404, "message": "There are no managers."})

    def test_create_staff_members(self):
        manager = StaffDetails(
            staff_id= 1,
            fname= "TestFName",
            lname= "TestLName",
            dept= "IT",
            email= "email@example.com",
            phone= "12345678",
            biz_address= "123MainStreet",
            sys_role= "manager"
        )
    
        staff = StaffDetails(
            staff_id= 2,
            fname= "TestFName",
            lname= "TestLName",
            dept= "IT",
            email= "email@example.com",
            phone= "12345678",
            biz_address= "123MainStreet",
            sys_role= "staff"
        )
        
        hr = StaffDetails(
            staff_id= 3,
            fname= "TestFName",
            lname= "TestLName",
            dept= "IT",
            email= "email@example.com",
            phone= "12345678",
            biz_address= "123MainStreet",
            sys_role= "hr"
        )

        db.session.add(manager)
        db.session.add(staff)
        db.session.add(hr)
        db.session.commit()

        response = self.client.get(f"/staffdetails")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['data']['staff']), 3)

    def test_get_all_managers_only(self):
        manager = StaffDetails(
            staff_id= 1,
            fname= "TestFName",
            lname= "TestLName",
            dept= "IT",
            email= "email@example.com",
            phone= "12345678",
            biz_address= "123MainStreet",
            sys_role= "manager"
        )

        hr = StaffDetails(
            staff_id= 3,
            fname= "TestFName",
            lname= "TestLName",
            dept= "IT",
            email= "email@example.com",
            phone= "12345678",
            biz_address= "123MainStreet",
            sys_role= "hr"
        )

        db.session.add(manager)
        db.session.add(hr)
        db.session.commit()

        response = self.client.get(f"/get_all_managers")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json, [manager.json()])


class TestRoleDetails(TestApp):
    def test_create_role_detail(self):
        role1 = RoleDetails(
            role_id = 1,
            role_name = "Success Manager",
            role_description = "Success Manager",
            role_status = "active"
        )
        role2 = RoleDetails(
            role_id = 2,
            role_name = "Failure Manager",
            role_description = "Failure Manager",
            role_status = "inactive"
        )

        db.session.add(role1)
        db.session.add(role2)
        db.session.commit()

        response = self.client.get(f"/roledetails")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['data']['roles']), 2)

    def test_get_role_details_not_found(self):
        response = self.client.get(f"/roledetails")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"code": 404, "message": "There are no roles."})

class TestRoleListings(TestApp):
    def test_create_role_listing(self):
        staff = StaffDetails(
            staff_id= 2,
            fname= "TestFName",
            lname= "TestLName",
            dept= "IT",
            email= "email@example.com",
            phone= "12345678",
            biz_address= "123MainStreet",
            sys_role= "staff"
        )

        role = RoleDetails(
            role_id = 1,
            role_name = "Success Manager",
            role_description = "Success Manager",
            role_status = "active"
        )

        listings = RoleListings(
            role_listing_id = 1,
            role_id = 1,
            role_listing_desc = "This is just a random description",
            role_listing_source = 1,
            role_listing_open = datetime(2021, 9, 1, 0, 0, 0),
            role_listing_close = datetime(2021, 9, 30, 0, 0, 0),
            role_listing_creator = 1,
            role_listing_ts_create = datetime(2021, 9, 1, 0, 0, 0),
            role_listing_updater = 1,
            role_listing_ts_update = datetime(2021, 9, 1, 0, 0, 0),
            role_listing_type = "open",
            role_listing_department = "IT",
            role_listing_salary = 10000,
            role_listing_location = "Singapore"
        )

        db.session.add(staff)
        db.session.add(role)
        db.session.add(listings)
        db.session.commit()

        response = self.client.get(f"/rolelistings")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['data']['rolelistings']), 1)

    def test_no_role_listings(self):
        response = self.client.get(f"/rolelistings")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"code": 404, "message": "There are no role listings."})

class TestSkillDetails(TestApp):

    def test_no_skills_for_role(self):
        staff = StaffDetails(
            staff_id= 2,
            fname= "TestFName",
            lname= "TestLName",
            dept= "IT",
            email= "email@example.com",
            phone= "12345678",
            biz_address= "123MainStreet",
            sys_role= "staff"
        )

        db.session.add(staff)
        db.session.commit()

        response = self.client.get(f"/get_required_skills/{staff.staff_id}")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"code": 404, "message": "Skills not found"})

    def test_skills_for_role(self):
        staff = StaffDetails(
            staff_id= 2,
            fname= "TestFName",
            lname= "TestLName",
            dept= "IT",
            email= "email@example.com",
            phone= "12345678",
            biz_address= "123MainStreet",
            sys_role= "staff"
        )
        skill1 = SkillDetails(
            skill_id = 1,
            skill_name = "Python",
            skill_status = "active"
        )
        skill2 = SkillDetails(
            skill_id = 2,
            skill_name = "R",
            skill_status = "active"
        )

        staff_skill1 = StaffSkills(
            staff_id = 2,
            skill_id = 1,
            ss_status = "active"
        )
        staff_skill2 = StaffSkills(
            staff_id = 2,
            skill_id = 2,
            ss_status = "active"
        )
        db.session.add(staff)
        db.session.add(skill1)
        db.session.add(skill2)
        db.session.add(staff_skill1)
        db.session.add(staff_skill2)
        db.session.commit()

        response = self.client.get(f"/get_staff_skills/{staff.staff_id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['data']['skills']), 2)

    

if __name__ == "__main__":
    unittest.main()
