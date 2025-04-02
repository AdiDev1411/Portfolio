# Adding Your Profile Image

To add your profile image to the portfolio, follow these steps:

1. Prepare your image:
   - Choose a professional photo where your face is clearly visible
   - Recommended dimensions: 600x800 pixels
   - Recommended format: JPG or PNG

2. Add the image to your project:
   - Save your image as `profile.jpg` (or `profile.png`)
   - Place it in the folder `public/assets/images/`

3. The image is already referenced in the About page component at:
   ```
   src="/assets/images/profile.jpg"
   ```

4. If you use a different filename or format, update the path in:
   - `src/pages/About.tsx`: Look for the `<img>` tag in the `AboutImage` component

5. Restart the development server after adding your image to see the changes.

## Tips for a Good Profile Image

- Use good lighting
- Choose a clean background
- Dress professionally
- Smile!
- Make sure the image represents how you want to be perceived professionally 