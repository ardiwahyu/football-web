var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BDEykvA3tqRPw5lBnjcazJdIGIFmUpVypwdaUK3NKyWw4hZnZ65hj078vpTwpnSxYoHo_m-pdmdcBuz8zaCuIsU",
    "privateKey": "CgTtnl5oq5ZX8JhJJwQ0vuxgk-x6ctnMjXPvJrlEjC4"
};


webPush.setVapidDetails(
    'mailto:wahyuardi027@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fzdZunI7fBM:APA91bH-f7CUt346rpd-UREzCCSTU55CUgWZ7OTAR7rRUWudUQ3WqQZPQWRn4xwdYAyoEdB5x9Hl8SVW9ieXEjJj2YnPTxRMHg6PW3cq3sE4lAlJwYCFAsSv-MA0brErLyoYz3SN_G6z",
    "keys": {
        "p256dh": "BIRBVBkYJY8ShOvhS3IeIAGEWF0KA1GUIqRI/an5XxRJvKIeH3cPtSrVEjBMLMVgQbHiyrLcH6O06XGBm+i3Dp4=",
        "auth": "Y49r5+NksFjhbYbqcUWEbQ=="
    }
};
var payload = '{"title": "Footbal Match", "body": "Waktunya menonton bola!"}';

var options = {
    gcmAPIKey: '1098468607644',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);