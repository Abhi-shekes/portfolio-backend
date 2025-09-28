const validateImageData = (req, res, next) => {
  //  Added middleware to validate and process image data
  const processImageField = (fieldName) => {
    if (req.body[fieldName]) {
      const imageData = req.body[fieldName];
      console.log(imageData);
      // Check if it's a Base64 image
      if (imageData.startsWith('data:image/')) {
        // Validate Base64 image format
        const base64Pattern = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
        if (!base64Pattern.test(imageData)) {
          return res.status(400).json({ 
            message: `Invalid ${fieldName} format. Must be a valid URL or Base64 image.` 
          });
        }
        
        // Check Base64 size (limit to 5MB)
        const base64Size = (imageData.length * 3) / 4;
        if (base64Size > 5 * 1024 * 1024) {
          return res.status(400).json({ 
            message: `${fieldName} is too large. Maximum size is 5MB.` 
          });
        }
      } else if (imageData.length > 0) {
        // Validate URL format
        try {
          new URL(imageData);
        } catch (error) {
          return res.status(400).json({ 
            message: `Invalid ${fieldName} format. Must be a valid URL or Base64 image.` 
          });
        }
      }
    }
  };

  // Process common image fields
  processImageField('image');
  processImageField('profileImage');
  
  // Process images in arrays (for projects, etc.)
  if (req.body.projects && Array.isArray(req.body.projects)) {
    req.body.projects.forEach((project, index) => {
      if (project.image) {
        req.body.image = project.image;
        processImageField('image');
        delete req.body.image;
      }
    });
  }

  next();
};

module.exports = { validateImageData };
