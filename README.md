# VM Pathways Intake Widget for Shopify

This folder contains a simple HTML, CSS, and JavaScript implementation of the VM Pathways intake flow. The widget can be embedded into a Shopify site to collect customer preferences and provide product recommendations.

## Files Included

- `index.html` - The HTML structure of the widget
- `styles.css` - Styling for the widget
- `script.js` - JavaScript functionality for the widget
- `logo.png` - Placeholder for the VM Pathways logo (replace with your actual logo)

## How to Embed in Shopify

### Option 1: Custom HTML Section

1. In your Shopify admin, go to **Online Store** > **Themes**
2. Click **Customize** on your current theme
3. Add a new section and select **Custom HTML**
4. Copy the contents of all three files into the HTML editor:
   - Wrap CSS in `<style>` tags
   - Wrap JavaScript in `<script>` tags
   - Add the HTML content
5. Save your changes

### Option 2: Custom App or Theme Section

For a more integrated solution, you can:

1. Create a Shopify app that loads these files
2. Add the widget to a specific page using Shopify's theme editor
3. Modify your theme's code to include this widget on specific pages

### Connecting to Product Data

To connect the widget's recommendations to your actual products:

1. Update the `generateRecommendation()` function in `script.js` to:
   - Use your actual product data
   - Link to real product pages
   - Include real product descriptions and images

2. You can integrate with Shopify's product API by replacing the mock data with API calls to your product database

## Customization

- Update the color variables in `styles.css` to match your brand colors
- Replace the logo.png file with your actual logo
- Modify the questions in `index.html` to better match your specific products
- Add form validation in `script.js` if needed

## Important Notes

- This widget uses vanilla JavaScript and CSS, with no external dependencies
- The form data is not currently being submitted anywhere - you'll need to add code to send the data to your backend or email
- The recommendation logic is currently a simple mock - replace with your actual recommendation algorithm
- For production use, optimize the CSS and JavaScript files
