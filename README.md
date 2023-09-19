# Tech Stack Used
---------Front end---------
1. React - vite
2. Redux and Reduxjs@toolkit
3. Tailwind UI + flowbite

-------- Backend ----------
1. DummyJSON Api for backend to fetch products Link : (https://dummyjson.com/docs/products)

I have used react-redux at frontend to handle the state of the whole application. This assignment contains all the functionalities asked in the assignment
along with user authentication as an addon. Although user authentication is not done with the backend since the api doesnt provide this functionality but for
developer purpose i have provided the way to connect it to backend. All the comments related to this is written in the code.

For Scalability purpose and maintainence purpose, all the required comments have been provided and redux is used considering the scalability.

Login and signup component is also added in the site but the data is being stored in localstorage since dummyapi doesn't provide option to store data on server. But comments are added to 
connect it with the backend when needed. For now, during the signup the data will be stored into the localStorage therefore please ensure to signup before login. 
Login process will verify the user from localstorage upto it is not connected to backend.
