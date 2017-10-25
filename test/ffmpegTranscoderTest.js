const path = require("path")
const chai = require("chai")
const assert = chai.assert
const {transcode} = require("../lib/ffmpegTranscoder")

describe("ffmpegTranscoder", () => {
    describe("transcode", () => {
        it("should return the transcoded data hash", async () => {
            const segFile = path.resolve(__dirname, "seg.ts")

            const transcodingOptions = "93c717e7c0a6517a"
            const transcodedDataHash = await transcode(segFile, transcodingOptions)
            const expResult = "13a3a9c995e191b7b34604fcb0c69e86a0cae8c031d5beb5feb0ab55bf605973"
            assert.equal(transcodedDataHash.toString("hex"), expResult, "transcoded data hash incorrect")
        })
    })
})
