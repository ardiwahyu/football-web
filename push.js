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
var pushSubscription =
{
    "endpoint": "https://fcm.googleapis.com/fcm/send/e1ISFvMiJmA:APA91bGCverEfVSXvf0AVlH8X51pVZX06DJLmTv8UbgV-SqBatR425b5OoNRlSMot08gyq-EJxphAGsqS4ujotQZ2tkMmrhPXUj_WeOk4dwkQa2l-FN0yBhX5Xc431VkzOAtDLE_1otJ",
    "keys": {
        "p256dh": "BPiarac1rK6IoZpyWHSLXEZprZtITEKX+tFHWbCIfrrIwEEv/RP6btXD//HePSIV9gb/2xdiOQQ4BJk46SlywEI=",
        "auth": "taSINwqif2dKovjWRaoS0g=="
    }
}
    ;
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
