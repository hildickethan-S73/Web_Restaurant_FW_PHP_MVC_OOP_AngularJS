# Web_Restaurant_FW_PHP_MVC_OOP_AngularJS

Simple restaurant web page made with a PHP Framework, Angular JS 1.4 and MVC architecture.

## **Features**

| Page | Features |
| - | - |
| Home | Caroussel, Search bar that sends you to shop, pagination |
| Shop | Search bar that changes the restaurants, pagination, details page |
| Contact | Google Maps pin, contact form with email | 
| Profile | Dropzone for avatar, profile updating, dependant dropdowns for countries |
| Cart | Quantity changing, item removing, cart emptying and checkout buttons, total price |

<br>

| Services | Features | 
| - | - |
| Register | Modal, Email activation with Mailgun
| Login | Modal, JWT token validation, password recovery with email |
| Favourites | Like and unlike button in home, shop and details, My Favourites tab in profile, Dashboard style favourite counter in profile |


###  **Technologies used**

* [PHP] Framework by [Raül Ojeda]
* [AngularJS v1.4.9]
* [JavaScript]
* [MVC]
* [MySQL]
* [Apache2]


### Other technologies useds
* [Cloud83] - The template, created by Colorlib
* [Google Maps API]
* [Mailgun]
* [JWT]
* [Bootstrap]
* [Toastr]
* [Dropzone]

#### Other technology use in more detail
* **JWT Server-side**: Saved in session, token destroyed on logout, used to verify user
* **JWT Client-side**: Saved in local storage, sent to server to verify self
* **Dropzone**: Used to update the avatar in the profile
* **Toastr**: Notifies user of any errors and successful actions
* Search bar redirects to details if there is only 1 result

#### TODO
- [x] Favourites module
- [ ] Social Login with Auth0
- [x] Cart module
- [ ] Improve PHP controllers
- [ ] Improve HTML with directives 
- [ ] Translation
- [ ] Upload .sql file when finished
- [ ] Require account activation to checkout
- [ ] JWT for favourites?

#### Known issues
* Login and Register forms don't have validation
* Cart doesn't check for errors on checkout
* Cart doesn't check for JWT token on checkout
* The first time you enter a profile, the state is disabled until you refresh or pick a country, no idea why this happens

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [PHP]: <http://php.net>
   [MVC]: <https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm>
   [JavaScript]: <https://www.javascript.com/>
   [Cloud83]: <https://colorlib.com/wp/template/cloud83/>
   [Yelp Fusion API]: <https://www.yelp.com/fusion>
   [Google Maps API]: <https://developers.google.com/maps/documentation/javascript/tutorial>