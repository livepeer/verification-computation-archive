const ethAbi = require("ethereumjs-abi")
const {transcode} = require("./lib/ffmpegTranscoder")
const {getSegmentData, getSegmentDataHash} = require("./lib/ipfsHelper")

const run = async (segIpfsHash, transcodingOptions) => {
    const segFile = "seg.ts"
    await getSegmentData(segIpfsHash, segFile)
    const dataHash = await getSegmentDataHash(segFile)

    const transcodedDataHash = await transcode(segFile, transcodingOptions)

    // Note: Oraclize needs the hex encoded hash to NOT be 0x prefixed in order to unhexlify
    const result = ethAbi.soliditySHA3(["bytes", "bytes"], [dataHash, transcodedDataHash]).toString("hex")
    console.log(result)
}

run(process.argv[2], process.argv[3])
