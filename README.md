# Belga Tablet React Native App
#### This is the Belga Tablet mobile application built using React Native. Follow the instructions below to set up the environment and run the project.

# [Belga Tablet] Document to setup environment and run project:
[Document to setup environment and run project](https://drive.google.com/drive/folders/1Y7o14WD_76lKtqsbzuxzr1CXPMLthbVj?usp=drive_link 'Document to setup environment and run project')

## Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js: Install the latest LTS version of Node.js from nodejs.org.

* Yarn: Install Yarn package manager from yarnpkg.com.

* Watchman: Required for macOS users, install it using Homebrew:

```
brew install watchman
```

* React Native CLI: Install the React Native CLI globally:

```
npm install -g react-native-cli
```

* Android Studio: Required for Android development, download and install from developer.android.com.

* Xcode: Required for iOS development, install it from the App Store.

## Installation

1. Clone the repository:

```
git clone https://git.idsolutions.com.vn/belgapress/belga-tablet.git
```

2. Navigate to the project directory:

```
cd belga-tablet
```

3. Install the dependencies:

```
yarn install
```

## Running the App
### iOS

1. Navigate to the ios directory and install the iOS dependencies:

```
cd ios
pod install
cd ..
```

2. Start the iOS application:

```
npx react-native run-ios
```

### Android
1. Start the Android application:

```
npx react-native run-android
```

## Development

To start the development server, run:

```
npx react-native start
```

## Building the App
### iOS
1. Open the project in Xcode:

```
open ios/BelgaTablet.xcworkspace
```

2. Select your target device and click the Run button.

## Android

1. Build the Android application:

```
cd android
./gradlew assembleRelease
```

## Troubleshooting
### Metro Bundler
If you encounter issues with the Metro Bundler, try resetting the cache:

```
npx react-native start --reset-cache
```

# [Belga Tablet] Document updated to new iOS/Android version
[Document updated to new iOS/Android version](https://docs.google.com/document/d/1GtJtVNEkgpysHTA8Q3VYEJ_8xqju-PrPKH_AlE7L4Wk/edit?usp=drive_link 'Document updated to new iOS/Android version')


