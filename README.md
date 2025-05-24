# 🎯 Habit Tracker App

A comprehensive React Native habit tracking application built with TypeScript that helps users build and maintain healthy habits through intuitive progress tracking, beautiful animations, and offline-first functionality.

## 📋 Project Description

The Habit Tracker App is a mobile application designed to help users create, track, and maintain their daily and weekly habits. The app features a clean, modern interface with smooth animations, dark/light mode support, and comprehensive progress tracking capabilities. All data is stored locally using AsyncStorage, ensuring the app works completely offline.


## 📹 Demo Video

🎥 **[View Demo Video](https://drive.google.com/file/d/1xEaaOYOoAKMLpUHTdIWHI5MYZqwg07jo/view?usp=sharing)**

https://drive.google.com/file/d/1xEaaOYOoAKMLpUHTdIWHI5MYZqwg07jo/view?usp=sharing

### ✨ Core Features

#### 1. 🔐 Registration / Login Screens (Local Only)
- Form with Name, Email, and Password (only local storage)
- Save user details in AsyncStorage for persistent authentication
- Auto-login functionality if user info exists

#### 2. ➕ Add Habit Screen
- Comprehensive form to add new habits with:
- Habit name, description and time
  - Frequency selection: Daily or Weekly options
  - Icon and color selection for habits
- All habit data saved locally in AsyncStorage

#### 3. 📱 Habit Screen
- Display all added habits using optimized FlatList component
- For each habit display:
  - Habit Name, description, and scheduled time
  - Real-time status: Completed / Not Completed for today
  - Interactive button to mark habits as completed
- Smooth animations when marking habits complete
- Advanced filtering system:
  - "All Habits" - View complete habit list
  - "Completed" - Show only completed habits
  - "Incomplete Habits" - Display pending habits
- Edit habit popup with full modification capabilities
- Delete habit popup with confirmation dialog

#### 4. 📅 Calendar Screen
- Interactive calendar for date-specific habit management
- Show habits list for user-selected dates
- For each habit on selected date:
  - Display Habit Name, description, and time
  - Show completion status: Completed / Not Completed for selected day
  - Button to mark habits as completed for specific dates
- Historical habit tracking and date-based progress review

#### 5. 🏠 Home Screen (Progress Tracking)
- Comprehensive progress analytics including:
  - Real-time percentage of habits completed today
  - Weekly progress tracking with visual indicators
  - Simple charts and statistical text displays
- Daily goal completion visualization
- Motivational progress insights based on habit completion rate

#### 6. 👤 Profile Screen
- User information management:
  - Display username and email
  - Dark/Light mode toggle switch
  - Profile edit popup (can edit all user information)
- Logout functionality:
  - Clear all AsyncStorage data
  - Secure return to Login screen
  - Complete session termination

### 🧠 Additional Features (Advanced Implementations)

#### 📅 Enhanced Calendar View
- Month and week calendar navigation

#### 🎨 Advanced Animations
- Satisfying completion animations when marking habits complete

#### 🌙 Theme Management
- Complete Light / Dark mode implementation
- Consistent theming across all app components
- User preference persistence in local storage

#### 📱 Offline-First Architecture
- App works completely without internet connection
- All data stored locally using AsyncStorage

## 🏗️ Folder Structure

```
habbit_tracker/
├── .bundle/
├── .idea/
├── __tests__/
├── android/
├── ios/
├── node_modules/
├── src/
│   ├── assets/
│   │   ├── blank-profile-picture.jpg
│   │   └── logo.png
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppButton.tsx
│   │   │   ├── AppTextInput.tsx
│   │   │   ├── FloatingActionButton.tsx
│   │   │   ├── HabitCard.tsx
│   │   │   └── Header.tsx
│   │   ├── homeScreen/
│   │   │   ├── DailyGoalCard.tsx
│   │   │   ├── StatBoxes.tsx
│   │   │   ├── WeekCalendar.tsx
│   │   │   └── WeeklyStat.tsx
│   │   ├── modals/
│   │   │   ├── ConfirmDeleteModal.tsx
│   │   │   ├── EditHabitModal.tsx
│   │   │   └── EditProfileModal.tsx
│   │   ├── HabitListComponents.tsx
│   │   └── MonthCalendar.tsx
│   ├── context/
│   │   ├── HabitContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── UserContext.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── routes.ts
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── AddHabitScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   ├── HabitsScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── SplashScreen.tsx
│   ├── services/
│   │   ├── habitService.ts
│   │   └── userService.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   └── themes.ts
│   └── types/
│       ├── index.ts
│       └── theme.ts
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── .watchmanconfig
├── app.json
├── App.tsx
├── babel.config.js
├── Gemfile
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── package-lock.json
├── react-native.config.js
├── README.md
└── tsconfig.json
```

## 🛠️ Technical Stack

### Core Technologies
- **React Native CLI** (v0.79.2) - Cross-platform mobile development framework
- **TypeScript** (v5.0.4) - Static type checking for enhanced code quality
- **React Navigation** - Navigation library for seamless screen transitions
  - `@react-navigation/stack` - Stack navigation
  - `@react-navigation/bottom-tabs` - Tab-based navigation

### Key Dependencies

#### State Management & Storage
- `@react-native-async-storage/async-storage` (v2.1.2) - Local data persistence
- **React Context API** - Global state management for user data, habits, and theme

#### UI & Animation Libraries
- `react-native-reanimated` (v3.17.5) - High-performance animations
- `react-native-gesture-handler` (v2.25.0) - Touch gesture handling
- `react-native-linear-gradient` (v2.8.3) - Beautiful gradient backgrounds
- `react-native-vector-icons` (v10.2.0) - Icon library for UI elements
- `react-native-svg` (v15.11.2) - SVG support for custom graphics
- `react-native-confetti-cannon` (v1.5.2) - Celebration animations for habit completion

#### Date & Calendar
- `react-native-calendars` (v1.1312.0) - Calendar component for date selection
- `@react-native-community/datetimepicker` (v8.3.0) - Time picker for habit scheduling
- `date-fns` (v2.30.0) - Date manipulation and formatting utilities

#### User Experience
- `react-native-toast-message` (v2.1.5) - Toast notifications for user feedback
- `react-native-safe-area-context` (v5.4.0) - Safe area handling for different devices

## ⚙️ Setup Instructions

### Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **React Native CLI** (`npm install -g @react-native-community/cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **JDK 11** or higher

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rami2212/habbit_tracker.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup**
   - Open Android Studio
   - Open the `android` folder in Android Studio
   - Let Gradle sync complete
   - Ensure you have an Android Virtual Device (AVD) set up

5. **iOS Setup** (macOS only)
   - Open `ios/habbit_tracker.xcworkspace` in Xcode
   - Select your target device or simulator

## 🚀 Running the Application

### Start Metro Bundler

First, start the Metro development server:

```bash
npm start
# or
yarn start
```

### Run on Android

```bash
# Make sure you have an Android emulator running or device connected
npm run android
# or
yarn android
```

### Run on iOS (macOS only)

```bash
# Make sure you have iOS Simulator running or device connected
npm run ios
# or
yarn ios
```

---

**Happy Habit Tracking! 🎯✨**