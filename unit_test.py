from datetime import datetime
import unittest
from app import app, StaffDetails, RoleApplications, RoleDetails, StaffSkills, SkillDetails, StaffRoles, StaffReportingOfficer, LoginDetails, RoleListings
from unittest.mock import MagicMock, patch
import json

class TestManagerFunctions(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_get_all_managers(self):
        with app.app_context():
            # Create a mock object for the query
            mock_query = MagicMock()

            # Set the expected return value for the filter_by method
            mock_query.filter_by.return_value = [
                StaffDetails(staff_id=1, fname="John", lname="Doe", dept="IT", email="john@company.com", phone=99999999, biz_address="abc avenue street south", sys_role="manager"),
                StaffDetails(staff_id=2, fname="Jane", lname="Doe", dept="IT", email="janedoe@company.com", phone=99999999, biz_address="15/10 EPN ND", sys_role="manager")
            ]

            # Assign the mock object to the actual query attribute
            with patch.object(StaffDetails, 'query', mock_query):
                response = self.app.get("/get_all_managers")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')
        self.assertEqual(response.json, [
            {"staff_id": 1, "fname": "John", "lname": "Doe", "dept": "IT", "email": "john@company.com", "phone": 99999999, "biz_address": "abc avenue street south", "sys_role": "manager"},
            {"staff_id": 2, "fname": "Jane", "lname": "Doe", "dept": "IT", "email": "janedoe@company.com", "phone": 99999999, "biz_address": "15/10 EPN ND", "sys_role": "manager"}
        ])

    def test_get_all_managers_no_managers(self):
        with app.app_context():
            with patch('app.StaffDetails.query.filter_by') as mock_filter:
                mock_filter.return_value = []

                response = self.app.get("/get_all_managers")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

class TestLoginDetailsFunctions(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_login_valid_credentials(self):
        # Mock the database query
        with app.app_context():

            mock = MagicMock()

            mock.filter_by.return_value.first.return_value = LoginDetails(username='johndoe', password='mypassword', staff_id=1, sys_role='manager')
            
            # Assign the mock object to the actual query attribute
            with patch.object(LoginDetails, 'query', mock):
                response = self.app.get('/login/johndoe/mypassword')
                data = json.loads(response.data)
            
            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['code'], 200)
            self.assertEqual(data['data']['username'], 'johndoe')
            self.assertEqual(data['data']['password'], 'mypassword')

    def test_login_invalid_credentials(self):
        # Mock the database query
        with app.app_context():

            mock = MagicMock()

            mock.filter_by.return_value.first.return_value = None
            
            # Assign the mock object to the actual query attribute
            with patch.object(LoginDetails, 'query', mock):
                response = self.app.get('/login/johndoe/mypassword')
                data = json.loads(response.data)
            
            self.assertEqual(response.status_code, 404)
            self.assertEqual(data['code'], 404)
            self.assertEqual(data['message'], 'Invalid username or password')


class TestRoleListingsFunctions(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()

    def test_get_all_roles(self):
        with app.app_context():
            # Create a mock object for the query
            mock_query = MagicMock()

            # Set the expected return value for the query
            mock_query.all.return_value = [
                RoleListings(
                    role_listing_id=1,
                    role_id=1,
                    role_listing_desc="Job description 1",
                    role_listing_source=1,
                    role_listing_open="2023-01-01",
                    role_listing_close="2023-01-15",
                    role_listing_creator=1,
                    role_listing_ts_create="2023-01-01 00:00:00",
                    role_listing_updater=1,
                    role_listing_ts_update="2023-01-01 00:00:00",
                    role_listing_type="open",
                    role_listing_department="IT",
                    role_listing_salary=60000,
                    role_listing_location="Some Location",
                ),
                RoleListings(
                    role_listing_id=2,
                    role_id=2,
                    role_listing_desc="Job description 2",
                    role_listing_source=2,
                    role_listing_open="2023-02-01",
                    role_listing_close="2023-02-15",
                    role_listing_creator=2,
                    role_listing_ts_create="2023-02-01 00:00:00",
                    role_listing_updater=2,
                    role_listing_ts_update="2023-02-01 00:00:00",
                    role_listing_type="closed",
                    role_listing_department="Finance",
                    role_listing_salary=70000,
                    role_listing_location="Another Location",
                ),
            ]

            # Assign the mock object to the actual query attribute
            with patch.object(RoleListings, 'query', mock_query):
                response = self.app.get("/rolelistings")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_get_all_roles_no_roles(self):
        with app.app_context():
            with patch('app.RoleDetails.query.filter_by') as mock_filter:
                mock_filter.return_value = []

                response = self.app.get("/get_all_roles")

        self.assertEqual(response.status_code, 404)
    
    @patch('requests.get')
    def test_get_role_listing_by_id(self, mock_get):
        # Define a sample role_listing_id for testing
        role_listing_id = 1

        # Mock the response from the /rolelistings endpoint
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "code": 200,
            "data": {
                "rolelistings": [
                    {
                        "role_listing_id": 1,
                        "role_id": 1,
                        "role_listing_desc": "Job description 1",
                        "role_listing_source": 1,
                        "role_listing_open": "2023-01-01",
                        "role_listing_close": "2023-01-15",
                        "role_listing_creator": 1,
                        "role_listing_ts_create": "2023-01-01 00:00:00",
                        "role_listing_updater": 1,
                        "role_listing_ts_update": "2023-01-01 00:00:00",
                        "role_listing_type": "open",
                        "role_listing_department": "IT",
                        "role_listing_salary": 60000,
                        "role_listing_location": "Some Location"
                    }
                ]
            }
        }
        mock_get.return_value = mock_response

        # Call the /get_role_listing/<int:role_listing_id> endpoint
        response = self.app.get(f"/get_role_listing/{role_listing_id}")

        # Assertions
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')
        data = response.json
        self.assertEqual(data['code'], 200)
        self.assertEqual(data['data']['role_listing_id'], 1)  # Verify the specific data you expect
        self.assertEqual(data['data']['role_id'], 1)  # Verify other attributes as needed

    
    # def test_open_role_listings(self):
    #     with app.app_context():
    #         # Create a mock object for the query
    #         mock_query = MagicMock()

    #         # Set the expected return value for the filter_by method
    #         mock_query.filter_by.return_value = [
    #             RoleListings(
    #                 role_listing_id=1,
    #                 role_id=2,
    #                 role_listing_desc="Open Role Listing 1",
    #                 role_listing_source=3,
    #                 role_listing_open=datetime(2024, 1, 31, 0, 0, 0),
    #                 role_listing_close=datetime(2024, 12, 31, 0, 0, 0),
    #                 role_listing_creator=4,
    #                 role_listing_ts_create=datetime(2023, 12, 29, 0, 0, 0),
    #                 role_listing_updater=5,
    #                 role_listing_ts_update=datetime(2024, 11, 30, 0, 0, 0),
    #                 role_listing_type="open",
    #                 role_listing_department="IT",
    #                 role_listing_salary=60000,
    #                 role_listing_location="Sample Location"
    #             ),
    #             RoleListings(
    #                 role_listing_id=6,
    #                 role_id=7,
    #                 role_listing_desc="Open Role Listing 2",
    #                 role_listing_source=8,
    #                 role_listing_open=datetime(2023, 12, 31, 0, 0, 0),
    #                 role_listing_close=datetime(2024, 12, 31, 0, 0, 0),
    #                 role_listing_creator=9,
    #                 role_listing_ts_create=datetime(2023, 12, 31, 0, 0, 0),
    #                 role_listing_updater=10,
    #                 role_listing_ts_update=datetime(2024, 11, 30, 0, 0, 0),
    #                 role_listing_type="open",
    #                 role_listing_department="HR",
    #                 role_listing_salary=55000,
    #                 role_listing_location="Another Location"
    #             )
    #         ]

    #         # Assign the mock object to the actual query attribute
    #         with patch.object(RoleListings, 'query', mock_query):
    #             response = self.app.get("/rolelistings_open")

    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.content_type, 'application/json')
    #     data = response.json
    #     self.assertEqual(data['code'], 200)
    #     self.assertTrue("rolelistings" in data['data'])
    #     role_listings = data['data']['rolelistings']
    #     self.assertEqual(len(role_listings), 2)

    def test_open_role_listings_no_roles(self):
        with app.app_context():
            with patch('app.RoleDetails.query.filter_by') as mock_filter:
                mock_filter.return_value = []

                response = self.app.get("/rolelistings_open")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')


    @patch('app.generate_random_role_listing_id')
    @patch('app.RoleListings.query.filter_by')
    @patch('app.db.session')
    def test_create_role_listing_start_date_before_today(self, mock_db_session, mock_filter_by, mock_generate_random_role_listing_id):
        # Mock the generate_random_role_listing_id function
        mock_generate_random_role_listing_id.return_value = 1

        # Mock the RoleListings.query.filter_by function to return None (indicating the role doesn't already exist)
        mock_filter_by.return_value.first.return_value = None

        # Mock the db session add and commit methods
        mock_db_session.add.return_value = None
        mock_db_session.commit.return_value = None

        # Create a mock request data
        request_data = {
            "listing_desc": "Sample Role Listing",
            "appStartDate": "2023-01-01",
            "appEndDate": "2023-12-31",
            "listing_type": "open",
            "department": "IT",
            "salary": "60000",
            "location": "Sample Location",
            "role_listing_source": "sample_source",
        }

        response = self.app.post("/create_role_listing/2/3", json=request_data)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.content_type, 'application/json')
        data = response.json
        self.assertEqual(data['code'], 400)
        self.assertTrue("data" in data)
        self.assertEqual(data['data']['role_listing_id'], 1)

    @patch('app.generate_random_role_listing_id')
    @patch('app.RoleListings.query.filter_by')
    @patch('app.db.session')
    def test_create_role_listing_start_date_after_end(self, mock_db_session, mock_filter_by, mock_generate_random_role_listing_id):
        # Mock the generate_random_role_listing_id function
        mock_generate_random_role_listing_id.return_value = 1

        # Mock the RoleListings.query.filter_by function to return None (indicating the role doesn't already exist)
        mock_filter_by.return_value.first.return_value = None

        # Mock the db session add and commit methods
        mock_db_session.add.return_value = None
        mock_db_session.commit.return_value = None

        # Create a mock request data
        request_data = {
            "listing_desc": "Sample Role Listing",
            "appStartDate": "2024-01-01",
            "appEndDate": "2023-12-31",
            "listing_type": "open",
            "department": "IT",
            "salary": "60000",
            "location": "Sample Location",
            "role_listing_source": "sample_source",
        }

        response = self.app.post("/create_role_listing/2/3", json=request_data)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.content_type, 'application/json')
        data = response.json
        self.assertEqual(data['code'], 400)
        self.assertTrue("data" in data)
        self.assertEqual(data['data']['role_listing_id'], 1)

    @patch('app.generate_random_role_listing_id')
    @patch('app.RoleListings.query.filter_by')
    @patch('app.db.session')
    def test_create_role_listing(self, mock_db_session, mock_filter_by, mock_generate_random_role_listing_id):
        # Mock the generate_random_role_listing_id function
        mock_generate_random_role_listing_id.return_value = 1

        # Mock the RoleListings.query.filter_by function to return None (indicating the role doesn't already exist)
        mock_filter_by.return_value.first.return_value = None

        # Mock the db session add and commit methods
        mock_db_session.add.return_value = None
        mock_db_session.commit.return_value = None

        # Create a mock request data
        request_data = {
            "listing_desc": "Sample Role Listing",
            "appStartDate": "2024-01-01",
            "appEndDate": "2024-12-31",
            "listing_type": "open",
            "department": "IT",
            "salary": "60000",
            "location": "Sample Location",
            "role_listing_source": "sample_source",
        }

        response = self.app.post("/create_role_listing/2/3", json=request_data)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.content_type, 'application/json')
        data = response.json
        self.assertEqual(data['code'], 400)
        self.assertTrue("data" in data)
        self.assertEqual(data['data']['role_listing_id'], 1)


    


if __name__ == "__main__":
    unittest.main()