# Skill-based Role Portal (SBRP)

Welcome to the All-In-One Internal Skill-based Role Portal! Our current release (Release 1) focuses on addressing the core needs of the organization with five key features:

1. **Role Listings Management**: Human Resources can create, read, and update role listings, allowing for the maintenance of open positions. While there is no delete option for job listings, each listing has a specified deadline.

2. **View Applicant Skills**: Human Resources can view the skills of role applicants, gaining insight into the qualifications of each staff member.

3. **Browse and Filter Role Listings**: Staff members can easily browse and filter open roles, obtaining detailed information about available positions.

4. **Role-Skill Matching**: Staff members can assess how their current skill set matches with open roles, identifying both matches and gaps.

5. **Apply for Roles**: Staff members can use the portal to apply for open positions.

Currently, the system is accessible on the web, and it's designed to meet the specific requirements of Release 1. We are committed to providing a user-friendly, secure, and scalable solution to facilitate talent management and internal job applications within All-In-One. Stay tuned for future updates and enhancements as we continue to support the organization's evolving needs. Thank you for choosing the All-In-One Internal Skill-based Role Portal to streamline your internal hiring process.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Setting up the project

Use the package manager [npm](https://nodejs.org/en/download) to install SBRP.

**Step 1**: Clone the repository (if you do not already have it in your local machine)
```
>> git clone https://github.com/chiragnagpal02/spmg8t4.git
```

**Step 2**: Install the project
```bash
>> npm install
```
**Step 3**: Install the virtualenv python library for creating your VE (if not installed already)
```bash
>> pip install virtualenv
```

**Step 4**: Set up your virtual environment 
1. For **Mac** - 
```bash
>> python3 -m venv my_env 
>> source my_env/bin/activate
```
Can give any name instead of my_env. Make sure to remember it. 

2. For **Windows**
```bash
>> py -m venv env
>> .\env\Scripts\activate

And tell pip to install all of the packages in this file
1. For **Mac** -
>> python3 -m pip install -r requirements.txt

2. For **Windows**
>> py -m pip install -r requirements.txt
```
**Step 5**: Install the following libraries (if not already installed) - 
```bash
>> python -m pip install flask
>> python -m pip install flask_cors
>> python -m pip install Flask-SQLAlchemy
>> python -m pip install mysql-connector-python	  
>> python -m pip install flask_testing
>> python -m pip install requests
```

**Step 6**: Set up and run a WAMP or MAMP server

**Step 7**: Execute the contents of 'SBRP_G8T4.sql' in phpMyAdmin, i.e. at:
[http://localhost/phpmyadmin](http://localhost/phpmyadmin)  OR [http://localhost/phpMyAdmin](http://localhost/phpMyAdmin)

**Step 8**: Set/Export dbURL variable in terminal (root directory)
1. For **Mac**
```bash
>> export dbURL=mysql+mysqlconnector://root:root@localhost:8889/SBRP_G8T4
```
- Check for the port number: 8889 vs 3306 based on your phpmyadmin SQL setup. 

- Feel free to change *root:root* (<username>:<password>) based on custom setup. However, do mention the password in case of Macs. 

1. For **Windows**
```bash
>> set dbURL=mysql+mysqlconnector://root@localhost:3306/SBRP_G8T4
```
- Check for the port number: 8889 vs 3306 based on your phpmyadmin SQL setup. 

**Step 9**: In the 'root' directory, run "python app.py" in a terminal.
```bash
>> python app.py
```
- If it fails to run, open app.py in an editor and check that
		the DB connection string is correct (e.g. port 3306 vs. 8889)

**Step 10**: In another terminal, run "npm run dev"

```bash
>> npm run dev
```

**Step 11**: You should be able to access the SBRP at : [http://localhost:5173/](http://localhost:5173/)


## Temporary Login Details for SBRP

Staff Login -
- Username: 
- Password:

HR Login
- Username: 
- Password:


## Running Tests

To run unit and integration tests, go into the 'root' folder on your
command line and do:
```console
>> python unit_test.py
>> python integration_test.py

```
 
