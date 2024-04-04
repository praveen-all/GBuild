const fileupload=async(upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        
        const bucket = admin.storage().bucket();

       
        const filename = Date.now() + '_' + req.file.originalname;

       
        await bucket.upload(req.file.path, {
            destination: filename,
            metadata: {
                contentType: req.file.mimetype
            }
        });

        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

        fs.unlinkSync(req.file.path);
     
        res.status(200).send({ fileUrl });
        
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }
})