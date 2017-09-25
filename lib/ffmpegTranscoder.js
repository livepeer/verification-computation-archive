const promisify = require("es6-promisify")
const fs = require("fs")
const shell = require("shelljs")
const ethUtil = require("ethereumjs-util")
const {parseTranscodingOptions} = require("./videoProfiles")

const transcode = async (inFile, transcodingOptions) => {
    const videoProfiles = parseTranscodingOptions(transcodingOptions)

    const args = videoProfiles.map((profile, idx) => {
        return [
            "-c:v",
            "libx264",
            "-s",
            profile.resolution,
            "-minrate",
            profile.bitrate,
            "-maxrate",
            profile.bitrate,
            "-bufsize",
            profile.bitrate,
            "-r",
            profile.framerate,
            "-threads",
            "1",
            "-copyts",
            `out${idx}.ts`
        ].join(" ")
    }).join(" ")

    const cmd = `ffmpeg -i ${inFile} ${args}`
    await promisify(shell.exec)(cmd)

    return videoProfiles.length
}

const createTranscodedDataHash = async numVideoProfiles => {
    const files = [...Array(numVideoProfiles).keys()].map(idx => {
        return `out${idx}.ts`
    })

    const transcodedData = await Promise.all(files.map(async file => {
        await promisify(fs.readFile)(file)
    }))

    const hashes = transcodedData.map(data => {
        return ethUtil.sha3(data)
    })

    return ethUtil.bufferToHex(ethUtil.sha3(hashes.join("")))
}

module.exports = {
    transcode,
    createTranscodedDataHash
}
