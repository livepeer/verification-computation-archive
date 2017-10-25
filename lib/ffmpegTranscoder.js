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

    const outFiles = [...Array(videoProfiles.length).keys()].map(idx => {
        return `out${idx}.ts`
    })

    const transcodedDataHash = createTranscodedDataHash(outFiles)
    await cleanUp(outFiles)

    return transcodedDataHash
}

const createTranscodedDataHash = async files => {
    const transcodedData = await Promise.all(files.map(file => {
        return promisify(fs.readFile)(file)
    }))

    const hashes = transcodedData.map(data => {
        return ethUtil.sha3(data)
    })

    return ethUtil.sha3(Buffer.concat(hashes))
}

const cleanUp = async files => {
    return Promise.all(files.map(async file => {
        await promisify(fs.unlink)(file)
    }))
}

module.exports = {
    transcode,
    createTranscodedDataHash
}
