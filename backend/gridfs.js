const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const HERO_BUCKET = 'heroImages';
const VIDEO_BUCKET = 'videos';

const getBucket = (name) =>
    new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: name });

const uploadBuffer = (bucketName, buffer, filename, contentType) =>
    new Promise((resolve, reject) => {
        const bucket = getBucket(bucketName);
        const uploadStream = bucket.openUploadStream(filename, { contentType });
        uploadStream.on('error', reject);
        uploadStream.on('finish', () => {
            resolve({ _id: uploadStream.id });
        });
        uploadStream.end(buffer);
    });

const getFile = async (bucketName, id) => {
    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch {
        return null;
    }
    return mongoose.connection.db
        .collection(`${bucketName}.files`)
        .findOne({ _id: objectId });
};

const deleteFile = async (bucketName, id) => {
    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch {
        return false;
    }
    try {
        await getBucket(bucketName).delete(objectId);
        return true;
    } catch {
        return false;
    }
};

const getFileIdFromUrl = (url) => {
    if (!url) return null;
    const parts = String(url).split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : null;
};

const parseRange = (rangeHeader, fileSize) => {
    if (!rangeHeader) return null;
    const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
    if (!match) return null;
    const startStr = match[1];
    const endStr = match[2];

    if (startStr === '' && endStr === '') return { error: true };

    let start;
    let end;

    if (startStr === '') {
        const suffix = parseInt(endStr, 10);
        if (Number.isNaN(suffix) || suffix === 0) return { error: true };
        start = Math.max(0, fileSize - suffix);
        end = fileSize - 1;
    } else {
        start = parseInt(startStr, 10);
        end = endStr === '' ? fileSize - 1 : parseInt(endStr, 10);
        if (end >= fileSize) end = fileSize - 1;
    }

    if (Number.isNaN(start) || start > end || start >= fileSize) return { error: true };

    return { start, end };
};

const streamFile = async (req, res, bucketName, id) => {
    const file = await getFile(bucketName, id);
    if (!file) {
        return res.status(404).json({ success: false, message: 'File not found' });
    }

    const isVideo = /^video\//i.test(file.contentType || '');

    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Cache-Control',
        isVideo ? 'public, max-age=604800' : 'public, max-age=2592000, immutable'
    );
    res.setHeader('Content-Type', file.contentType || 'application/octet-stream');

    const range = parseRange(req.headers.range, file.length);

    if (req.method === 'HEAD') {
        if (range && !range.error) {
            res.status(206);
            res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${file.length}`);
            res.setHeader('Content-Length', range.end - range.start + 1);
        } else {
            res.status(200);
            res.setHeader('Content-Length', file.length);
        }
        return res.end();
    }

    if (range) {
        if (range.error) {
            res.status(416);
            res.setHeader('Content-Range', `bytes */${file.length}`);
            return res.end();
        }
        res.status(206);
        res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${file.length}`);
        res.setHeader('Content-Length', range.end - range.start + 1);
        const downloadStream = getBucket(bucketName).openDownloadStream(file._id, {
            start: range.start,
            end: range.end,
        });
        downloadStream.on('error', () => {
            if (!res.headersSent) res.status(500).end();
        });
        return downloadStream.pipe(res);
    }

    res.setHeader('Content-Length', file.length);
    const downloadStream = getBucket(bucketName).openDownloadStream(file._id);
    downloadStream.on('error', () => {
        if (!res.headersSent) res.status(500).end();
    });
    return downloadStream.pipe(res);
};

module.exports = {
    HERO_BUCKET,
    VIDEO_BUCKET,
    uploadBuffer,
    getFile,
    deleteFile,
    getFileIdFromUrl,
    streamFile,
};
