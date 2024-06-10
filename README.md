# [Book My Table React](https://book-my-table-react.netlify.app)

This is a restaurant booking app. Users can visit different restaurants and reserve a table at a certain time. A user can see his/her upcoming bookings and can cancel the booking in the dashboard. Also a user can update his/her account info.

If a user has a restaurant, he can create and update his restaurant and also add food items in the restaurant.

## Stacks used

- **React**
- **Tailwind CSS**
- **Node Express** in backend
- **Prisma** as ORM
- **PostgreSQL** database
- **Other important packages**
  - **Material UI** for some UI elements
  - **React Query** to handle data fetching
  - **React Image** to handle image loading stuff

## Some Website Functionalities

- The full website is responsive.
- Non user can see and search all restaurants but cannot reserve a table.
- Non user can not access dashboard. He/she will be redirected to home.
- There is no Signin and Signup page. These are handled by Modals.
- Enyone can create an account using valid informations.
- Logged in user can see his/her Dashboard.
- From dashboard a user can:
  - change account information
  - see upcoming reservations
  - cancel bookings
  - add his/her own restaurant
- If a user add his/her own restaurant his user role will change from "USER" to "OWNER"
- "OWNER" can browse his/her restaurants and add food menu and also update restaurant details.
- Images are handled through URLs. So no image upload functionality.
- Normally Image take time to Load. So using react-image I have made ther user experience little better. If image not found then a placeholder image is shown.
