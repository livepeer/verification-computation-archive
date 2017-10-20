const {transcode} = require("../lib/ffmpegTranscoder")
const {getSegmentDataHash} = require("../lib/ipfsHelper")

const test = async () => {
    let allPassed = true
    let expResult

    const segFile = "seg.ts"
    const dataHash = await getSegmentDataHash(segFile)
    expResult = "b68485cf20b87157f5eee8d67db3495569bfe380ff9f841b5518647853ca5c82"
    if (dataHash.toString("hex") !== expResult) {
        allPassed = false
        console.log(`Data hash incorrect. Expected ${expResult} got ${dataHash.toString("hex")}`)
    }

    const transcodingOptions = "93c717e7c0a6517a"
    const transcodedDataHash = await transcode(segFile, transcodingOptions)
    expResult = "30a0cac60790dacbb82f5c7862b7e1fd18ac4fd89079a53f7a7fe86b71b7314d"
    if (transcodedDataHash.toString("hex") !== expResult) {
        allPassed = false
        console.log(`Transcoded data hash incorrect. Expected ${expResult} got ${transcodedDataHash.toString("hex")} `)
    }

    if (allPassed) {
        console.log("All tests passed")
    } else {
        console.log("Some tests failed")
    }
}

test()
