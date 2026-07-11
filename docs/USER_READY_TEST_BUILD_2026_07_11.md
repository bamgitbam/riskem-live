
# User-ready test build

This pass prepares the app for a 4–6 user fun test.

## Submit page

The final submit panel now has:

```text
Validate Entry
Copy Entry JSON
Share / Copy Entry
Download JSON
Open Scoreboard
```

## Behavior

- Validate Entry checks all dummy-proof rules and shows the JSON.
- Copy Entry JSON validates, copies, and alerts the user to send it to the commissioner.
- Share / Copy Entry uses the device share sheet when available; otherwise it copies the JSON.
- Download JSON creates a local JSON file.
- Open Scoreboard keeps the selected event in the URL.

## Local import wording

Local imports are now described as `saved on this device only`, not active, because public/event-file entries may already be active while matching local test imports remain saved in the browser.
