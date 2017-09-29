const ipfsAPI = require("ipfs-api")
const fs = require("fs")
const promisify = require("es6-promisify")
const ethUtil = require("ethereumjs-util")

const getSegmentData = (hash, segFile) => {
    const ipfs = ipfsAPI("/ip4/127.0.0.1/tcp/5001")

    return ipfs.files.get(hash).then(stream => {
        return new Promise((resolve, reject) => {
            stream.on("data", file => {
                if (file.path !== hash) {
                    reject(new Error("Incorrect IPFS hash"))
                } else {
                    file.content.pipe(fs.createWriteStream(segFile))
                    file.content.on("end", () => resolve(hash))
                }
            })
        })
    })
}

const getSegmentDataHash = async segFile => {
    const data = await promisify(fs.readFile)(segFile)
    return ethUtil.sha3(data)
}

module.exports = {
    getSegmentData,
    getSegmentDataHash
}
