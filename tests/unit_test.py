from datetime import datetime
import unittest
from sample_app import sample_app, db ,StaffDetails, RoleApplications, RoleDetails, StaffSkills, SkillDetails, StaffRoles, StaffReportingOfficer, LoginDetails, RoleListings
from unittest.mock import MagicMock, patch, Mock
import json
class TestManagerFunctions(unittest.TestCase):

    def setUp(self):
        self.app = sample_app.test_client()

class TestLoginDetailsFunctions(unittest.TestCase):

    def setUp(self):
        self.app = sample_app.test_client()

    def test_login_valid_credentials(self):
        # Mock the database query
        with sample_app.app_context():

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
        with sample_app.app_context():

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
        self.app = sample_app.test_client()

    def test_get_all_roles(self):
        with sample_app.app_context():
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
        with sample_app.app_context():
            with patch('sample_app.RoleDetails.query.filter_by') as mock_filter:
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


    @patch('sample_app.generate_random_role_listing_id')
    @patch('sample_app.RoleListings.query.filter_by')
    @patch('sample_app.db.session')
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

    @patch('sample_app.generate_random_role_listing_id')
    @patch('sample_app.RoleListings.query.filter_by')
    @patch('sample_app.db.session')
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

    @patch('sample_app.generate_random_role_listing_id')
    @patch('sample_app.RoleListings.query.filter_by')
    @patch('sample_app.db.session')
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


class TestRoleDetailsFunctions(unittest.TestCase):
    def setUp(self):
        self.app = sample_app.test_client()
    def test_get_all_role_details(self):

        with sample_app.app_context():
            mock_query = MagicMock()

            mock_query.all.return_value = [
                RoleDetails(role_id=1, role_name="staff", role_description="x", role_status="active"),
                RoleDetails(role_id=2, role_name="hr", role_description="y", role_status="inactive"),
            ]

            with patch.object(RoleDetails, 'query', mock_query):
                response = self.app.get("/roledetailsall")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'application/json')

    def test_get_all_roles_with_no_data(self):
        with sample_app.app_context():
            mock_query = MagicMock()
            mock_query.all.return_value = []

            with patch.object(RoleDetails, 'query', mock_query):
                response = self.app.get("/roledetails")
        
    

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.content_type, 'application/json')

        data = response.get_json()
        expected_data = {
            "code": 404,
            "message": "There are no roles."
        }
        self.assertEqual(data, expected_data)

# This code gets all listings 
class TestListingDetailsFunctions(unittest.TestCase):
    def setUp(self):
        self.app = sample_app.test_client()
        self.app_context = sample_app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()


if __name__ == "__main__":
    unittest.main()

