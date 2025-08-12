// controllers\metadata.js

/**
  Requirements
  1. You should provide your own project, not the example URL.
  2. You can submit a form that includes a file upload.
  3. The form file input field has the name attribute set to upfile.
  4. When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
 */
module.exports = {
  uploadFile: (req, res) => {
    
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    })

  }
}