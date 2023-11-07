import unittest
import flask_testing
import json
from app import app, db  # Import your Flask app and the database instance
from app import StaffDetails, RoleDetails  # Import your models


class IntegrationTest(flask_testing.TestCase):
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
    app.config['TESTING'] = True

    def create_app(self):
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

class TestCreateStaff(IntegrationTest):
    def test_staff_details(self):
    
        staff = StaffDetails(
            staff_id=999,
            fname="John",
            lname="Doe",
            dept="IT",
            email="john@example.com",
            phone="123-456-7890",
            biz_address="123 Main St",
            sys_role="staff"
            )
        
        db.session.add(staff)
        db.session.commit()

        request_body = {
            "staff_id": 999,
            "fname": "John",
            "lname": "Doe",
            "dept": "IT",
            "email": "john@example.com",
            "phone": "123-456-7890",
            "biz_address": "123 Main St",
            "sys_role": "staff"
        }
        
        response = self.client.post('/staffdetails', data=json.dumps(request_body), content_type='application/json')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json, {'message': 'Staff already exists'})

    # def test_role_details(self):
    #     # Create a RoleDetails object and add it to the database
    #     role = RoleDetails(
    #         role_id=999,
    #         role_name="Engineer",
    #         role_description="Software Engineer",
    #         role_status="active"
    #     )
    #     db.session.add(role)
    #     db.session.commit()

    #     # Send an HTTP request to your Flask app to retrieve the role details
    #     response = self.app.get('/roledetails')

    #     # Assert the response status code and data
    #     self.assertEqual(response.status_code, 200)
    #     self.assertIn(b"Engineer", response.data)

if __name__ == '__main__':
    unittest.main()