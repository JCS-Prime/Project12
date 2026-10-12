# AboutMyselfApp

## Project Description
A React Native (Expo) mobile app where a user enters their name and a
user ID (1 to 10), then views that user's profile and three recent posts
fetched from the JSONPlaceholder API.

## Members and Contributions
| Member | GitHub Username | Contribution |
|--------|-----------------|--------------|
| Member 1 | @JCS-prime | e.g. Home screen and input validation |
| Member 2 | @johnraymondcalzada-alt | e.g. User detail screen |
| Member 3 | @SamMartel | e.g. avatar icon |
|Member 4 | @nicey080704| e.g. error handling |
|Member 5 | @symonn1231-hub| e.g. error handling, keyboard improvement,main screen integration |

## Features
- Input validation (name required, ID must be a whole number from 1 to 10)
- Fetches user details and recent posts from https://jsonplaceholder.typicode.com
- Loading and error states, with a "Go back" button
- Like button

## Technologies Used
- React Native
- Expo and Expo Router
- TypeScript

## Project Structure
- `app/(tabs)/index.tsx` - Home screen (input form)
- `app/(tabs)/explore.tsx` - Explore tab
- `app/user/[id].tsx` - User details screen (API fetch)
- `app/_layout.tsx` - Root navigation layout

## How to Run
1. Clone the repo: `git clone https://github.com/JCS-Prime/Project12.git`
2. Go to the folder and install dependencies: `npm install`
3. Start the app: `npx expo start`