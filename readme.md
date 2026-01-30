# Karmaniket Portfolio Website

A modern, responsive personal portfolio website for showcasing projects, workshops, VFX work, and contact information. Built with HTML, CSS, and JavaScript.

## [Live](https://karmaniket.vercel.app/)

[Desktop-View](https://github.com/user-attachments/assets/d4b62272-3889-4b8f-aab8-4b38f150d10d)
[Smartphone-View](https://github.com/user-attachments/assets/af08b707-cdde-409d-a618-b0e9a2d16102)

## Features

- **Responsive Design:** Adapts seamlessly to desktop and mobile devices for optimal viewing experience.
- **Animated UI:** Smooth reveal animations and interactive elements using the Intersection Observer API.
- **Styled Scrollbar:** Custom scrollbar for a modern, visually consistent aesthetic.
- **Projects Showcase:** Grid layout for featured projects with expandable view and direct links to live demos and source code.
- **Workshops & VFX:** Dedicated sections for sharing workshop content, downloadable resources, and VFX video demos.
- **Social Links:** Quick access to YouTube, Instagram, Discord, Twitter, GitHub, Kaggle, and LinkedIn for networking and outreach.
- **Resume Button:** Prominent button linking to resume hosted on Google Drive for easy access by recruiters and collaborators.
- **Icons:** Extensive use of Font Awesome for a wide range of icons across the website.
- **Custom Visuals:** Animated starfield background using Canvas API for a dynamic, engaging look.
- **Contact Form:** Integrated with Google Sheets for message submissions, capturing name, email, message, and automatic date/time using Fetch API and Google Apps Script.
- **Cloud Deployment:** Deployed on Vercel and integrated with Vercel live analytics and speed insights for real-time performance, security, and traffic monitoring.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript**
- **Canvas API**
- **Intersection Observer API**
- **Fetch API**
- **Google Apps Script**
- **Google Sheets**
- **Vercel**
- **Font Awesome**
- **Google Fonts, CDNFonts, OnlineWebFonts**

## File Structure

```
├── index.html         # Main portfolio page
├── vfx.html           # VFX showcase page
├── style.css          # Main stylesheet (legacy, see stylesheet.css)
├── stylesheet.css     # Main active stylesheet
├── script.js          # Main JavaScript for interactivity
├── vfx.js             # VFX page JavaScript
├── asset/             # Images, icons, fonts, and videos
└── readme.md          # Project documentation
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/karmaniket/My_Portfolio
   cd My_Portfolio
   ```
2. **Open `index.html` in your browser.**
   - No build step required; all assets are static.

## Form Integration with Google Sheets

This project uses a Google Apps Script backend to collect contact form submissions directly into a Google Sheet. Follow these steps to set up your own integration:

### 1. Set Up Google Apps Script Backend

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

### 2. Add the Contact Form to Your HTML

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

### 3. Connect the Form with JavaScript

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

## Customization

### Profile & Socials:
  - Update `asset/profile.jpg` for your photo.
  - Edit social links in `index.html` as needed.
### Projects & Workshops:
  - Add project images to `asset/projects/` and update the project cards in `index.html`.
  - Add your additional works in the Workshop section.
### Contact Form:
  - The form submits to a Google Apps Script endpoint. Update the `scriptURL` in `script.js` to use your own endpoint if needed.
### Resume:
  - Update the resume link in `index.html` to your own Google Drive or preferred location.

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
- **Theme Inspiration:** The website's visual theme and color palette are inspired by [the Mercedes AMG PETRONAS F1 Team.](https://www.mercedesamgf1.com/)

## License

**Strict Attribution Required**

This project is licensed for personal, non-commercial use only. You must provide clear and visible credit to the original author (Karmaniket) on every public or private use, fork, or deployment of this website or its derivatives. Removal or obfuscation of author attribution is strictly prohibited. For any other use, contact the author for explicit permission.

---

**Author:** [Karmaniket](https://github.com/karmaniket)
