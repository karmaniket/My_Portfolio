# Karmaniket Portfolio Website

A modern, fully responsive personal portfolio website designed to showcase your projects, workshops, VFX work, and contact information in a visually engaging and professional manner. Built with HTML, CSS, and JavaScript, this site features dynamic UI elements, seamless navigation, and easy customization. The portfolio includes dedicated sections for project highlights, blog posts, downloadable blueprints/designs, media sharing (including VFX), and a robust contact form integrated with Google Sheets.

## [Live](https://karmaniket.vercel.app/)

https://github.com/user-attachments/assets/d4b62272-3889-4b8f-aab8-4b38f150d10d

https://github.com/user-attachments/assets/af08b707-cdde-409d-a618-b0e9a2d16102

## Features

- **Responsive Design:** Adapts seamlessly to desktop and mobile devices for an optimal viewing experience.
- **Animated UI:** Smooth reveal animations and interactive elements using the Intersection Observer API.
- **Styled Scrollbar:** Custom scrollbar for a modern, visually consistent aesthetic.
- **Projects Showcase:** Grid layout for featured projects with expandable views and direct links to live demos and source code.
- **Workshop:** Dedicated sections for sharing blog posts, downloadable blueprints/designs, and media content such as VFX videos.
- **Social Links:** Quick access to YouTube, Instagram, Discord, Twitter, GitHub, Kaggle, and LinkedIn for networking and outreach.
- **Resume Button:** Prominent button linking to your resume hosted on Google Drive for easy access by recruiters and collaborators.
- **Menu Icon Animation:** Responsive hamburger menu icon with animated transitions for mobile navigation, enhancing user experience on smaller screens.
- **Custom Visuals:** Animated starfield background using the Canvas API for a dynamic, engaging look.
- **Meteor Shower Customization:** The animated starfield (meteor shower) background is fully tunable via JavaScript variables for density, speed, color, and behavior. Developers can easily adjust parameters such as the number of meteors, their speed, tail length, and color to match their own style or performance needs. This makes the visual effect both flexible and educational for those interested in creative coding or UI animation.
- **Contact Form:** Integrated with Google Sheets for message submissions, capturing name, email, message, and automatic date/time using Fetch API and Google Apps Script.
- **Cloud Deployment:** Deployed on Vercel and integrated with Vercel live analytics and speed insights for real-time performance, security, and traffic monitoring.

## Technologies Used

```bash
- HTML5
- CSS3
- JavaScript
- Canvas API
- Intersection Observer API
- Fetch API
- Google Apps Script
- Google Sheets
- Vercel
```

## File Structure

```
├── index.html         # Main portfolio page
├── vfx.html           # VFX showcase page
├── style.css          # Main stylesheet
├── stylesheet.css     # Main active stylesheet
├── script.js          # Main JavaScript for interactivity
├── vfx.js             # VFX page JavaScript
├── assets/            # Images, icons, fonts, and videos
└── readme.md          # Project documentation
```

## Getting Started

### **Setup**
- **Clone the repository:**
   ```sh
   git clone https://github.com/karmaniket/My_Portfolio
   cd My_Portfolio
   ```
- **Open `index.html` in your browser. No build step required; all assets are static.**

### **Customization**

#### 1. Profile & Socials:
  - Update `assets/profile.jpg` for your photo.
  - Edit social links in `index.html` as needed.
#### 2. Projects & Workshops:
  - Add project images to `assets/projects/` and update the project cards in `index.html`.
  - Add your additional works in the Workshop section.
#### 3. Contact Form:
  - The form submits to a Google Apps Script endpoint. Update the `scriptURL` in `script.js` to use your own endpoint if needed.
#### 4. Resume:
  - Update the resume link in `index.html` to your own Google Drive or preferred location.

### **Form Integration with Google Sheets**

This project uses a Google Apps Script backend to collect contact form submissions directly into a Google Sheet. Follow these steps to set up your own integration:

#### 1. Set Up Google Apps Script Backend

```javascript
var sheetName = 'Your_Sheet_Name'
var scriptProp = PropertiesService.getScriptProperties()
function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}
function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)
  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1
    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }
  finally {
    lock.releaseLock()
  }
}
```

#### 2. Add the Contact Form to Your HTML

```html
<form name="submit-to-google-sheet">
    <input type="text" name="Name" placeholder="Name" required>
    <input type="email" name="Email" placeholder="Email" required>
    <textarea name="Message" rows="6" placeholder="Throw your words" required></textarea>
    <input type="hidden" name="Date" id="submitDate">
    <input type="hidden" name="Time" id="submitTime">
    <button type="submit" class="submit-btn">SUBMIT</button>
</form>
<span id="msg"></span>
```

#### 3. Connect the Form with JavaScript

```javascript
    const scriptURL = 'Your_Script_URL'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
    form.addEventListener('submit', e => {
    e.preventDefault()
    const now = new Date()
    const date = now.toLocaleDateString()
    const time = now.toTimeString().slice(0, 8)
    document.getElementById('submitDate').value = now.toLocaleDateString()
    document.getElementById('submitTime').value = now.toLocaleTimeString()
    msg.innerHTML = "Sending..."
    msg.classList.add('show')
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Your message has been sent successfully!!"
            msg.classList.add('show')
            setTimeout(function () {
                msg.classList.remove('show')
                setTimeout(function () {
                    msg.innerHTML = ""
                }, 300)
            }, 3000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })
```

### Meteor Shower Customization Guide

The animated starfield (meteor shower) background is highly customizable. You can tune its appearance and behavior by adjusting key parameters in `script.js`:

```javascript
const isMobile = window.innerWidth < 768;
const MaxMeteors = isMobile ? 500 : 1000;           // Maximum number of meteors
const MaxDistance = isMobile ? 1000 : 500;          // Minimum distance between meteors
const SpawnInterval = isMobile ? 500 : 250;         // Meteor spawn rate (ms)
const baseAngle = Math.PI * 0.2;                    // Base angle of meteor trajectory
const spread = Math.PI * 0.05;                      // Spread of meteor angles
const LifeMin = isMobile ? 40 : 100;                // Minimum meteor life
const LifeRange = isMobile ? 40 : 100;              // Range of meteor life
const SizeMin = isMobile ? 0.5 : 0.7;               // Minimum meteor size
const SizeRange = isMobile ? 1.5 : 1.7;             // Range of meteor size
const tailMultiplier = isMobile ? 2.5 : 10;         // Controls the length of meteor tails
ctx.strokeStyle = `rgba(200,230,255,${alpha})`;     // RGBA color and opacity for meteors
const speed = isMobile ? 4 + Math.random() * 2 : 3 + Math.random() * 2; // Meteor speed
```

**How to Customize:**
- **Density:** Increase or decrease `MaxMeteors` for more or fewer meteors.
- **Speed:** Adjust the `speed` calculation for faster or slower meteors.
- **Tail Length:** Change `tailMultiplier` for longer or shorter meteor trails.
- **Color:** Modify the RGBA values in `ctx.strokeStyle` for different meteor colors.
- **Spawn Rate:** Change `SpawnInterval` for how often new meteors appear.
- **Size:** Adjust `SizeMin` and `SizeRange` for thicker or thinner meteors.
- **Angle/Spread:** Tweak `baseAngle` and `spread` for different meteor directions.

These parameters allow you to create a unique visual effect that matches your style or performance needs. Experiment with the values to see real-time changes in the animation.

## Accessibility & Best Practices

- All images and videos should have descriptive `alt` text or captions for accessibility.
- Ensure all external links use `target="_blank"` and `rel="noopener noreferrer"` for security.
- Test responsiveness on multiple devices and browsers.
- Use semantic HTML for better SEO and accessibility.
- Keep dependencies up to date for security and performance.

## Dependencies

- [Vercel](https://vercel.com/)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- [CDNFonts](https://www.cdnfonts.com/)
- [OnlineWebFonts](https://www.onlinewebfonts.com/)

## Acknowledgements

- **Vercel:** For free hosting, live analytics and speed insights.
- **Google Fonts:** For providing high-quality open-source fonts.
- **Font Awesome:** For the icon library used throughout the site.
- **CDNFonts and OnlineWebFonts:** For additional font resources.
- **Theme Inspiration:** The website's visual theme and color palette are inspired by [The Mercedes AMG PETRONAS F1 Team.](https://www.mercedesamgf1.com/)

## License

**Strict Attribution Required**

This project is licensed for personal, non-commercial use only. You must provide clear and visible credit to the original author (Karmaniket) on every public or private use, fork, or deployment of this website or its derivatives. Removal or obfuscation of author attribution is strictly prohibited. For any other use, contact the author for explicit permission.

---

#### **Author:** [Karmaniket](https://github.com/karmaniket)
