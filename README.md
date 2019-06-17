# GetDriver

    $ cordova clean android
    $ cordova build android

    $ ionic cordova run android --device -l --debug
    $ ionic cordova run android --prod 
    $ ionic cordova run ios --device -l --debug
    $ ionic cordova run ios --prod
    $ ionic cordova run android --emulator -l --debug
## Release APP:
    1.
    $ ionic cordova build android --prod --release

    2.
    $ cd C:\shtibel\ionic\project\GetDriver\apk\release
    
    
    //$ keytool -genkey -v -keystore keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

    alias: upload
    password: m_5730013

    3.
    $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keystore.jks app-release-unsigned.apk upload

    //$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks app-release-unsigned.apk my-alias

    4.
    $ cd C:\sdk\build-tools\28.0.3
    $ zipalign -v 4 C:\shtibel\ionic\project\GetDriver\apk\release\app-release-unsigned.apk C:\shtibel\ionic\project\GetDriver\apk\release\GetDriver-release-beta-0-0-11.apk


    5.
    $ apksigner verify C:\shtibel\ionic\GetDriver\platforms\android\app\build\outputs\apk\release\GetDriver-release-beta-03.apk
## Installation

## Add Google analytics
    $ ionic cordova plugin add cordova-plugin-google-analytics
    $ npm install --save @ionic-native/google-analytics@4

## Add Onesignal
    $ ionic cordova plugin add onesignal-cordova-plugin
    $ npm install --save @ionic-native/onesignal@4

## Add Network
    $ ionic cordova plugin add cordova-plugin-network-information
    $ npm install --save @ionic-native/network@4

## Add Device
    $ ionic cordova plugin add cordova-plugin-device
    $ npm install --save @ionic-native/device@4

## Add App version
    $ ionic cordova plugin add cordova-plugin-app-version
    $ npm install --save @ionic-native/app-version@4

## Add Camera
    $ ionic cordova plugin add cordova-plugin-camera --variable CAMERA_USAGE_DESCRIPTION="We use the camera to upload images" --variable PHOTOLIBRARY_USAGE_DESCRIPTION="We use the photolibrary to upload images"

    $ ionic cordova plugin add cordova-plugin-camera
    $ npm install --save @ionic-native/camera@4
    for ios: add permission to config.xml

## Add File
    $ ionic cordova plugin add cordova-plugin-file
    $ npm install --save @ionic-native/file@4

## Add File transfer
    $ ionic cordova plugin add cordova-plugin-file-transfer
    $ npm install --save @ionic-native/file-transfer@4

##Add File path
    $ ionic cordova plugin add cordova-plugin-filepath
    $ npm install --save @ionic-native/file-path@4

## Add Call number
    $ ionic cordova plugin add call-number
    $ npm install --save @ionic-native/call-number@4

## Add Translate
    $ npm install @ngx-translate/core@9.1.1 @ngx-translate/http-loader@2.0.1 --save
     add to app.module.ts:
     import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
     import { TranslateHttpLoader } from '@ngx-translate/http-loader';

    export function createTranslateLoader(http: HttpClient) {
        return new TranslateHttpLoader(http, './assets/i18n/', '.json');
    }

    add to imports:
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
        })
    on Routing add the above to all page.module.ts
## Use html
    safeHtml pipe
    import { PipesModule } from './../../pipes/pipes.module';
    imports: [
    PipesModule,]
