# GIGEL BASIC TEST
User Profile Module

### How To Use
This application can be accessed at https://gigel-test.rezapramudhika.com. If you don't have any account, create one by click the register link at the bottom of the page.

<img src="https://github.com/rezapramudhika/user-profile-gigelid/blob/dev/docs/register.gif?raw=true" width="240">

Input email, password, name, and your phone number. For your information, password must contain at least 8 characters and have a combination of numbers and letters. Then, login to your account.

<img src="https://github.com/rezapramudhika/user-profile-gigelid/blob/dev/docs/login.gif?raw=true" width="240">

<img src="https://github.com/rezapramudhika/user-profile-gigelid/blob/dev/docs/dashboard.gif?raw=true" width="240">

You can edit your information such as name, date of birth, and gender at the homepage. You can also upload an image as your profile picture.
If you want to change your password, you can click the change password link then input your old password, and new password.

<img src="https://github.com/rezapramudhika/user-profile-gigelid/blob/dev/docs/change-password.gif?raw=true" width="240">

### Installation
1. Install the dependencies and start the server.
```sh
$ cd server
$ npm install
$ npm start
```
2. Start the client.
```sh
$ cd client
$ npm install
$ npm start
```

The server may not work properly because it requires multiple credentials such as the google cloud service account, database configuration, and jsonwebtoken secret key.
