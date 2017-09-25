const {transcode, createTranscodedDataHash} = require("./lib/ffmpegTranscoder")
const {getSegmentData} = require("./lib/ipfs")

const run = async (segIpfsHash, transcodingOptions) => {
    const segFile = "seg.ts"
    await getSegmentData(segIpfsHash, segFile)
    const num = await transcode(segFile, transcodingOptions)
    const hash = await createTranscodedDataHash(num)

    console.log(hash)
}

run(process.argv[2], process.argv[3])
