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
var pushSubscription = [
    {
        "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAAB6prTncCuHas4xHGPoKM3%2fbQooASYJ9cpw5UA%2fOE90incMTbWebdX8RpkDSxTMznTTeU8VEBdhFR%2bWEcegRJ%2fCkzqWpGWLZsZsK0x7A%2bfidU4y5omNaotECc3oyvobYk5sKqC14QiTrfmbL8MvtKCEQbj7KqPtjq7NcaZGCTZ7OyuuyLZCKZja5KhvGbPjPpkOctkhvOLLzvGf0nn60hTXLTwcJ5%2bSmPNKbbrNg6CN0y05laqECJycqAmYL0iMkZ3b3M21sP84WSH03JCqo5ZDl7O1A8v6V5F%2bD367gWtmBvwR1TPFLWCbKs701snJV2W%2bOtDDGVM1kKGrsgIJD7AX",
        "keys": {
            "p256dh": "BIPSU0wbhdr6aTxDbFWAgEWo4jtWi8NEIypRvrc6FM2hH1OLjIqPzC7cS2A7eWMC7ilqbVFmbRsXiifkqE3eahU=",
            "auth": "XhZqkbO9cJRVxP5COkT09g=="
        }
    },
    {
        "endpoint": "https://fcm.googleapis.com/fcm/send/fzdZunI7fBM:APA91bH-f7CUt346rpd-UREzCCSTU55CUgWZ7OTAR7rRUWudUQ3WqQZPQWRn4xwdYAyoEdB5x9Hl8SVW9ieXEjJj2YnPTxRMHg6PW3cq3sE4lAlJwYCFAsSv-MA0brErLyoYz3SN_G6z",
        "keys": {
            "p256dh": "BIRBVBkYJY8ShOvhS3IeIAGEWF0KA1GUIqRI/an5XxRJvKIeH3cPtSrVEjBMLMVgQbHiyrLcH6O06XGBm+i3Dp4=",
            "auth": "Y49r5+NksFjhbYbqcUWEbQ=="
        }
    }
];
var payload = '{"title": "Footbal Match", "body": "Waktunya menonton bola!"}';

var options = {
    gcmAPIKey: '1098468607644',
    TTL: 60
};
for (let i = 0; i < pushSubscription.length; i++) {
    webPush.sendNotification(
        pushSubscription[i],
        payload,
        options
    );
}
// webPush.sendNotification(
//     pushSubscription[0],
//     payload,
//     options
// );