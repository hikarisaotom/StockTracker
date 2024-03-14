#import <UserNotifications/UNUserNotificationCenter.h>
#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : RCTAppDelegate
@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@end
