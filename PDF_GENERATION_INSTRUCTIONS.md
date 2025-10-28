# How to Generate PDF from interlude-capabilities.html

Since automated PDF generation is having issues, here are manual instructions:

## Method 1: Using Chrome/Edge Browser (Recommended)

1. Open the presentation in Chrome or Edge:
   ```
   http://localhost:8000/interlude-capabilities.html?print-pdf
   ```

2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)

3. In the print dialog:
   - **Destination**: Choose "Save as PDF"
   - **Layout**: Landscape
   - **Paper size**: Letter or A4
   - **Margins**: None
   - **Background graphics**: Checked ✓

4. Click "Save" and name it `interlude-capabilities.pdf`

## Method 2: Using Decktape (Command Line)

If you have the server running on port 8000:

```bash
npm install -g decktape
decktape reveal http://localhost:8000/interlude-capabilities.html interlude-capabilities.pdf --size 1280x720
```

## Method 3: Using reveal.js Built-in PDF Export

1. Open the presentation:
   ```
   http://localhost:8000/interlude-capabilities.html?print-pdf
   ```

2. The `?print-pdf` query parameter automatically formats slides for PDF export

3. Use browser's print function (Ctrl+P / Cmd+P) and save as PDF

## Notes

- The presentation is already created at: `interlude-capabilities.html`
- Best quality: Use Method 1 with Chrome
- The `?print-pdf` parameter is important for proper formatting
- Make sure to enable "Background graphics" for proper styling
