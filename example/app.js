var cardio = require('com.likelysoft.cardio');

var win = Ti.UI.createWindow({
    backgroundColor: 'white'
});

var button = Ti.UI.createButton({
    title: 'Scan Card'
});

button.addEventListener('click', function() {
    // Open modal scanner window
    if (Ti.Platform.osname == "android") {
		// android
        cardio.setCardIOLogo(false);
        cardio.setPayPalLogo(false);
        cardio.setLocale("de");
        cardio.scanCard({
            complete: function(data) {
                // NOTE this is for demonstration only, never log the
                // complete credit card number. Use redactedCardNumber
                // instead.
                Ti.API.info("Card number: " + data.cardNumber);
                Ti.API.info("Redacted card number: " + data.redactedCardNumber);
                Ti.API.info("Expiration month: " + data.expiryMonth);
                Ti.API.info("Expiration year: " + data.expiryYear);
                Ti.API.info("CVV code: " + data.cvv)
            },
            error: function(e) {
                console.log("error")
            }
        });
    } else {
		// ios
        cardio.scanCard(function(data) {
            if (data.success == 'true') {
                // NOTE this is for demonstration only, never log the
                // complete credit card number. Use redactedCardNumber
                // instead.
                Ti.API.info("Card number: " + data.cardNumber);
                Ti.API.info("Redacted card number: " + data.redactedCardNumber);
                Ti.API.info("Expiration month: " + data.expiryMonth);
                Ti.API.info("Expiration year: " + data.expiryYear);
                Ti.API.info("CVV code: " + data.cvv)
            } else {
                // User canceled or there was an error
            }
        });
    }
});
win.add(button);
win.open();
