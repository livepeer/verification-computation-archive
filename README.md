# Verification Computation Archive

A Docker Node.js application for transcoding verification.

## Running

```
cd verification-computation-archive
# Build Docker image
docker build -f Dockerfile -t verification .
# Run Docker application
docker run -e ARG0=<SEGMENT_DATA_IPFS_HASH> -e ARG1=<TRANSCODING_OPTIONS> verification
```

`<SEGMENT_DATA_IPFS_HASH>` is the IPFS hash of segment data. `<TRANSCODING_OPTIONS>` is a string of video profiles separated by a comma delimeter (see https://github.com/livepeer/lpms/blob/master/transcoder/transcodeProfile.go for more details).
