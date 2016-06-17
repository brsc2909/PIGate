# PIGate

 - extremely simple interface for opening and closing a electronic gate using the rasberry pi with expressjs and nodejs. this can be used with basically anything that needs a basic on/off switch over web, garage door/lights/electronic door lock Etc. for most cases you will need a basic knowledge of programming and linux to get this up and running for your application.

## Getting Started
### prerequisites
* npm 
  `sudo apt-get install npm` 

#### optional 

* forever
  `sudo npm install forever -g` (allows you to run the the app forever)
* nodemon
  `sudo npm install nodemon -g` (refreshes the app when changes are made)

### Install 
* using git from the terminal
`cd [directory where you want project to be housed]`<br>
`git clone http://www.github.com/brsc2909/PIGate`<br>
`cd PIGate`<br>
`npm install` this will install all the requirements <br>
`cp default-config.json config.json` this will create the config file to read from. default username is 'user' and password is 'user123'

* Or 
   * download the [the zip file](https://github.com/brsc2909/PIGate/archive/master.zip zip file)
   * extract where you want your app to be housed
   * from the terminal ` cd [where your app now lives]`
   * `npm install`

### running the app
from the apps root directory run `npm start` or `nodemon start` the app should now be running on port 3000

### using the web interface
* navigate to "[ip of the machine app is running on]:3000"
* enter username and password into the fields
* press open (as of yet there is no feedback as to whether or not the request was successfulll or not)

### using the android app [SimpleWebButton](https://github.com/brsc2909/SimpleWebButton/blob/master/mobile/mobile-release.apk)
you will need to enable 3rd party app on your phone to install. 
* click on the 3 dots in the top right hand corner and select preferences
* enter in your server int the form http[s]://www.myserver.com
* enter the port number, (3000) is the default
* enter username and password
* press the back arrow
* press the GO button

### using IFTTT 
* you will need to down load IFTTT, create an account, IFTTT DO button. and also create an acount with maker





### ssh into raspberry pi when wifi is not connected
* connect PI directly to computer using ethernet cable
* disable wifi 
* `sudo ifconfig eth0 169.254.86.100` replace eth0 with your ethernet interface (its usually 'eth0')
* `ssh [user]@169.254.86.100` default user is `pi`
* to add a wifi netword 
	* `sudo nano /etc/wpa_suplicants/wpa_suplicants.conf
	* add to the bottom 
	```js
	network={
		ssid="YOUR_NETWORK_NAME"
		psk="YOUR_NETWORK_PASSWORD"
		key_mgmt=WPA-PSK
		}
```

### known issues
* app can fail on first use on some ocassions

### TODO's
* improve database schema (bare bones at the moment)
* add options to update password / add users etc
* finish readme.


####more to come...
